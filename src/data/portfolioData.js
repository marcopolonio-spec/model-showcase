// ============================================================
// PORTFOLIO DATA — Modifica questo file per aggiornare il sito
// Senza toccare i componenti. Tieni le strutture invariate.
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
// Hero image — importata dal file locale in /src/assets/images/hero.jpg
// Per cambiarla: sostituisci il file hero.jpg (stesso nome) oppure
// modifica l'import qui sotto / il valore di heroImage con un URL remoto.
// ------------------------------------------------------------------
import heroImage from '../assets/images/hero.jpg';

// ------------------------------------------------------------------
// DATI DELLA MODELLA
// ------------------------------------------------------------------
export const modelInfo = {
  name: 'Tais Nascimento',
  firstName: 'Tais',
  lastName: 'Nascimento',
  title: 'Fashion & Editorial Model',
  // Immagine hero full-screen — usa il file locale hero.jpg
  heroImage: heroImage,
  tagline: {
    it: 'Eleganza senza tempo, presenza che lascia il segno.',
    en: 'Timeless elegance, presence that leaves a mark.',
    fr: "Élégance intemporelle, une présence qui marque.",
  },
  bio: {
    it: "Modella italiana con base a Milano, specializzata in editoriale di moda, campagna pubblicitaria e sfilate. La mia ricerca è un equilibrio tra intensità espressiva e naturalezza davanti all'obiettivo: ogni scatto racconta una storia, ogni look prende vita. Collaboro con brand, riviste e agenzie in tutta Europa ed Estero.",
    en: "Italian model based in Milan, specialized in fashion editorials, advertising campaigns and runway. My work is a balance between expressive intensity and naturalness in front of the lens: every shot tells a story, every look comes to life. I collaborate with brands, magazines and agencies across Europe and beyond.",
    fr: "Mannequin italienne basée à Milan, spécialisée dans l'éditorial de mode, la publicité et le défilé. Mon travail est un équilibre entre intensité expressive et naturel face à l'objectif : chaque image raconte une histoire, chaque look prend vie. Je collabore avec des marques, des magazines et des agences en Europe et au-delà.",
  },
  measurements: [
    { label: 'Altezza', value: "178 cm", en: 'Height', fr: 'Taille' },
    { label: 'Busto', value: '84 cm', en: 'Bust', fr: 'Poitrine' },
    { label: 'Vita', value: '61 cm', en: 'Waist', fr: 'Tour de taille' },
    { label: 'Fianchi', value: '89 cm', en: 'Hips', fr: 'Hanches' },
    { label: 'Scarpe', value: '39 EU', en: 'Shoes', fr: "Chaussures" },
    { label: 'Occhi', value: 'Marrone scuro', en: 'Dark brown', fr: 'Marron foncé' },
    { label: 'Capelli', value: 'Castano scuro', en: 'Dark brown', fr: 'Brun foncé' },
  ],
  agencies: [
    { name: 'Why Not Model Management', city: 'Milano', country: 'IT' },
    { name: 'Elite Model Management', city: 'Parigi', country: 'FR' },
    { name: 'Next Management', city: 'New York', country: 'US' },
  ],
  email: 'tais.ns88@gmail.com',
  comcardUrl: '/comcard.pdf',
};

// ------------------------------------------------------------------
// GALLERIA — Placeholder (sostituisci gli URL con le tue foto)
// category: editorial | runway | commercial | beauty
// heightClass viene ignorato perché usiamo il masonry con heights
// (vedi proprietà heightClassH: altezza in % per CSS columns).
// Per ogni foto della galleria puoi impostare: 
// `id`, `src`, `alt` (didascalia), 
// `category` (E: Editorial, Runway, Commercial, Beauty)
// `ratio` (es. `'4/5'`, `'4/3'`, `'3/4'`, `'1/1'`) per variare le altezze nel layout masonry.
// ------------------------------------------------------------------
import MNF_3461 from '../assets/images/MNF_3461.jpg';
import DSCF7868 from '../assets/images/DSCF7868.jpg';
import pic001 from '../assets/images/pic001.jpg';
import pic003 from '../assets/images/pic003.jpg';
import pic004 from '../assets/images/pic004.jpg';
import DSCF8094 from '../assets/images/DSCF8094.jpg';
import DSCF7909 from '../assets/images/DSCF7909.jpg';

export const galleryImages = [
  { id: 1, src: MNF_3461, alt: 'Editorial — Milano, gioco di luci', category: 'Editorial', ratio: '4/5' },
  { id: 2, src: DSCF7868, alt: 'Runway — Backstage Fashion Week', category: 'Runway', ratio: '4/5' },
  { id: 3, src: pic004, alt: 'Commercial — Campagna beauty essenziale', category: 'B&W', ratio: '4/3' },
  { id: 4, src: pic001, alt: 'Beauty — Ritratto a luce naturale', category: 'Beauty', ratio: '4/5' },
  { id: 5, src: pic003, alt: 'Editorial — Gioco di texture e ombre', category: 'Editorial', ratio: '4/5' },
  { id: 6, src: DSCF8094, alt: 'Runway — Dettaglio di uno styling', category: 'B&W', ratio: '4/5' },
  { id: 7, src: DSCF7909, alt: 'Commercial — Denim campaign', category: 'Commercial', ratio: '1/1' },
  { id: 8, src: 'https://picsum.photos/seed/beauty2/800/1050', alt: 'Beauty — Primo piano con drappeggio', category: 'Beauty', ratio: '4/5' },
  { id: 9, src: 'https://picsum.photos/seed/editorial3/800/1000', alt: 'Editorial — Set monocromatico', category: 'Editorial', ratio: '4/5' },
  { id: 10, src: 'https://picsum.photos/seed/runway3/800/1100', alt: 'Runway — Backstage', category: 'Runway', ratio: '4/5' },
  { id: 11, src: 'https://picsum.photos/seed/beauty3/800/900', alt: 'Beauty — Beauty shot close-up', category: 'Beauty', ratio: '3/4' },
  { id: 12, src: 'https://picsum.photos/seed/commercial3/800/1000', alt: 'Commercial — Lookbook autunno inverno', category: 'Commercial', ratio: '4/5' },
];

