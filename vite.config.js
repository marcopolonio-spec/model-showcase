import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // In development usiamo la root "/" per un flusso di lavoro privo di problemi.
  // In produzione (build/deploy su GitHub Pages) usiamo il base path del repository.
  // Sostituisci "model-showcase" con il nome esatto del tuo repository GitHub.
  base: process.env.NODE_ENV === 'production' ? '/model-showcase/' : '/',
});
