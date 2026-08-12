import { useEffect, useState } from 'react';
import { Menu, X, ChevronDown, Instagram } from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioContext.jsx';
import TiktokIcon from './icons/TiktokIcon.jsx';

const socialIcons = {
  Instagram,
  TikTok: TiktokIcon,
  LinkedIn: null, // aggiunto in Fallback
};

const Navbar = ({ language, onLanguageChange }) => {
  const { data } = usePortfolioData();
  const { modelInfo, socials, supportedLanguages, uiText } = data;
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const t = uiText[language];
  const currentLang = supportedLanguages.find((l) => l.code === language);

  // Blur / sfondo navbar dopo scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Chiudi menu quando la lingua cambia
  useEffect(() => {
    setIsOpen(false);
    setLangOpen(false);
  }, [language]);

  // Blocca scroll quando il menu mobile è aperto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = () => setIsOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isScrolled || isOpen
          ? 'bg-ink/85 backdrop-blur-md shadow-[0_1px_0_rgba(245,240,232,0.06)]'
          : 'bg-transparent'
      }`}
    >
      {/* Skip link per accessibilità */}
      <a
        href="#portfolio"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-sand focus:px-4 focus:py-2 focus:text-ink"
      >
        Vai al portfolio
      </a>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12" aria-label="Navigazione principale">
        {/* Logo */}
        <a
          href="#home"
          onClick={handleNavClick}
          className="group flex items-baseline gap-2 text-bone"
        >
          <span className="font-serif text-xl tracking-[0.2em] uppercase sm:text-2xl">
            {modelInfo.lastName}
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.35em] text-sand/80 sm:block">
            {t.logoTitle}
          </span>
        </a>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {t.nav.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="link-underline text-[11px] font-medium uppercase tracking-[0.25em] text-bone/80 transition-colors duration-300 hover:text-bone"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Azioni a destra: lingua + menu mobile */}
        <div className="flex items-center gap-2">
          {/* Dropdown lingua */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1 rounded-full border border-bone/15 px-3 py-1.5 text-[11px] font-medium tracking-widest text-bone/80 transition-colors duration-300 hover:border-sand/40 hover:text-bone"
              aria-expanded={langOpen}
              aria-haspopup="listbox"
            >
              <span>{currentLang.label}</span>
              <ChevronDown
                size={12}
                className={`transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {langOpen && (
              <ul
                className="absolute right-0 mt-2 w-40 overflow-hidden rounded-lg border border-bone/10 bg-onyx/95 py-1 shadow-2xl shadow-black/50 backdrop-blur-md"
                role="listbox"
                aria-label="Seleziona lingua"
              >
                {supportedLanguages.map((lang) => (
                  <li key={lang.code}>
                    <button
                      type="button"
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors duration-200 ${
                        lang.code === language
                          ? 'bg-stone text-sand'
                          : 'text-bone/70 hover:bg-stone hover:text-bone'
                      }`}
                      role="option"
                      aria-selected={lang.code === language}
                    >
                      <span className="font-serif text-base">{lang.label}</span>
                      <span className="text-xs text-bone/50">{lang.labelFull}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Pulsante menu mobile */}
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="rounded-full border border-bone/15 p-2 text-bone transition-colors duration-300 hover:border-sand/40 md:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Chiudi menu' : 'Apri menu'}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        className={`overflow-hidden transition-all duration-500 md:hidden ${
          isOpen ? 'max-h-[calc(100vh-64px)] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex h-[calc(100vh-64px)] flex-col justify-between px-6 pb-10 pt-6">
          <ul className="space-y-2">
            {t.nav.map((link, i) => (
              <li key={link.id} style={{ transitionDelay: isOpen ? `${i * 60}ms` : '0ms' }}>
                <a
                  href={`#${link.id}`}
                  onClick={handleNavClick}
                  className="block border-b border-bone/5 py-4 font-serif text-3xl text-bone/90 transition-colors duration-300 hover:text-sand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-sand/70">
              Seguimi su
            </p>
            <div className="flex gap-4">
              {socials
                .filter((s) => s.name !== 'LinkedIn')
                .map((s) => {
                  const Icon = socialIcons[s.name];
                  return (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/15 text-bone/80 transition-all duration-300 hover:border-sand/50 hover:text-sand"
                      aria-label={s.name}
                    >
                      {Icon ? <Icon size={18} /> : <span className="text-sm">{s.name[0]}</span>}
                    </a>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;