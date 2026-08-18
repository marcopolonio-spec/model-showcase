import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync } from 'node:fs';

// Versione dell'applicazione (semver x.y.z).
// La fonte di default è la versione in package.json. In CI la workflow
// GitHub Actions incrementa la patch e imposta VITE_APP_VERSION prima
// della build: quella variabile ha quindi la priorità su package.json.
const packageJson = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf-8')
);
const appVersion = process.env.VITE_APP_VERSION || packageJson.version;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // In development usiamo la root "/" per un flusso di lavoro privo di problemi.
  // In produzione (build/deploy su GitHub Pages) usiamo il base path del repository.
  // Sostituisci "model-showcase" con il nome esatto del tuo repository GitHub.
  base: process.env.NODE_ENV === 'production' ? '/model-showcase/' : '/',
  // Rende la versione disponibile a runtime tramite import.meta.env.VITE_APP_VERSION.
  // In locale viene usata la versione di package.json; in CI prevale
  // VITE_APP_VERSION (impostata dalla workflow dopo l'incremento della patch).
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(appVersion),
  },
});
