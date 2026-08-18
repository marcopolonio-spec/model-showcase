import { usePortfolioData } from '../context/PortfolioContext.jsx';
import { Instagram, Linkedin } from 'lucide-react';
import TiktokIcon from './icons/TiktokIcon.jsx';
import { APP_VERSION } from '../config/version.js';

const socialIcons = {
  Instagram,
  TikTok: TiktokIcon,
  LinkedIn: Linkedin,
};

// Etichetta della versione mostrata nel footer, localizzata.
const versionLabels = {
  it: 'Versione',
  en: 'Version',
  fr: 'Version',
};

const Footer = ({ language }) => {
  const { data } = usePortfolioData();
  const { modelInfo, socials, uiText } = data;
  const t = uiText[language];
  const year = new Date().getFullYear();
  const versionLabel = versionLabels[language] ?? 'Versione';

  return (
    <footer className="border-t border-bone/10 bg-onyx/40" aria-label="Footer">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Logo */}
          <a href="#home" className="text-bone">
            <span className="font-serif text-xl uppercase tracking-[0.2em]">
              {modelInfo.lastName}
            </span>
          </a>

          {/* Link nav */}
          <nav aria-label="Navigazione footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {t.nav.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-[10px] uppercase tracking-[0.25em] text-bone/50 transition-colors duration-300 hover:text-sand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            {socials.map((s) => {
              const Icon = socialIcons[s.name];
              return (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bone/50 transition-colors duration-300 hover:text-sand"
                  aria-label={s.name}
                >
                  {Icon ? <Icon size={16} /> : <span className="text-xs">{s.name[0]}</span>}
                </a>
              );
            })}
          </div>
        </div>

        {/* Riga copyright */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-bone/5 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-bone/40">
            © {year} {modelInfo.name}. {t.footerRights}
          </p>
          <p className="text-xs text-bone/30">
            {t.footerCredit} · {versionLabel} {APP_VERSION}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;