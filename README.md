# Subtech VtuApp 🚀

> Futuristic landing page for **VtuApp** by Subtech — instant airtime, data bundles & bill payments across Nigeria.

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | HTML5, CSS3, Vanilla JavaScript   |
| Backend    | Python 3.11 + Flask               |
| Server     | Gunicorn (WSGI)                   |
| Hosting    | Railway                           |
| Repo       | GitHub                            |

---

## Project Structure

```
subtech-vtuapp/
├── app.py               # Flask backend & API routes
├── requirements.txt     # Python dependencies
├── Procfile             # Railway / Heroku process file
├── railway.toml         # Railway config
├── runtime.txt          # Python version pin
├── .gitignore
├── README.md
├── templates/
│   └── index.html       # Main HTML page (served by Flask)
└── static/
    ├── css/
    │   └── style.css    # All styles
    └── js/
        └── main.js      # Navbar, counters, forms, API calls
```

---

## API Endpoints

| Method | Path            | Description                    |
|--------|-----------------|--------------------------------|
| GET    | `/`             | Serve the landing page         |
| GET    | `/api/stats`    | Return live platform stats     |
| POST   | `/api/contact`  | Handle contact form submission |
| POST   | `/api/waitlist` | Add email to waitlist          |
| GET    | `/health`       | Railway health check           |

---

## Local Development

### 1 — Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/subtech-vtuapp.git
cd subtech-vtuapp
```

### 2 — Create a virtual environment

```bash
python -m venv venv
source venv/bin/activate        # Mac/Linux
venv\Scripts\activate           # Windows
```

### 3 — Install dependencies

```bash
pip install -r requirements.txt
```

### 4 — Run the dev server

```bash
python app.py
```

Open **http://localhost:5000** in your browser.

---

## Deploy to Railway

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial Subtech VtuApp site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/subtech-vtuapp.git
git push -u origin main
```

### Step 2 — Connect to Railway

1. Go to **https://railway.app** and sign in (GitHub login recommended).
2. Click **New Project → Deploy from GitHub repo**.
3. Select your `subtech-vtuapp` repository.
4. Railway auto-detects Python and reads `railway.toml`.
5. Set environment variable (optional):
   - `FLASK_ENV` = `production`
6. Click **Deploy** — Railway builds and launches automatically.
7. Click **Settings → Domains** to get your public URL or add a custom domain.

### Step 3 — Done! 🎉

Your site is live at `https://subtech-vtuapp.up.railway.app` (or your custom domain).

---

## Environment Variables

| Variable    | Default      | Description              |
|-------------|--------------|--------------------------|
| `PORT`      | `5000`       | Set automatically by Railway |
| `FLASK_ENV` | `development`| Set to `production` on Railway |

---

## Customisation

- **Colors** — edit CSS variables at the top of `static/css/style.css`
- **Content** — edit `templates/index.html`
- **API logic** — extend `app.py` with a database (SQLite, PostgreSQL, etc.)
- **Email** — integrate SendGrid or Mailgun in the `/api/contact` route

---

## License

MIT © 2026 Subtech
