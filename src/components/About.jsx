import { useEffect, useRef, useState } from 'react';
import { Building2, MapPin } from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioContext.jsx';

const About = ({ language }) => {
  const { data } = usePortfolioData();
  const { modelInfo, uiText } = data;
  const t = uiText[language];
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
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
      aria-label="Chi sono"
    >
      {/* Sfondo texture sottile */}
      <div className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(circle_at_50%_120%,rgba(217,199,167,0.05),transparent_60%)] lg:block" />

      <div className="relative grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        {/* Colonna bio */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <p className="mb-3 text-[11px] uppercase tracking-[0.4em] text-sand/70">
            About
          </p>
          <h2 className="font-serif text-4xl font-light leading-tight text-bone sm:text-5xl">
            {t.aboutHeadingPrefix} <span className="italic text-sand">{t.aboutHeadingEmphasis}</span>
          </h2>

          <p className="mt-8 max-w-xl font-serif text-lg italic leading-relaxed text-bone/80 sm:text-xl">
            “{modelInfo.tagline[language]}”
          </p>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-bone/65">
            {modelInfo.bio[language]}
          </p>

          {/* Firma */}
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px w-12 bg-sand/60" />
            <p className="font-serif text-2xl italic text-bone">
              {modelInfo.name}
            </p>
          </div>
        </div>

        {/* Colonna misure + agenzie */}
        <div
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Misure: sezione disabilitata (non visibile). Per riattivarla,
              ripristinare il blocco JSX "Misure" e l'import di Ruler da
              lucide-react in cima a questo file. */}

          {/* Agenzie */}
          <div className="mt-6 rounded-sm border border-bone/10 bg-onyx/60 p-6 backdrop-blur-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <Building2 size={18} className="text-sand" />
              <h3 className="text-[11px] font-medium uppercase tracking-[0.3em] text-bone/80">
                {t.agenciesTitle}
              </h3>
            </div>

            <ul className="space-y-4">
              {modelInfo.agencies.map((agency) => (
                <li
                  key={`${agency.name}-${agency.city}`}
                  className="flex items-center justify-between border-b border-bone/5 pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium text-bone/90">{agency.name}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-bone/50">
                      <MapPin size={11} />
                      {agency.city}, {agency.country}
                    </p>
                  </div>
                  <span className="rounded-full border border-sand/30 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-sand">
                    {agency.country}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;