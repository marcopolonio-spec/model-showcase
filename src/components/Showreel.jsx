import { useEffect, useRef, useState } from 'react';
import { usePortfolioData } from '../context/PortfolioContext.jsx';

const Showreel = ({ language }) => {
  const { data } = usePortfolioData();
  const { showreel } = data;
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

  const embedUrl = `https://www.youtube.com/embed/${showreel.youtubeVideoId}?rel=0&modestbranding=1&color=white`;

  return (
    <section
      id="showreel"
      ref={sectionRef}
      className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
      aria-label="Showreel"
    >
      {/* Sfondo texture sottile */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(217,199,167,0.04),transparent_50%)]" />

      <div
        className={`relative mx-auto max-w-4xl transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {/* Intestazione */}
        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-3 text-[11px] uppercase tracking-[0.4em] text-sand/70">
            Showreel
          </p>
          <h2 className="font-serif text-4xl font-light leading-tight text-bone sm:text-5xl">
            {showreel.title[language] || showreel.title.it}
          </h2>
          {showreel.description[language] && (
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-bone/60">
              {showreel.description[language]}
            </p>
          )}
        </div>

        {/* Video player — aspect-ratio 16:9 responsive */}
        <div className="relative overflow-hidden rounded-sm border border-bone/10 bg-onyx shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
          <div className="relative aspect-video w-full">
            <iframe
              src={embedUrl}
              title={showreel.title[language] || showreel.title.it}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showreel;