// ------------------------------------------------------------------
// SHOWREEL — Video di presentazione su YouTube
// Sostituisci `youtubeVideoId` con l'ID del tuo video
// (es. per https://www.youtube.com/watch?v=abc123xyz usa "abc123xyz").
// ------------------------------------------------------------------
export const showreel = {
  youtubeVideoId: 'ID_DEL_VIDEO', // <-- SOSTITUISCI con l'ID del tuo video
  title: {
    it: 'Showreel / Video Portfolio',
    en: 'Showreel / Video Portfolio',
    fr: 'Showreel / Portfolio Vidéo',
  },
  description: {
    it: 'Una selezione di momenti selezionati tra editoriali, campagne e backstage.',
    en: 'A curated selection of moments from editorials, campaigns and backstage.',
    fr: 'Une sélection de moments choisis entre éditoriaux, campagnes et coulisses.',
  },
};

// Categorie per i filtri (ordine di visualizzazione)
export const categories = ['Tutti', 'Editorial', 'Runway', 'Commercial', 'Beauty', 'B&W'];

// ------------------------------------------------------------------
// NAVIGAZIONE
// ------------------------------------------------------------------
export const navLinks = [
  { label: 'Home', id: 'home', labelEn: 'Home', labelFr: 'Accueil' },
  { label: 'Portfolio', id: 'portfolio', labelEn: 'Portfolio', labelFr: 'Portfolio' },
  { label: 'About', id: 'about', labelEn: 'About', labelFr: 'À propos' },
  { label: 'Contatti', id: 'contact', labelEn: 'Contact', labelFr: 'Contact' },
];

// ------------------------------------------------------------------
// SOCIAL
// ------------------------------------------------------------------
export const socials = [
  { name: 'Instagram', url: 'https://www.instagram.com/tais.nscto/', handle: '@tais.nscto' },
  { name: 'TikTok', url: 'https://tiktok.com/@elenamoretti', handle: '@elenamoretti' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/elenamoretti', handle: 'in/elenamoretti' },
];

// ------------------------------------------------------------------
// LINGUE / TESTO UI
// ------------------------------------------------------------------
export const supportedLanguages = [
  { code: 'it', label: 'IT', labelFull: 'Italiano' },
  { code: 'en', label: 'EN', labelFull: 'English' },
  { code: 'fr', label: 'FR', labelFull: 'Français' },
];

export const uiText = {
  it: {
    nav: navLinks,
    viewWork: 'Vedi il portfolio',
    getInTouch: 'Scrivimi',
    filterLabel: 'Categorie:',
    allLabel: 'Tutti',
    measurementsTitle: 'Misure',
    agenciesTitle: 'Agenzie',
    contactTitle: 'Contatti',
    contactSubtitle: 'Per collaborazioni, campagne e editoriali scrivimi direttamente.',
    downloadComcard: 'Scarica Comcard (PDF)',
    footerRights: 'Tutti i diritti riservati.',
    footerCredit: 'Design & Sviluppo — Portfolio Editoriale',
    close: 'Chiudi',
    prev: 'Precedente',
    next: 'Successiva',
    logoTitle: 'Portfolio ufficiale',
  },
  en: {
    nav: navLinks.map((n) => ({ ...n, label: n.labelEn })),
    viewWork: 'View portfolio',
    getInTouch: 'Get in touch',
    filterLabel: 'Categories:',
    allLabel: 'All',
    measurementsTitle: 'Measurements',
    agenciesTitle: 'Agencies',
    contactTitle: 'Contact',
    contactSubtitle: 'For collaborations, campaigns and editorials, write to me directly.',
    downloadComcard: 'Download Comcard (PDF)',
    footerRights: 'All rights reserved.',
    footerCredit: 'Design & Development — Editorial Portfolio',
    close: 'Close',
    prev: 'Previous',
    next: 'Next',
    logoTitle: 'Official portfolio',
  },
  fr: {
    nav: navLinks.map((n) => ({ ...n, label: n.labelFr })),
    viewWork: 'Voir le portfolio',
    getInTouch: 'Contactez-moi',
    filterLabel: 'Catégories :',
    allLabel: 'Tous',
    measurementsTitle: 'Mensurations',
    agenciesTitle: 'Agences',
    contactTitle: 'Contact',
    contactSubtitle: "Pour collaborations, campagnes et éditoriaux, écrivez-moi directement.",
    downloadComcard: 'Télécharger la Comcard (PDF)',
    footerRights: 'Tous droits réservés.',
    footerCredit: 'Design & Développement — Portfolio Éditorial',
    close: 'Fermer',
    prev: 'Précédente',
    next: 'Suivante',
    logoTitle: 'Portfolio officiel',
  },
};