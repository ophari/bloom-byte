## ✨ Fitur Utama

- **Konversi Multi-Arah:** Mendukung konversi bolak-balik antara:
  - Text ⇄ Binary
  - Text ⇄ ASCII
  - Binary ⇄ ASCII
- **Dukungan Unicode Penuh (UTF-8):** Karakter non-latin, aksen, hingga emoji tetap aman dan terkonversi akurat.
- **Pilihan Separator:** Pemisah output yang fleksibel (*Space*, *None/Tanpa Spasi*, *Comma*, dan *Newline*).
- **Rincian Karakter (Character Breakdown):** Analisis visual tiap karakter mencakup kode Desimal (ASCII), Heksadesimal, dan representasi 8-bit Binary.
- **Statistik Real-time:** Menghitung jumlah karakter, total byte UTF-8, total bit, dan estimasi kata.
- **Tukar Cepat (Swap):** Membalik format sumber dan tujuan dalam satu klik.
- **Salin Instan (Copy to Clipboard):** Salin hasil konversi langsung ke clipboard dengan indikator status.
- **Desain Modern:** Menggunakan gaya *Glassmorphism* gelap dengan efek blur, transisi halus, dan tata letak responsif di semua perangkat.
- **100% JavaScript, Tanpa Server:** Semua konversi berjalan langsung di browser — bisa di-hosting gratis di GitHub Pages.

---

## 📁 Struktur File & Folder

```text
bloom-byte/
│
├── static/
│   ├── css/
│   │   └── style.css                    # Styling (Glassmorphism, layout, animasi)
│   ├── img/
│   │   └── bg_upscayl_5x_upscayl-standard-4x.png  # Gambar latar belakang HD
│   └── js/
│       ├── converter.js                 # Logika konversi (Text ⇄ Binary ⇄ ASCII) — "backend"-nya
│       └── app.js                       # Logika UI (event, render statistik & rincian, copy/swap)
│
├── .gitignore                           # Daftar berkas yang diabaikan Git
├── .nojekyll                            # Mematikan Jekyll di GitHub Pages (deploy lebih cepat)
├── index.html                           # Halaman utama
└── README.md                            # Dokumentasi proyek
```

---

## 🚀 Menjalankan Secara Lokal

Tidak perlu install apa pun. Pilih salah satu:

- **Cara paling cepat:** klik dua kali `index.html` → otomatis terbuka di browser.
- **Pakai server lokal (opsional):**
  ```bash
  # Pakai VS Code: install ekstensi "Live Server" → klik kanan index.html → "Open with Live Server"
  # atau pakai Node.js:
  npx serve .
  ```

---

## 🌐 Hosting di GitHub Pages

Repository: [github.com/ophari/bloom-byte](https://github.com/ophari/bloom-byte)

1. Push perubahan ke GitHub:
   ```bash
   git add .
   git commit -m "update"
   git push
   ```
2. Buka **Settings → Pages** di repository.
3. Di **Build and deployment**:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` / `/ (root)` → **Save**
4. Tunggu 1–2 menit. Website aktif di:
   ```
   https://ophari.github.io/bloom-byte/
   ```

Setiap kali kamu `git push`, website akan ter-update otomatis.

---

## 🔌 Memakai Konverter dari JavaScript

`static/js/converter.js` mengekspos objek global `BloomConverter` yang bisa dipakai di halaman lain:

```html
<script src="static/js/converter.js"></script>
<script>
  const hasil = BloomConverter.convert("01001000 01101001", "binary", "text", "space");
  console.log(hasil.output); // "Hi"
</script>
```

| Parameter | Pilihan Nilai | Keterangan |
| :--- | :--- | :--- |
| `input` | String (maks 20.000 karakter) | Teks / kode yang ingin dikonversi |
| `source` | `text`, `binary`, `ascii` | Format data input |
| `target` | `text`, `binary`, `ascii` | Format hasil yang diinginkan |
| `separator` | `space`, `none`, `comma`, `newline` | Pemisah antar unit output |

**Nilai kembalian:**
```js
{
  output: "Hi",
  text: "Hi",
  stats: { chars: 2, bytes: 2, bits: 16, words: 1 },
  breakdown: [
    { char: "H", dec: 72,  hex: "48", bin: "01001000" },
    { char: "i", dec: 105, hex: "69", bin: "01101001" }
  ],
  truncated: false
}
```

Jika input tidak valid, fungsi akan melempar `BloomConverter.ConversionError` dengan pesan yang ramah, misalnya:
`Karakter '2' tidak valid. Binary hanya boleh berisi 0 dan 1.`

---

## 📄 Lisensi
Proyek ini dibuat untuk keperluan pembelajaran dan penggunaan umum. Bebas dikembangkan lebih lanjut!
