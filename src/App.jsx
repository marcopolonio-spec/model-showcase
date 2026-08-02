import { useState, useCallback } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Gallery from './components/Gallery.jsx';
import Lightbox from './components/Lightbox.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
  // Lingua corrente: it | en | fr
  const [language, setLanguage] = useState('it');
  // Stato lightbox: immagine attiva o null
  const [lightboxImage, setLightboxImage] = useState(null);

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

  return (
    <div className="min-h-screen bg-ink text-bone">
      <Navbar language={language} onLanguageChange={handleLanguageChange} />

      <main>
        <Hero language={language} />
        <Gallery language={language} onImageClick={handleImageClick} />
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

export default App;