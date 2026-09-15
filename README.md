# Dicoding Forum App - Editorial Theme

Aplikasi forum diskusi ini dibangun sebagai pemenuhan tugas akhir (Submission) untuk kelas **Menjadi React Web Developer Expert** di Dicoding. Aplikasi ini memungkinkan pengguna untuk berdiskusi, membuat thread baru, memberikan komentar, serta memberikan *upvote* atau *downvote* pada thread dan komentar.

## 🎨 Fitur & Desain
Aplikasi ini dikembangkan menggunakan React dan Redux dengan desain antarmuka (**UI**) khusus bertema **Editorial/Journalistic**. 
Desain ini murni dibangun menggunakan **Vanilla CSS (tanpa UI Library/Framework)** sesuai dengan kriteria kelulusan submission.

Fitur utama meliputi:
- **Autentikasi**: Login dan Register menggunakan API Dicoding Forum.
- **Daftar Thread**: Melihat daftar diskusi terbaru, paling aktif, dan disukai.
- **Detail Thread**: Melihat isi diskusi beserta komentar-komentar di dalamnya.
- **Buat Thread**: Kemudahan membuat diskusi baru langsung dari halaman beranda (Inline form).
- **Interaksi**: Memberikan *Upvote*, *Downvote*, dan *Neutral Vote* pada Thread maupun Komentar.
- **Leaderboards**: Melihat klasemen pengguna paling aktif di forum.
- **Filter & Search**: Menyaring diskusi berdasarkan kategori tags dan fitur pencarian lokal (Ctrl+K).

## 🚀 Teknologi yang Digunakan
- **React.js** (dengan Vite)
- **Redux Toolkit** (State Management)
- **React Router DOM** (Routing)
- **Vanilla CSS** (Styling dari nol, murni CSS)
- **ESLint** (Linting, mematuhi standar *Airbnb JavaScript Style Guide*)

## 💻 Cara Menjalankan Proyek Secara Lokal

1. Pastikan Anda telah menginstal [Node.js](https://nodejs.org/).
2. Unduh atau *clone* repositori ini.
3. Buka terminal di dalam folder proyek, lalu instal semua dependensi:
   ```bash
   npm install
   ```
4. Jalankan aplikasi di mode *development*:
   ```bash
   npm run dev
   ```
5. Buka tautan lokal yang muncul (biasanya `http://localhost:5173/`) di browser Anda.

## ✅ Pengujian (Testing)
Aplikasi ini dijamin bersih dari *error* *linter*. Untuk menjalankan ESLint, gunakan perintah:
```bash
npm run lint
```
Untuk menguji proses *build* produksi:
```bash
npm run build
```

---
*Dibuat untuk Submission Dicoding.*
