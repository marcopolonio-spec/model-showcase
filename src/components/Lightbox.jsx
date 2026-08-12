import { useCallback, useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioContext.jsx';
import { assetUrl } from '../data/portfolioData.js';

const Lightbox = ({ image, onClose, language }) => {
  const { data } = usePortfolioData();
  const { galleryImages, uiText } = data;
  const t = uiText[language];
  const [currentIndex, setCurrentIndex] = useState(
    () => galleryImages.findIndex((img) => img.id === image?.id) ?? 0
  );
  const [imgLoaded, setImgLoaded] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  const currentImage = galleryImages[currentIndex];

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % galleryImages.length);
    setImgLoaded(false);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex(
      (i) => (i - 1 + galleryImages.length) % galleryImages.length
    );
    setImgLoaded(false);
  }, []);

  // Navigazione da tastiera: → / ← / ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          goNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goPrev();
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, onClose]);

  // Blocca lo scroll della pagina quando il lightbox è aperto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Reset immagine caricata quando cambia la foto (effetto fade)
  useEffect(() => {
    setImgLoaded(false);
  }, [currentIndex]);

  // Supporto swipe su mobile
  const onTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const threshold = 50;
    if (deltaX > threshold) goPrev();
    else if (deltaX < -threshold) goNext();
    setTouchStartX(null);
  };

  if (!image || galleryImages.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-ink/98 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Lightbox portfolio"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Barra superiore */}
      <div className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-6">
        <p className="text-[11px] uppercase tracking-[0.3em] text-bone/60">
          {currentIndex + 1} / {galleryImages.length}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 text-bone/80 transition-all duration-300 hover:border-sand hover:text-sand"
          aria-label={t.close}
        >
          <X size={20} />
        </button>
      </div>

      {/* Immagine centrale */}
      <div className="flex flex-1 items-center justify-center overflow-hidden px-4 pb-4 sm:px-16">
        <figure className="group relative flex h-full w-full max-w-5xl items-center justify-center">
          <img
            key={currentImage.id}
            src={assetUrl(currentImage.src)}
            alt={currentImage.alt}
            onLoad={() => setImgLoaded(true)}
            className={`max-h-full max-w-full object-contain transition-opacity duration-500 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Frecce navigazione — visibili su hover (desktop) */}
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-bone/20 p-3 text-bone/80 opacity-80 transition-all duration-300 hover:border-sand hover:text-sand sm:opacity-0 sm:group-hover:opacity-100"
            aria-label={t.prev}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-bone/20 p-3 text-bone/80 opacity-80 transition-all duration-300 hover:border-sand hover:text-sand sm:opacity-0 sm:group-hover:opacity-100"
            aria-label={t.next}
          >
            <ChevronRight size={24} />
          </button>
        </figure>
      </div>

      {/* Didascalia */}
      <div className="flex flex-col items-center gap-1 px-6 pb-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="font-serif text-lg text-bone">{currentImage.alt}</p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-sand">
          {currentImage.category}
        </p>
      </div>

      {/* Contatori / mini indicatore */}
      <div className="pb-6 text-center">
        <div className="mx-auto flex w-24 gap-1">
          {galleryImages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setCurrentIndex(i);
                setImgLoaded(false);
              }}
              className={`h-px flex-1 transition-all duration-500 ${
                i === currentIndex ? 'bg-sand' : 'bg-bone/20 hover:bg-bone/40'
              }`}
              aria-label={`Vai alla foto ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;