// ============================================================
// Verifica della pipeline di caricamento configurazione dal backend
// (mod-show-backend). Controlla resolveApiBaseUrl, normalizeConfig
// e la fetch reale contro l'istanza locale in esecuzione.
//
// Uso: node scripts/verify-config.mjs
// ============================================================
import {
  DEV_API_BASE_URL,
  PROD_API_BASE_URL,
  buildConfigUrl,
  fetchPortfolioConfig,
  normalizeConfig,
  resolveApiBaseUrl,
} from '../src/data/portfolioConfig.js';

let failures = 0;
const assert = (cond, label) => {
  if (cond) {
    console.log(`  ✅ ${label}`);
  } else {
    failures += 1;
    console.error(`  ❌ ${label}`);
  }
};

console.log('resolveApiBaseUrl');
assert(resolveApiBaseUrl({}) === DEV_API_BASE_URL, 'dev default = http://localhost:3000/api');
assert(resolveApiBaseUrl({ PROD: true }) === PROD_API_BASE_URL, 'prod default = https://mod-show-backend.vercel.app/api');
assert(
  resolveApiBaseUrl({ VITE_API_BASE_URL: 'https://api.example.com/api/' }) === 'https://api.example.com/api',
  'VITE_API_BASE_URL ha priorità (e gli slash finali vengono rimossi)'
);

console.log('\nnormalizeConfig — fallback statici hero/comcard');
const mock = {
  profile: {
    firstName: 'Anna',
    lastName: 'Rossi',
    title: 'Model',
    email: 'a@b.it',
    heroImageUrl: null,
    comcardUrl: null,
    tagline: { it: 't', en: 'e', fr: 'f' },
    bio: { it: 'b', en: 'bb', fr: 'bbb' },
  },
  measurements: [{ id: 1, label: { it: 'Altezza', en: 'Height', fr: 'Taille' }, value: '178 cm' }],
  agencies: [{ name: 'Ag', city: 'Mi', country: 'IT' }],
  gallery: [{ id: '5', imageUrl: 'https://cdn/x.jpg', alt: { it: 'Foto', en: 'Pic' }, category: 'Editorial', ratio: '5/4' }],
  settings: {
    categories: ['Editorial'],
    socials: [{ name: 'Instagram', url: 'https://ig', handle: '@ig' }],
    showreel: { youtubeVideoId: 'abc', title: { it: 'T' }, description: { it: 'D' } },
    navigation: [{ id: 'home', label: { it: 'Home', en: 'Home', fr: 'Accueil' } }],
    languages: [{ code: 'it', label: 'IT', labelFull: 'Italiano' }],
    uiText: { it: { viewWork: 'Vedi' }, en: { viewWork: 'View' }, fr: { viewWork: 'Voir' } },
  },
};
const norm = normalizeConfig(mock, { heroImage: 'static-hero.jpg', comcardUrl: '/comcard.pdf' });
assert(norm.modelInfo.name === 'Anna Rossi', 'name composto da firstName + lastName');
assert(norm.modelInfo.heroImage === 'static-hero.jpg', 'heroImage usa il fallback statico quando l API è null');
assert(norm.modelInfo.comcardUrl === '/comcard.pdf', 'comcardUrl usa il fallback statico');
assert(norm.modelInfo.measurements[0].label === 'Altezza' && norm.modelInfo.measurements[0].en === 'Height', 'misura localizzata (label/en/fr)');
assert(norm.modelInfo.agencies[0].city === 'Mi', 'agenzia mappata');
assert(norm.galleryImages[0].alt === 'Foto', 'alt localizzata (it)');
assert(norm.galleryImages[0].src === 'https://cdn/x.jpg', 'src galleria = imageUrl');
assert(norm.categories.includes('Tutti'), '"Tutti" viene preposto se assente');
assert(norm.uiText.it.nav[0].label === 'Home' && norm.uiText.en.nav[0].label === 'Home', 'nav ricostruita in uiText per lingua');
assert(norm.uiText.en.viewWork === 'View', 'uiText.en presente');

console.log('\nnormalizeConfig — priorità ai valori dell API quando presenti');
const withApi = normalizeConfig(
  {
    ...mock,
    profile: {
      ...mock.profile,
      heroImageUrl: 'https://cdn/hero.jpg',
      comcardUrl: 'https://cdn/comcard.pdf',
    },
  },
  { heroImage: 'static-hero.jpg', comcardUrl: '/comcard.pdf' }
);
assert(withApi.modelInfo.heroImage === 'https://cdn/hero.jpg', 'heroImageUrl preferito all API');
assert(withApi.modelInfo.comcardUrl === 'https://cdn/comcard.pdf', 'comcardUrl preferito all API');

console.log(`\nFetch reale dal backend locale: ${buildConfigUrl(DEV_API_BASE_URL)}`);
try {
  const real = await fetchPortfolioConfig({
    apiBaseUrl: DEV_API_BASE_URL,
    staticOverrides: { heroImage: 'static-hero.jpg', comcardUrl: '/comcard.pdf' },
  });
  assert(real.modelInfo.firstName === 'Tais', 'firstName dal backend');
  assert(real.modelInfo.lastName === 'Nascimento', 'lastName dal backend');
  assert(real.modelInfo.email.length > 0, 'email presente');
  assert(real.modelInfo.bio.it?.length > 0, 'bio.it presente');
  assert(real.modelInfo.tagline.en?.length > 0, 'tagline.en presente');
  assert(real.modelInfo.measurements.length >= 1 && real.modelInfo.measurements[0].label, 'measurements mappate');
  assert(real.modelInfo.agencies.length >= 1 && real.modelInfo.agencies[0].name, 'agencies mappate');
  assert(real.modelInfo.heroImage === 'static-hero.jpg', 'heroImage resta statica (API heroImageUrl=null per ora)');
  assert(real.modelInfo.comcardUrl === '/comcard.pdf', 'comcardUrl resta statica (API comcardUrl=null per ora)');
  assert(Array.isArray(real.galleryImages) && real.galleryImages.every((g) => g.src), 'galleryImages con src');
  assert(real.categories.includes('Tutti'), 'categorie dal backend incl. "Tutti"');
  assert(real.showreel.youtubeVideoId === 'GGVI978SLu0', 'showreel dal backend');
  assert(Array.isArray(real.socials) && real.socials.length >= 1, 'socials dal backend');
  assert(real.supportedLanguages.some((l) => l.code === 'it') && real.supportedLanguages.some((l) => l.code === 'fr'), 'lingue it/fr dal backend');
  assert(real.uiText.it.nav.length === 4, 'nav it con 4 voci');
  assert(real.uiText.it.viewWork?.length > 0, 'uiText.it.viewWork presente');
  assert(real.uiText.en.viewWork?.length > 0 && real.uiText.fr.viewWork?.length > 0, 'uiText en/fr presenti');
} catch (err) {
  failures += 1;
  console.error(`  ❌ fetch reale: ${err.message}`);
}

if (failures === 0) {
  console.log('\nTUTTI I CHECK SUPERATI ✓');
} else {
  console.error(`\n${failures} check falliti ✗`);
  process.exitCode = 1;
}
