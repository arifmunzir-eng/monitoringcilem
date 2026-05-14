# 📱 Cara Deploy Dashboard Cicil Emas BSI sebagai APK Android
## (via GitHub Pages + PWABuilder — GRATIS, tanpa install apapun)

---

## 📁 Isi Folder Ini

```
pwa-package/
├── index.html        ← Aplikasi utama (dashboard)
├── manifest.json     ← Konfigurasi PWA
├── sw.js             ← Service Worker (cache & offline)
├── icons/
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png
│   ├── icon-384.png
│   └── icon-512.png
└── README.md         ← Panduan ini
```

---

## 🚀 LANGKAH 1 — Upload ke GitHub Pages

### A. Buat Akun GitHub (jika belum punya)
1. Buka https://github.com → Sign up (gratis)
2. Verifikasi email

### B. Buat Repository Baru
1. Klik tombol **"New"** (hijau) atau buka https://github.com/new
2. Repository name: `cicil-emas-bsi` (atau nama lain)
3. Pilih **Public**
4. Klik **"Create repository"**

### C. Upload Semua File
1. Di halaman repository, klik **"uploading an existing file"**
2. Drag & drop SEMUA file dan folder dari folder `pwa-package` ini:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - Folder `icons/` beserta isinya (8 file PNG)
3. Scroll bawah → klik **"Commit changes"**

### D. Aktifkan GitHub Pages
1. Klik tab **Settings** (gear icon)
2. Di sidebar kiri, klik **Pages**
3. Di bagian **"Branch"**, pilih: `main` → folder: `/ (root)`
4. Klik **Save**
5. Tunggu 1-2 menit → akan muncul URL seperti:
   `https://namakamu.github.io/cicil-emas-bsi/`

---

## 🔧 LANGKAH 2 — Konversi ke APK via PWABuilder

1. Buka https://www.pwabuilder.com
2. Masukkan URL GitHub Pages kamu (contoh: `https://namakamu.github.io/cicil-emas-bsi/`)
3. Klik **"Start"** → tunggu analisis selesai (30-60 detik)
4. Semua skor harus hijau ✅ (Manifest, SW, Security)
5. Klik **"Package For Stores"**
6. Pilih **"Android"** → klik **"Generate Package"**
7. Download file `.zip` yang berisi APK

---

## 📲 LANGKAH 3 — Install APK ke HP Android

### Aktifkan "Install dari Sumber Tidak Dikenal":
1. Buka **Pengaturan** HP → **Keamanan** (atau Privasi)
2. Aktifkan **"Izinkan instalasi dari sumber tidak dikenal"**
   (atau saat install nanti akan ada prompt untuk mengizinkan)

### Install APK:
1. Kirim file APK ke HP via WhatsApp / Google Drive / kabel USB
2. Buka file APK di HP
3. Ketuk **"Install"**
4. Buka aplikasi dari launcher — akan ada ikon **Cicil Emas BSI** 🪙

---

## 💡 Tips Distribusi ke Tim

- Upload APK ke **Google Drive** → share link ke seluruh tim
- Atau kirim via **WhatsApp** langsung
- Setiap ada update dashboard: upload `index.html` baru ke GitHub,
  aplikasi akan otomatis update saat dibuka (tanpa reinstall APK)

---

## ❓ FAQ

**Q: Apakah butuh Play Store?**
A: Tidak. APK bisa langsung dikirim dan diinstall (sideload).

**Q: Apakah data aman?**
A: Ya. Data tetap dari Google Sheets kamu via GAS. APK hanya wrapper.

**Q: Berapa biayanya?**
A: GRATIS. GitHub Pages gratis, PWABuilder gratis.

**Q: Apakah bisa dipakai offline?**
A: Tampilan bisa, tapi data dari Google Sheets butuh internet.

---

*Dashboard Cicil Emas BSI — Area Manado Kawanua*
*Deploy by AMPS Area Manado*
