# Bloom Byte — Konverter Binary · ASCII · Text

Aplikasi web konversi instan **Binary · ASCII · Text** berbasis **Python (Flask)** dengan antarmuka modern bernuansa *Glassmorphism* dan latar belakang HD.

Dibuat oleh Yusuf.

---

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

---

## 📁 Struktur File & Folder

Berikut adalah struktur direktori lengkap dari proyek ini beserta penjelasan fungsinya:

```text
KOMPILASI_ ASCII & BINNER TO TEXT/
│
├── static/                              # Aset statis untuk antarmuka web (frontend)
│   ├── css/
│   │   └── style.css                    # Lembar gaya CSS (Glassmorphism, tata letak, tema gelap)
│   ├── img/
│   │   └── bg_upscayl_5x_upscayl-standard-4x.png  # Gambar latar belakang (background) HD
│   └── js/
│       └── app.js                       # Skrip JavaScript klien (konversi instan, swap & copy)
│
├── templates/
│   └── index.html                       # Berkas template antarmuka utama (Flask / Jinja2)
│
├── .gitignore                           # Daftar berkas/folder yang diabaikan oleh Git
├── app.py                               # Server utama Flask & endpoint API backend
├── converter.py                         # Modul logika konversi (Binary, ASCII, Text, decoding & breakdown)
├── index.html                           # Halaman utama web statis (khusus hosting langsung di GitHub Pages)
├── Procfile                             # Perintah startup server untuk platform cloud (Gunicorn)
├── README.md                            # Dokumentasi lengkap proyek dan panduan penggunaan
└── requirements.txt                     # Daftar pustaka/dependensi Python yang dibutuhkan
```

---

## 🚀 Panduan Menjalankan Aplikasi (Lokal)

