// ============================================================
// CONFIGURAZIONE API BACKEND (mod-show-backend)
// ------------------------------------------------------------
// Il frontend NON contiene più le configurazioni statiche del
// sito: le recupera dal backend all'avvio tramite:
//
//   GET {API_BASE_URL}/v1/public/config?slug={PROFILE_SLUG}
//
// API_BASE_URL:
//   - dev:  http://localhost:3000/api  (vercel dev in esecuzione)
//   - prod: https://mod-show-backend.vercel.app/api
//
// Per puntare a un ambiente diverso imposta la variabile Vite
// VITE_API_BASE_URL (vedi .env.example): viene sempre preferita
// ai default qui sotto.
// ============================================================

export const DEV_API_BASE_URL = 'http://localhost:3000/api';
export const PROD_API_BASE_URL = 'https://mod-show-backend.vercel.app/api';
export const PROFILE_SLUG = 'tais-nascimento';

/**
 * Risolve l'URL base delle API.
 * @param {{ VITE_API_BASE_URL?: string, PROD?: boolean, DEV?: boolean }} env
 *   Oggetto ambiente (in Vite: `import.meta.env`).
 */
export const resolveApiBaseUrl = (env = {}) => {
  if (env.VITE_API_BASE_URL) {
    return String(env.VITE_API_BASE_URL).replace(/\/+$/, '');
  }
  return env.PROD ? PROD_API_BASE_URL : DEV_API_BASE_URL;
};

/**
 * URL completo dell'endpoint pubblico di configurazione.
 */
export const buildConfigUrl = (apiBaseUrl, slug = PROFILE_SLUG) =>
  `${apiBaseUrl}/v1/public/config?slug=${encodeURIComponent(slug)}`;

/**
 * Estrae una stringa da un oggetto localizzato { it, en, fr } provando
 * le chiavi in ordine; accetta anche già una stringa.
 */
const pickLocalized = (obj, ...keys) => {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  for (const key of keys) {
    if (obj[key]) return obj[key];
  }
  return '';
};

const toId = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : value;
};

/**
 * Trasforma la risposta di `/api/v1/public/config` nella forma usata
 * dai componenti (stessa struttura che era in portfolioData.js).
 *
 * `staticOverrides` contiene i valori che restano cablati nel frontend
 * finché il backend non li espone: `{ heroImage, comcardUrl }`.
 * Quando l'API restituisce `heroImageUrl` / `comcardUrl` non nulli,
 * questi hanno priorità.
 */
export const normalizeConfig = (api, staticOverrides = {}) => {
  const profile = api?.profile ?? {};
  const measurements = Array.isArray(api?.measurements) ? api.measurements : [];
  const agencies = Array.isArray(api?.agencies) ? api.agencies : [];
  const gallery = Array.isArray(api?.gallery) ? api.gallery : [];
  const settings = api?.settings ?? {};

  const navigation = Array.isArray(settings.navigation) ? settings.navigation : [];
  const apiUiText = settings.uiText ?? {};
  const apiCategories = Array.isArray(settings.categories) ? [...settings.categories] : [];

  const firstName = profile.firstName ?? profile.first_name ?? '';
  const lastName = profile.lastName ?? profile.last_name ?? '';

  const modelInfo = {
    name: [firstName, lastName].filter(Boolean).join(' '),
    firstName,
    lastName,
    title: profile.title ?? '',
    // Hero image: resta cablata in portfolioData.js finché il backend
    // non espone un asset registrato (heroImageUrl).
    heroImage: profile.heroImageUrl || staticOverrides.heroImage || '',
    tagline: profile.tagline ?? {},
    bio: profile.bio ?? {},
    measurements: measurements.map((m) => ({
      label: pickLocalized(m?.label, 'it'),
      value: m?.value ?? '',
      en: pickLocalized(m?.label, 'en'),
      fr: pickLocalized(m?.label, 'fr'),
    })),
    agencies: agencies.map((a) => ({
      name: a?.name ?? '',
      city: a?.city ?? '',
      country: a?.country ?? '',
    })),
    email: profile.email ?? '',
    // Comcard: resta cablata in portfolioData.js finché il backend
    // non espone un asset registrato (comcardUrl).
    comcardUrl: profile.comcardUrl || staticOverrides.comcardUrl || '',
  };

  const galleryImages = gallery
    .map((g) => ({
      id: toId(g.id),
      src: g.imageUrl ?? '',
      alt: pickLocalized(g.alt, 'it', 'en', 'fr'),
      category: g.category ?? 'Editorial',
      ratio: g.ratio ?? '4/5',
    }))
    .filter((g) => g.src);

  // 'Tutti' è il valore sentinella del filtro "mostra tutto": garantito.
  const categories = apiCategories.includes('Tutti')
    ? apiCategories
    : ['Tutti', ...apiCategories];

  const showreel = settings.showreel
    ? {
        youtubeVideoId: settings.showreel.youtubeVideoId ?? '',
        title: settings.showreel.title ?? {},
        description: settings.showreel.description ?? {},
      }
    : { youtubeVideoId: '', title: {}, description: {} };

  const navLinks = navigation.map((n) => ({
    id: n.id ?? '',
    label: pickLocalized(n.label, 'it', 'en', 'fr'),
    labelEn: pickLocalized(n.label, 'en', 'it'),
    labelFr: pickLocalized(n.label, 'fr', 'it'),
  }));

  const socials = Array.isArray(settings.socials) ? settings.socials : [];

  const supportedLanguages =
    Array.isArray(settings.languages) && settings.languages.length
      ? settings.languages
      : [{ code: 'it', label: 'IT', labelFull: 'Italiano' }];

  // La navigazione arriva separata dal backend (settings.navigation),
  // mentre i componenti la leggono da uiText[lang].nav: la ricostruiamo.
  const buildNavFor = (lang) =>
    navigation.map((n) => ({
      id: n.id ?? '',
      label: pickLocalized(n.label, lang, 'it'),
    }));

  const uiText = {
    it: { ...(apiUiText.it ?? {}), nav: buildNavFor('it') },
    en: { ...(apiUiText.en ?? {}), nav: buildNavFor('en') },
    fr: { ...(apiUiText.fr ?? {}), nav: buildNavFor('fr') },
  };

  return {
    modelInfo,
    galleryImages,
    categories,
    showreel,
    navLinks,
    socials,
    supportedLanguages,
    uiText,
  };
};

/**
 * Recupera e normalizza la configurazione pubblica dal backend.
 * L'unico parametro opzionale (per test / override) è un oggetto:
 * `{ apiBaseUrl, slug, fetchImpl, staticOverrides }`.
 */
export const fetchPortfolioConfig = async ({
  apiBaseUrl = DEV_API_BASE_URL,
  slug = PROFILE_SLUG,
  fetchImpl = globalThis.fetch,
  staticOverrides = {},
} = {}) => {
  const res = await fetchImpl(buildConfigUrl(apiBaseUrl, slug), {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`Config API error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return normalizeConfig(json, staticOverrides);
};

