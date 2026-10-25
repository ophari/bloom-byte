# Bloom Byte — Konverter Binary · ASCII · Text

Aplikasi web konversi instan **Binary · ASCII · Text** berbasis client-side JavaScript dengan antarmuka modern bernuansa *Glassmorphism* dan latar belakang HD.

🔗 **Demo Live:** [https://ophari.github.io/bloom-byte/](https://ophari.github.io/bloom-byte/)

---

## 📸 Tampilan Web

![Tampilan Bloom Byte](static/img/preview.png)

---

## ✨ Fitur Utama

- **Konversi Multi-Arah:** Mendukung konversi bolak-balik antara:
  - Text ⇄ Binary
  - Text ⇄ ASCII
  - Binary ⇄ ASCII
- **Dukungan Unicode Penuh (UTF-8):** Karakter non-latin, tanda baca, simbol, hingga emoji tetap aman dan terkonversi akurat.
- **Pilihan Separator:** Pemisah output fleksibel (*Space*, *None/Tanpa Spasi*, *Comma*, dan *Newline*).
- **Rincian Karakter (Character Breakdown):** Analisis visual tiap karakter mencakup kode Desimal (ASCII), Heksadesimal, dan representasi 8-bit Binary.
- **Statistik Real-time:** Menghitung jumlah karakter, total byte UTF-8, total bit, dan estimasi kata secara otomatis.
- **Tukar Cepat (Swap):** Membalik format sumber dan tujuan dalam satu klik tombol.
- **Salin Instan (Copy to Clipboard):** Salin hasil konversi langsung ke clipboard dengan indikator status.
- **Desain Glassmorphism:** Efek blur transparan, animasi halus, dan tata letak responsif untuk desktop maupun mobile.
- **100% Client-Side:** Berjalan langsung di browser tanpa butuh server backend, bebas hambatan dan siap di-hosting langsung di GitHub Pages.

---

## 📁 Struktur File & Folder

```text
bloom-byte/
│
├── static/
│   ├── css/
│   │   └── style.css                    # Styling antarmuka (Glassmorphism, tata letak, tema gelap)
│   ├── img/
│   │   ├── bg_upscayl_5x_upscayl-standard-4x.png  # Gambar wallpaper latar belakang HD
│   │   └── preview.png                  # Screenshot tampilan aplikasi web
│   └── js/
│       ├── converter.js                 # Engine logika konversi (Binary, ASCII, Text, decoding & breakdown)
│       └── app.js                       # Logika interaksi UI (event handler, render statistik & clipboard)
│
├── .gitignore                           # Berkas konfigurasi yang diabaikan oleh Git
├── index.html                           # Halaman utama web (HTML5)
└── README.md                            # Dokumentasi resmi proyek
```