### 1. Prasyarat Sistem
Pastikan perangkat Anda sudah terpasang:
- **Python 3.8** atau versi yang lebih baru ([Unduh Python](https://www.python.org/downloads/))
- **pip** (biasanya otomatis terpasang bersama Python)
- **Git** (opsional, untuk mengelola repository)

---

### 2. Langkah-Langkah Menjalankan

#### Langkah A: Buka Direktori Proyek
Buka terminal (Command Prompt, PowerShell, atau Terminal) lalu arahkan ke folder proyek:
```bash
cd "c:/project/KOMPILASI_ ASCII & BINNER TO TEXT"
```

#### Langkah B: Buat & Aktifkan Virtual Environment *(Sangat Direkomendasikan)*
Menggunakan virtual environment mencegah konflik versi library dengan sistem global.

- **Pada Windows (PowerShell / Command Prompt):**
  ```powershell
  # 1. Buat virtual environment bernama 'venv'
  python -m venv venv

  # 2. Aktifkan virtual environment (PowerShell):
  .\venv\Scripts\Activate.ps1

  # Atau jika menggunakan Command Prompt (cmd):
  venv\Scripts\activate.bat
  ```

- **Pada macOS / Linux:**
  ```bash
  # 1. Buat virtual environment
  python3 -m venv venv

  # 2. Aktifkan virtual environment:
  source venv/bin/activate
  ```

*(Setelah aktif, nama `(venv)` akan muncul di awal baris perintah terminal).*

#### Langkah C: Pasang Dependensi
Install library yang tertera pada `requirements.txt`:
```bash
pip install -r requirements.txt
```

#### Langkah D: Jalankan Server Flask
Jalankan aplikasi dengan perintah:
```bash
python app.py
```

*Tips (Mode Debug & Auto-reload saat coding):*
- **Windows (PowerShell):**
  ```powershell
  $env:FLASK_DEBUG="1"; python app.py
  ```
- **Windows (CMD):**
  ```cmd
  set FLASK_DEBUG=1 && python app.py
  ```
- **macOS / Linux:**
  ```bash
  FLASK_DEBUG=1 python3 app.py
  ```

#### Langkah E: Buka di Browser
Buka browser favorit Anda dan akses alamat berikut:
```
http://127.0.0.1:5000
```
*(atau `http://localhost:5000`)*

Untuk mematikan server, tekan `Ctrl + C` di terminal.

---

## 🌐 Cara Hosting / Deploy ke Publik (Online Gratis)

Aplikasi ini sudah dirancang **Universal** — bisa di-hosting langsung di **GitHub Pages** (tanpa server backend) maupun di platform **Cloud Python/Flask** (Render, Railway, PythonAnywhere).

---

### OPSI 1: Hosting Langsung di GitHub Pages (Paling Mudah, Cepat & 100% Gratis)

GitHub Pages adalah layanan hosting situs web gratis langsung dari repository GitHub Anda. Aplikasi ini sudah dilengkapi logika JavaScript mandiri (*client-side*), sehingga **dapat berjalan 100% di GitHub Pages tanpa perlu server Python tambahan**!

#### Langkah 1: Push Kode ke GitHub
1. Buka [GitHub](https://github.com) lalu buat repository baru (misalnya diberi nama `bloom-byte` atau `konverter-biner`).
2. Buka terminal di folder proyek ini dan jalankan:
   ```bash
   git add .
   git commit -m "Update: Siap hosting di GitHub Pages"
   git branch -M main
   git remote add origin https://github.com/<username-kamu>/<nama-repo>.git
   git push -u origin main
   ```
   *(Ganti `<username-kamu>` dan `<nama-repo>` sesuai akun GitHub Anda)*

#### Langkah 2: Aktifkan Fitur GitHub Pages
1. Di halaman repository GitHub Anda, klik tab **Settings** (di menu atas).
2. Di sidebar sebelah kiri, klik menu **Pages** (di bagian *Code and automation*).
3. Pada bagian **Build and deployment**:
   - **Source:** Pilih `Deploy from a branch`.
   - **Branch:** Pilih `main` dan folder `/ (root)`.
4. Klik tombol **Save**.
5. Tunggu sekitar 1–2 menit, refresh halaman. GitHub akan memberikan link website Anda yang sudah aktif:
   ```
   https://<username-kamu>.github.io/<nama-repo>/
   ```
*(Website Anda kini online 24 jam gratis tanpa batasan sleep/inaktivitas!)*

---

### OPSI 2: Deploy Backend Python Flask (Render / Railway / PythonAnywhere)

Jika Anda ingin menjalankan server backend Python Flask secara penuh dan mengaktifkan REST API `/api/convert`:

#### A. Render (Rekomendasi Backend Gratis)
1. Buka [render.com](https://render.com) dan login dengan akun GitHub.
2. Klik **New +** > **Web Service**.
3. Pilih repository GitHub proyek ini.
4. Isi konfigurasi:
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app`
5. Klik **Create Web Service**. Web dan API akan aktif di domain HTTPS gratis (`https://nama-web.onrender.com`).

#### B. Railway
1. Kunjungi [railway.app](https://railway.app) dan login dengan GitHub.
2. Pilih **New Project** > **Deploy from GitHub repo**.
3. Pilih repository Anda. Railway akan otomatis mendeteksi berkas `Procfile` dan menjalankan aplikasi.

#### C. PythonAnywhere
1. Buka [pythonanywhere.com](https://www.pythonanywhere.com) dan daftar akun gratis.
2. Buat Web App bertipe **Flask (Python 3.10+)**.
3. Clone atau upload berkas proyek, lalu arahkan konfigurasi WSGI ke objek `app` di berkas `app.py`.

---

## 🔌 Dokumentasi REST API

Aplikasi ini menyediakan endpoint API publik yang dapat digunakan secara independen oleh aplikasi pihak ketiga.

### Endpoint: Konversi Data
- **URL:** `/api/convert`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`

#### Request Body
```json
{
  "input": "01001000 01100001 01101100 01101111",
  "source": "binary",
  "target": "text",
  "separator": "space"
}
```

| Parameter | Tipe | Pilihan Nilai | Keterangan |
| :--- | :--- | :--- | :--- |
| `input` | String | Bebas (Maks 20.000 karakter) | Teks / kode yang ingin dikonversi |
| `source` | String | `text`, `binary`, `ascii` | Format data input |
| `target` | String | `text`, `binary`, `ascii` | Format hasil yang diinginkan |
| `separator` | String | `space`, `none`, `comma`, `newline` | Pemisah antar unit output |

#### Response Berhasil (`200 OK`)
```json
{
  "ok": true,
  "output": "Halo",
  "text": "Halo",
  "stats": {
    "chars": 4,
    "bytes": 4,
    "bits": 32,
    "words": 1
  },
  "breakdown": [
    { "char": "H", "dec": 72, "hex": "48", "bin": "01001000" },
    { "char": "a", "dec": 97, "hex": "61", "bin": "01100001" },
    { "char": "l", "dec": 108, "hex": "6C", "bin": "01101100" },
    { "char": "o", "dec": 111, "hex": "6F", "bin": "01101111" }
  ],
  "truncated": false
}
```

#### Response Error (`400 Bad Request`)
```json
{
  "ok": false,
  "error": "Karakter '2' tidak valid. Binary hanya boleh berisi 0 dan 1."
}
```

---

## 📄 Lisensi
Proyek ini dibuat untuk keperluan pembelajaran dan penggunaan umum. Bebas dikembangkan lebih lanjut!
