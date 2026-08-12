// ============================================================
// PORTFOLIO DATA — collegamento al backend mod-show-backend
// ------------------------------------------------------------
// Le configurazioni del sito NON sono più statiche: vengono
// recuperate dal backend tramite `fetchPortfolioConfig()` e
// normalizzate in `portfolioConfig.js`.
//
// In questo file restano cablate SOLO:
//   - la HERO IMAGE (import locale)
//   - la COMCARD (PDF in /public)
// finché il backend non espone questi asset via API
// (profile.heroImageUrl / profile.comcardUrl in
// `/api/v1/public/config?slug=tais-nascimento`).
// ============================================================

// ------------------------------------------------------------------
// Helper: costruisce un URL assoluto che rispetta il base path di
// GitHub Pages (utile per file messi in /public).
// ------------------------------------------------------------------
const basePath = import.meta.env.BASE_URL || '/';

export const assetUrl = (path) => {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path)) return path; // URL remoto
  // Le immagini importate da Vite hanno già il base path assoluto
  // (es. '/model-showcase/assets/hero-abc123.jpg' in produzione),
  // quindi non va aggiunto di nuovo.
  if (path.startsWith(basePath)) return path;
  // Per i file in /public (es. '/comcard.pdf') aggiungi il base path.
  return `${basePath}${path.replace(/^\/+/, '')}`;
};

// ------------------------------------------------------------------
// Configurazioni statiche — hero image e comcard
// (da sostituire con gli asset del backend quando saranno disponibili)
// ------------------------------------------------------------------
import heroImage from '../assets/images/hero2.jpg';

export const STATIC_HERO_IMAGE = heroImage;
export const STATIC_COMCARD_URL = '/comcard.pdf';

// ------------------------------------------------------------------
// Configurazione API backend
// ------------------------------------------------------------------
import {
  PROFILE_SLUG,
  resolveApiBaseUrl,
  fetchPortfolioConfig as fetchRawConfig,
} from './portfolioConfig.js';

// URL base delle API: usa VITE_API_BASE_URL se impostata (vedi
// .env.example), altrimenti il default per dev/prod.
export const API_BASE_URL = resolveApiBaseUrl(import.meta.env);

export { DEV_API_BASE_URL, PROD_API_BASE_URL, PROFILE_SLUG } from './portfolioConfig.js';

// ------------------------------------------------------------------
// Fetch della configurazione: recupera i dati dal backend e li
// normalizza nella forma usata dai componenti. Hero image e comcard
// vengono passate come fallback statici finché l'API non le espone.
// ------------------------------------------------------------------
export const fetchPortfolioConfig = () =>
  fetchRawConfig({
    apiBaseUrl: API_BASE_URL,
    slug: PROFILE_SLUG,
    staticOverrides: { heroImage, comcardUrl: STATIC_COMCARD_URL },
  });
