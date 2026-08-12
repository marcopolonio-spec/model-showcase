# Fashion & Editorial Model Portfolio

Sito portfolio editoriale e completamente responsive per una modella.
Costruito con **React + Vite + Tailwind CSS**, ospitato su **GitHub Pages**.
Le configurazioni del sito (profilo, bio, misure, agenzie, galleria, showreel,
testi UI, social) **non sono più statiche**: vengono recuperate dal backend
**mod-show-backend** (API Vercel + PostgreSQL Neon + Vercel Blob) tramite
`GET /api/v1/public/config?slug=tais-nascimento`.


---

## ✨ Caratteristiche

- **Configurazioni guidate dalle API** (`mod-show-backend`): profilo, bio, misure, agenzie, galleria, showreel, testi UI e social arrivano dal backend
- **Hero a schermo intero** con nome e claim d'impatto
- **Galleria in stile editoriale** con layout a colonne (masonry)
- **Filtri per categoria**: Editorial, Runway, Commercial, Beauty (categorie dal backend)
- **Lightbox dedicato** con navigazione da tastiera (→ / ← / ESC) e da touch
- **Sezione About** con biografia, misure e agenzie
- **Sezione Contatti** con email diretta e download Comcard PDF
- **Design minimale scuro/neutro** con tipografia elegante (Cormorant Garamond + Inter)
- **Animazioni on-scroll** con Intersection Observer
- **Dropdown lingua** italiano / english / français (configurabile dal backend)
- **Navbar con menu mobile** e blur glassmorphism

---

## 🚀 Avvio rapido (sviluppo locale)

> ⚠️ Il sito **richiede il backend** `mod-show-backend` per mostrare i contenuti:
> le configurazioni vengono lette da `http://localhost:3000/api` in sviluppo.
> Avvia prima il backend (`npm run dev:local` nella cartella del backend,
> default `http://localhost:3000`), poi il frontend.

```bash
# 1. Installa le dipendenze
npm install

# 2. (Opzionale) sovrascrivi l'URL delle API
#    copia .env.example in .env e imposta VITE_API_BASE_URL

# 3. Avvia il dev server
npm run dev
```

Apri l'URL mostrato nel terminale (di default `http://localhost:5173`).

---

## 🔌 Integrazione con il backend (`mod-show-backend`)

Le configurazioni del sito vengono recuperate all'avvio da:

```
GET {API_BASE_URL}/v1/public/config?slug=tais-nascimento
```

- **API_BASE_URL in dev** (default): `http://localhost:3000/api`
- **API_BASE_URL in prod** (default): `https://mod-show-backend.vercel.app/api`

Per puntare a un ambiente diverso imposta la variabile Vite `VITE_API_BASE_URL`
(vedi `.env.example`): ha sempre la priorità sui default. In produzione ricorda
di configurare sul backend la CORS allowlist `FRONTEND_ORIGIN` con l'origin di
GitHub Pages (es. `https://<utente>.github.io`).

Il flusso dei dati:

1. `src/context/PortfolioContext.jsx` monta un `PortfolioProvider` che all'avvio
   chiama `fetchPortfolioConfig()` (stati: `loading`, `error`, `retry`).
2. `src/data/portfolioData.js` risolve l'URL base e passa i fallback statici.
3. `src/data/portfolioConfig.js` esegue il `fetch` e `normalizeConfig()` mappa la
   risposta dell'API nella struttura che i componenti già usavano.
4. Ogni componente legge i dati con l'hook `usePortfolioData()`.

**Configurazioni statiche rimaste nel frontend (per ora):**
- `heroImage` — la hero image (import locale in `portfolioData.js`)
- `comcardUrl` — il PDF della comcard (file `/public/comcard.pdf`)

Quando il backend espone questi asset (`profile.heroImageUrl` /
`profile.comcardUrl` nella risposta dell'API), i valori dell'API hanno priorità.
Se il backend non è raggiungibile il sito mostra una schermata di errore con
il pulsante *Riprova*.

---

## 📁 Struttura del progetto

```
model-showcase/
├── public/
│   ├── comcard.pdf
│   └── favicon.svg
├── scripts/
│   └── verify-config.mjs     # verifica la pipeline API (node scripts/verify-config.mjs)
├── src/
│   ├── assets/
│   │   └── images/           # ← hero image statica (per ora)
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Gallery.jsx
│   │   ├── Lightbox.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── icons/TiktokIcon.jsx
│   ├── context/
│   │   └── PortfolioContext.jsx  # Provider + hook usePortfolioData()
│   ├── data/
│   │   ├── portfolioData.js      # hero image + comcard statiche, URL API
│   │   └── portfolioConfig.js    # fetch + normalize della config dal backend
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🖼️ Come aggiornare foto e contenuti

I contenuti **non si modificano più nel frontend**: si aggiornano nel database del
backend (`mod-show-backend`), tramite il pannello admin (`/admin`) o le API
amministrative. Il frontend li mostra automaticamente all'avvio.

Uniche configurazioni ancora locali:

1. **Hero image** — sostituisci `src/assets/images/hero2.jpg` (oppure caricala
   nel backend come asset e collegala al profilo: avrà priorità).
2. **Comcard PDF** — sostituisci `public/comcard.pdf` (oppure caricala nel
   backend come asset: avrà priorità).

Per verificare che il frontend recuperi correttamente i dati dal backend:

```bash
node scripts/verify-config.mjs
```

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
| `npm run dev` | Avvia il server di sviluppo (richiede il backend su `:3000`) |
| `npm run build` | Build di produzione in `dist/` |
| `npm run preview` | Anteprima build locale |
| `npm run deploy` | Build + pubblica su GitHub Pages |
| `node scripts/verify-config.mjs` | Verifica la pipeline di caricamento config dal backend |

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