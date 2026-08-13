import { useEffect, useRef, useState } from 'react';
import { Mail, Instagram, Linkedin } from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioContext.jsx';
import TiktokIcon from './icons/TiktokIcon.jsx';

const socialIcons = {
  Instagram,
  TikTok: TiktokIcon,
  LinkedIn: Linkedin,
};

const Contact = ({ language }) => {
  const { data } = usePortfolioData();
  const { modelInfo, socials, uiText } = data;
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
      aria-label="Contatti"
    >
      {/* Sfondo texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(217,199,167,0.04),transparent_50%)]" />

      <div
        className={`relative mx-auto max-w-3xl text-center transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {/* Intestazione */}
        <p className="mb-3 text-[11px] uppercase tracking-[0.4em] text-sand/70">
          {t.contactTitle}
        </p>
        <h2 className="font-serif text-4xl font-light leading-tight text-bone sm:text-6xl">
          Lavoriamo <span className="italic text-sand">insieme</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-bone/65">
          {t.contactSubtitle}
        </p>

        {/* Email principale */}
        <div className="mt-12">
          <a
            href={`mailto:${modelInfo.email}`}
            className="group inline-flex items-center gap-3 font-serif text-2xl text-bone transition-colors duration-300 hover:text-sand sm:text-4xl"
          >
            <Mail
              size={22}
              className="text-sand transition-transform duration-500 group-hover:-translate-y-0.5 sm:size-7"
            />
            {modelInfo.email}
          </a>
          <div className="mx-auto mt-4 h-px w-0 bg-sand/50 transition-all duration-700 group-hover:w-full" />
        </div>

        {/* Social */}
        <div className="mt-14">
          <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-bone/40">
            Seguimi su
          </p>
          <div className="flex justify-center gap-5">
            {socials.map((s) => {
              const Icon = socialIcons[s.name];
              return (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-14 w-14 items-center justify-center rounded-full border border-bone/15 text-bone/70 transition-all duration-500 hover:border-sand hover:text-sand"
                  aria-label={`${s.name} — ${s.handle}`}
                >
                  {Icon ? (
                    <Icon
                      size={18}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <span className="font-serif text-xl">{s.name[0]}</span>
                  )}
                </a>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-bone/40">{socials.map((s) => s.handle).join(' · ')}</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;