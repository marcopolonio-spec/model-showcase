import { useEffect, useMemo, useRef, useState } from 'react';
import { usePortfolioData } from '../context/PortfolioContext.jsx';
import { assetUrl } from '../data/portfolioData.js';

const Gallery = ({ language, onImageClick }) => {
  const { data } = usePortfolioData();
  const { galleryImages, categories, uiText } = data;
  const t = uiText[language];
  const [activeFilter, setActiveFilter] = useState('Tutti');
  const [visibleCount, setVisibleCount] = useState(9);

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Filtra per categoria
  const filteredImages = useMemo(() => {
    const list =
      activeFilter === 'Tutti'
        ? galleryImages
        : galleryImages.filter((img) => img.category === activeFilter);
    return list.slice(0, visibleCount);
  }, [activeFilter, visibleCount]);

  const totalForFilter =
    activeFilter === 'Tutti'
      ? galleryImages.length
      : galleryImages.filter((img) => img.category === activeFilter).length;

  const handleFilterChange = (cat) => {
    setActiveFilter(cat);
    setVisibleCount(9);
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
      aria-label="Portfolio"
    >
      {/* Intestazione */}
      <div
        className={`mb-12 flex flex-col gap-6 sm:mb-16 md:flex-row md:items-end md:justify-between transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.4em] text-sand/70">
            Portfolio
          </p>
          <h2 className="font-serif text-4xl font-light text-bone sm:text-5xl">
            {t.galleryHeadingPrefix} <span className="italic text-sand">{t.galleryHeadingEmphasis}</span>
          </h2>
        </div>

        <p className="max-w-md text-sm leading-relaxed text-bone/60">
          Una selezione di scatti che
          raccontano versatilità, intensità e stile.
        </p>
      </div>

      {/* Filtri categoria */}
      <div
        className={`mb-10 flex flex-wrap items-center gap-x-6 gap-y-3 transition-all duration-1000 delay-150 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
        role="group"
        aria-label="Filtri portfolio"
      >
        {categories.map((cat) => {
          const isActive = cat === activeFilter;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => handleFilterChange(cat)}
              className={`relative pb-1 text-[12px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                isActive ? 'text-sand' : 'text-bone/50 hover:text-bone'
              }`}
              aria-pressed={isActive}
            >
              {cat === 'Tutti' ? 'All' : cat}
              <span
                className={`absolute -bottom-0.5 left-0 h-px bg-sand transition-all duration-500 ${
                  isActive ? 'w-full' : 'w-0'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Griglia masonry */}
      <div className="masonry">
        {filteredImages.map((img, i) => {
          // Aspect-ratio dinamicamente secondo il dato, per variare le altezze
          const aspect =
            img.ratio === '4/3'
              ? 'aspect-[4/3]'
              : img.ratio === '3/4'
              ? 'aspect-[3/4]'
              : img.ratio === '1/1'
              ? 'aspect-square'
              : img.ratio === '5/4'
              ? 'aspect-[5/4]'
              : 'aspect-[4/5]';

          return (
            <figure
              key={img.id}
              className={`masonry-item reveal ${isVisible ? 'is-visible' : ''} ${
                i % 3 === 1 ? 'reveal-delay-1' : i % 3 === 2 ? 'reveal-delay-2' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => onImageClick(img)}
                className="group relative block w-full cursor-zoom-in overflow-hidden bg-stone"
                aria-label={`Apri immagine: ${img.alt}`}
              >
                <div className={`relative w-full ${aspect}`}>
                  <img
                    src={assetUrl(img.src)}
                    alt={img.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>

                {/* Overlay hover */}
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/85 via-ink/20 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-sand">
                    {img.category}
                  </p>
                  <p className="mt-1 font-serif text-lg text-bone">{img.alt}</p>
                </div>

                {/* Icona zoom */}
                <div className="pointer-events-none absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-bone/25 bg-ink/40 text-bone opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
              </button>
            </figure>
          );
        })}
      </div>

      {/* Pulsante "mostra altro" quando ci sono più foto del filtro attivo */}
      {totalForFilter > visibleCount && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + 6)}
            className="border border-bone/25 px-10 py-3.5 text-[11px] font-medium uppercase tracking-[0.3em] text-bone/80 transition-all duration-500 hover:border-sand hover:text-sand"
          >
            Carica altre foto
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
