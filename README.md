# Elena Moretti — Fashion & Editorial Model Portfolio

Sito portfolio statico, editoriale e completamente responsive per una modella.
Costruito con **React + Vite + Tailwind CSS**, progettato per essere ospitato su **GitHub Pages** (100% frontend, zero backend).

---

## ✨ Caratteristiche

- **Hero a schermo intero** con nome e claim d'impatto
- **Galleria in stile editoriale** con layout a colonne (masonry)
- **Filtri per categoria**: Editorial, Runway, Commercial, Beauty
- **Lightbox dedicato** con navigazione da tastiera (→ / ← / ESC) e da touch
- **Sezione About** con biografia, misure e agenzie
- **Sezione Contatti** con email diretta e download Comcard PDF
- **Design minimale scuro/neutro** con tipografia elegante (Cormorant Garamond + Inter)
- **Animazioni on-scroll** con Intersection Observer
- **Dropdown lingua** italiano / english / français
- **Navbar con menu mobile** e blur glassmorphism

---

## 🚀 Avvio rapido (sviluppo locale)

```bash
# 1. Installa le dipendenze
npm install

# 2. Avvia il dev server
npm run dev
```

Apri l'URL mostrato nel terminale (di default `http://localhost:5173`).

---

## 📁 Struttura del progetto

```
model-showcase/
├── public/
│   ├── comcard.pdf
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── images/          # ← inserisci qui le tue foto (opzionale)
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Gallery.jsx
│   │   ├── Lightbox.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── icons/TiktokIcon.jsx
│   ├── data/
│   │   └── portfolioData.js  # ← TUTTI i dati modificabili (foto, testi, social)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🖼️ Come sostituire foto e contenuti

1. Inserisci le tue immagini in `src/assets/images/` (oppure usa URL remoti).
2. Apri **`src/data/portfolioData.js`**.
3. Modifica:
   - `images` → l'array delle foto della galleria (aggiungi `id`, `src`, `alt`, `category`, `heightClass` per variare le altezze nel masonry).
   - `measurements` → le tue misure.
   - `agencies` → le agenzie di rappresentanza.
   - `socials` → i tuoi link social.
   - `languages` → i testi in italiano/inglese/francese se vuoi usarli.
4. Salva i file: il sito si aggiorna automaticamente in dev mode.

---

## 🎨 Palette colore

| Token | Valore | Uso |
|-------|--------|-----|
| `--color-ink` | `#0a0a0b` | Sfondo principale |
| `--color-bone` | `#f5f0e8` | Testo chiari / accenti |
| `--color-sand` | `#d9c7a7` | Dettagli champagne |
| `--color-stone` | `#1c1c1e` | Superfici rialzate |

Tailwind CSS v4 (utility-first, configurazione via CSS).

---

## ☁️ Deploy su GitHub Pages

### 1. Crea il repository

Crea un repository GitHub (es. `model-showcase`) e collega la cartella locale:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<TUO-UTENTE>/model-showcase.git
git branch -M main
git push -u origin main
```

### 2. Configura il base path

In **`vite.config.js`** imposta `base` con il nome esatto del repository:

```js
base: '/model-showcase/',
```

### 3. Aggiorna homepage in `package.json`

```json
"homepage": "https://<TUO-UTENTE-GITHUB>.github.io/model-showcase/"
```

### 4. Pubblica

```bash
npm run deploy
```

Il comando esegue automaticamente `npm run build` (script `predeploy`),
poi pubblica la cartella `dist` sul ramo `gh-pages` tramite `gh-pages`.

### 5. Attiva GitHub Pages

1. Vai su **Settings → Pages** del repository.
2. In *Build and deployment*, seleziona **Deploy from a branch**.
3. Branch: **`gh-pages`** / directory: **`/ (root)`**.
4. Salva. Il sito sarà live su:
   `https://<TUO-UTENTE>.github.io/model-showcase/`

> ⚠️ Se usi un dominio personalizzato, aggiungi anche il file `CNAME`
> nella cartella `public/` e aggiorna `base` di conseguenza.

---

## ⌨️ Lightbox — Scorciatoie da tastiera

| Tasto | Azione |
|-------|--------|
| `→` / `←` | Foto successiva / precedente |
| `ESC` | Chiudi il lightbox |
| `Tab` + `Enter` | Accessibilità completa |

Su mobile: swipe orizzontale per navigare.

---

## 📦 Script disponibili

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvia il server di sviluppo |
| `npm run build` | Build di produzione in `dist/` |
| `npm run preview` | Anteprima build locale |
| `npm run deploy` | Build + pubblica su GitHub Pages |

---

## 🧱 Tech Stack

- **React 18** — UI
- **Vite 6** — bundler & dev server
- **Tailwind CSS 4** — styling utility-first
- **lucide-react** — icone
- **gh-pages** — deployment su GitHub Pages

---

## 📄 Licenza

Tutti i contenuti e le immagini sono di proprietà dei rispettivi autori.
Utilizzo personale / portfolio.