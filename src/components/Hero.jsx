import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ArrowDown } from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioContext.jsx';
import { assetUrl } from '../data/portfolioData.js';

const Hero = ({ language }) => {
  const { data } = usePortfolioData();
  const { modelInfo, uiText } = data;
  const t = uiText[language];
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-label="Introduzione"
    >
      {/* Immagine di sfondo full-screen */}
      <div className="absolute inset-0">
        <img
          src={assetUrl(modelInfo.heroImage)}
          alt=""
          onLoad={() => setImgLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-[2000ms] ease-out ${
            imgLoaded ? 'scale-100 opacity-100' : 'scale-[1.05] opacity-0'
          }`}
        />
        {/* Overlay gradiente per leggibilità */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink" />
      </div>

      {/* Contenuto */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.45em] text-sand/90 sm:text-xs">
            {modelInfo.title}
          </p>

          <h1 className="font-serif text-6xl font-light leading-none tracking-[0.08em] text-bone sm:text-7xl md:text-8xl lg:text-9xl">
            {modelInfo.firstName}
            <span className="block italic text-sand/90 sm:inline sm:ml-4">
              {modelInfo.lastName}
            </span>
          </h1>

          <div className="mx-auto mt-8 h-px w-16 bg-sand/50 sm:mt-10" />

          <p className="mx-auto mt-8 max-w-xl font-serif text-lg italic leading-relaxed text-bone/80 sm:text-xl">
            {modelInfo.tagline[language]}
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-2 border border-bone/40 bg-bone/5 px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.3em] text-bone backdrop-blur-sm transition-all duration-500 hover:border-sand hover:bg-sand hover:text-ink"
            >
              {t.viewWork}
              <ArrowDown size={14} className="transition-transform duration-500 group-hover:translate-y-0.5" />
            </a>

            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.3em] text-sand/90 transition-colors duration-500 hover:text-bone"
            >
              {t.getInTouch}
            </a>
          </div>
        </div>
      </div>

      {/* Indicatore scroll */}
      <a
        href="#portfolio"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-bone/50 transition-colors duration-300 hover:text-sand"
        aria-label="Vai al portfolio"
      >
        <ChevronDown size={28} className="animate-bounce" />
      </a>

      {/* Dettaglio laterale — riga verticale */}
      <div className="absolute bottom-0 left-8 top-0 z-10 hidden w-px bg-bone/10 lg:block" />
      <div className="absolute bottom-0 right-8 top-0 z-10 hidden w-px bg-bone/10 lg:block" />
    </section>
  );
};

export default Hero;