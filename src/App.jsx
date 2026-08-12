import { useState, useCallback } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Gallery from './components/Gallery.jsx';
import Showreel from './components/Showreel.jsx';
import Lightbox from './components/Lightbox.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import { PortfolioProvider, usePortfolioData } from './context/PortfolioContext.jsx';
import { assetUrl, STATIC_HERO_IMAGE } from './data/portfolioData.js';

// Schermata di caricamento iniziale (hero image statica in sfondo)
const LoadingScreen = () => (
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink">
    <img
      src={assetUrl(STATIC_HERO_IMAGE)}
      alt=""
      className="absolute inset-0 h-full w-full object-cover opacity-30"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
    <div className="relative z-10 flex flex-col items-center gap-6 text-center">
      <div className="h-10 w-10 animate-spin rounded-full border border-sand/30 border-t-sand" />
      <p className="font-serif text-xl italic text-bone/80">Tais Nascimento</p>
    </div>
  </div>
);

// Schermata di errore quando il backend non è raggiungibile
const ErrorScreen = ({ error, onRetry }) => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ink px-6 text-center">
    <p className="text-[11px] uppercase tracking-[0.4em] text-sand/70">
      Errore di configurazione
    </p>
    <h1 className="font-serif text-4xl text-bone">Impossibile caricare i contenuti</h1>
    <p className="max-w-md text-sm leading-relaxed text-bone/60">
      Il sito non riesce a contattare il backend delle API. Verifica che il server sia
      attivo e che l'URL sia configurato correttamente.
    </p>
    {error?.message && (
      <p className="max-w-md break-all rounded-sm border border-bone/10 bg-onyx px-4 py-2 font-mono text-xs text-bone/50">
        {error.message}
      </p>
    )}
    <button
      type="button"
      onClick={onRetry}
      className="border border-sand/60 px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.3em] text-sand transition-colors duration-500 hover:bg-sand hover:text-ink"
    >
      Riprova
    </button>
  </div>
);

const AppContent = () => {
  // Lingua corrente: it | en | fr
  const [language, setLanguage] = useState('it');
  // Stato lightbox: immagine attiva o null
  const [lightboxImage, setLightboxImage] = useState(null);
  // Configurazione recuperata dal backend
  const { data, loading, error, retry } = usePortfolioData();

  const handleLanguageChange = useCallback((lang) => {
    setLanguage(lang);
    // Aggiorna l'attributo lang del documento per accessibilità
    document.documentElement.lang = lang;
    // Salva la preferenza per sessioni future
    try {
      localStorage.setItem('model-showcase-lang', lang);
    } catch {
      // localStorage non disponibile (es. privacy mode)
    }
  }, []);

  const handleImageClick = useCallback((img) => {
    setLightboxImage(img);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxImage(null);
  }, []);

  if (loading && !data) return <LoadingScreen />;
  if (!data) return <ErrorScreen error={error} onRetry={retry} />;

  return (
    <div className="min-h-screen bg-ink text-bone">
      <Navbar language={language} onLanguageChange={handleLanguageChange} />

      <main>
        <Hero language={language} />
        <Gallery language={language} onImageClick={handleImageClick} />
        <Showreel language={language} />
        <About language={language} />
        <Contact language={language} />
      </main>

      <Footer language={language} />

      {/* Lightbox — renderizzato solo quando un'immagine è selezionata */}
      {lightboxImage && (
        <Lightbox
          image={lightboxImage}
          onClose={handleCloseLightbox}
          language={language}
        />
      )}
    </div>
  );
};

const App = () => (
  <PortfolioProvider>
    <AppContent />
  </PortfolioProvider>
);

export default App;