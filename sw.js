// ═══════════════════════════════════════════════════════════
//  Service Worker — Dashboard Cicil Emas BSI
//  Cache strategy:
//    - CDN assets  → Cache First (Chart.js, Leaflet, Fonts)
//    - GAS API     → Network Only (data harus selalu fresh)
//    - HTML/lain   → Network First + Cache fallback
// ═══════════════════════════════════════════════════════════

const CACHE_NAME  = 'cicil-emas-bsi-v2';
const CACHE_CDN   = 'cicil-emas-cdn-v2';

// Asset CDN yang di-precache saat install
const CDN_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap'
];

// ── Install: precache CDN assets ─────────────────────────────
self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_CDN).then(function(cache) {
      return Promise.allSettled(
        CDN_ASSETS.map(function(url) {
          return cache.add(url).catch(function(e) {
            console.warn('[SW] Gagal cache:', url, e.message);
          });
        })
      );
    })
  );
});

// ── Activate: hapus cache lama ───────────────────────────────
self.addEventListener('activate', function(event) {
  const KEEP = [CACHE_NAME, CACHE_CDN];
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return !KEEP.includes(k); })
            .map(function(k) { return caches.delete(k); })
      );
    }).then(function() { return self.clients.claim(); })
  );
});

// ── Fetch: strategi per jenis request ───────────────────────
self.addEventListener('fetch', function(event) {
  const url = event.request.url;

  // 1. Google Apps Script → Network Only (jangan pernah cache)
  if (url.includes('script.google.com') || url.includes('googleapis.com/script')) {
    event.respondWith(
      fetch(event.request).catch(function() {
        return new Response(
          JSON.stringify({ status: 'offline', message: 'Tidak ada koneksi. Data belum bisa dimuat.' }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
    return;
  }

  // 2. CDN assets → Cache First
  if (
    url.includes('cdnjs.cloudflare.com') ||
    url.includes('unpkg.com') ||
    url.includes('fonts.googleapis.com') ||
    url.includes('fonts.gstatic.com')
  ) {
    event.respondWith(
      caches.match(event.request).then(function(cached) {
        if (cached) return cached;
        return fetch(event.request).then(function(resp) {
          var clone = resp.clone();
          caches.open(CACHE_CDN).then(function(c) { c.put(event.request, clone); });
          return resp;
        });
      })
    );
    return;
  }

  // 3. Semua lainnya (HTML, icons, dll) → Network First + Cache fallback
  event.respondWith(
    fetch(event.request).then(function(resp) {
      var clone = resp.clone();
      caches.open(CACHE_NAME).then(function(c) { c.put(event.request, clone); });
      return resp;
    }).catch(function() {
      return caches.match(event.request).then(function(cached) {
        if (cached) return cached;
        // Fallback page offline sederhana
        return new Response(
          '<html><body style="font-family:sans-serif;text-align:center;padding:40px">' +
          '<h2>📴 Tidak Ada Koneksi</h2>' +
          '<p>Buka kembali saat ada internet untuk memuat data terbaru.</p>' +
          '<button onclick="location.reload()" style="padding:12px 24px;background:#00695C;color:#fff;border:none;border-radius:12px;font-size:16px;cursor:pointer">🔄 Coba Lagi</button>' +
          '</body></html>',
          { headers: { 'Content-Type': 'text/html' } }
        );
      });
    })
  );
});
