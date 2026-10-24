# Bloom Byte — Konverter Binary · ASCII · Text

Aplikasi web konversi instan **Binary · ASCII · Text** berbasis **Python (Flask)** dengan tampilan clean glassmorphism dan background HD.

Dibuat oleh Yusuf.

---

## 🚀 Menjalankan Secara Lokal

1. **Install dependensi:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Jalankan aplikasi:**
   ```bash
   python app.py
   ```

3. **Buka di browser:**
   ```
   http://127.0.0.1:5000
   ```

---

## 🌐 Cara Deploy ke Public (Online Gratis)

### Langkah 1: Hubungkan ke GitHub
```bash
# 1. Buat repository baru di https://github.com/new (misal: "bloom-byte")
# 2. Hubungkan dan push kode ini:
git remote add origin https://github.com/<username-kamu>/<nama-repo>.git
git branch -M main
git push -u origin main
```

### Langkah 2: Deploy ke Layanan Cloud

#### Opsi A: Render (Sangat Mudah & Gratis)
1. Buka [render.com](https://render.com) dan login pakai akun GitHub.
2. Klik **New +** > **Web Service**.
3. Pilih repository GitHub kamu.
4. Konfigurasi:
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app`
5. Klik **Create Web Service**. Web kamu langsung aktif dengan domain publik gratis (`https://nama-web.onrender.com`).

#### Opsi B: Railway
1. Buka [railway.app](https://railway.app) dan login dengan GitHub.
2. Pilih **New Project** > **Deploy from GitHub repo**.
3. Pilih repository kamu. Railway akan otomatis mendeteksi `Procfile` dan langsung melakukan deploy.

#### Opsi C: PythonAnywhere
1. Buka [pythonanywhere.com](https://www.pythonanywhere.com)
2. Buat web app baru bertipe Flask (Python 3.10+).
3. Clone repo kamu atau upload file, lalu set WSGI configuration ke `app.py`.

---

## 📁 Struktur File

```
app.py              # Server Flask + endpoint /api/convert (mendukung PORT dinamis)
converter.py        # Logika konversi (Text <-> Binary <-> ASCII)
Procfile            # Perintah startup untuk deployment (gunicorn app:app)
requirements.txt    # Daftar library (Flask, gunicorn)
.gitignore          # Daftar file yang diabaikan oleh git
templates/
  └── index.html    # Antarmuka Glassmorphism UI
static/
  ├── css/style.css # Desain & Glassmorphism styling
  ├── js/app.js     # Logika interaktif frontend
  └── img/bg_upscayl_5x_upscayl-standard-4x.png # Asset background HD
```

---

## 🔌 API Endpoint

`POST /api/convert`

**Request Payload:**
```json
{
  "input": "01001000 01100001 01101100 01101111",
  "source": "binary",
  "target": "text",
  "separator": "space"
}
```

- `source` / `target`: `text` | `binary` | `ascii`
- `separator`: `space` | `none` | `comma` | `newline`
