import { ArrowRight, MapPin, Mail, Phone } from 'lucide-react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { categoryIds, categoryLabels } from '../data/categoryConfig';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { language, t } = useLanguage();

  const socialLinks = [
    { icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook', bgHover: 'hover:bg-blue-600' },
    { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram', bgHover: 'hover:bg-pink-600' },
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white mt-8">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: '#f9a8d4',
                  textTransform: 'uppercase',
                }}
              >
                Victoria
              </span>
              <span
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#fbcfe8',
                  letterSpacing: '0.02em',
                }}
              >
                Shoes
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{t('footerTagline')}</p>

            <div className="flex space-x-3 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-slate-700 ${social.bgHover} p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1`}
                  aria-label={social.label}
                >
                  <social.icon size={18} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-lg mb-4">{t('footerShop')}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {categoryIds.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/shop?category=${cat.id}`}
                    className="hover:text-rose-400 transition-colors flex items-center gap-2 no-underline text-inherit"
                  >
                    <span className="text-lg leading-none">{cat.icon}</span>
                    {language === 'en' ? categoryLabels.en[cat.id] : categoryLabels.fr[cat.id]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-amber-400">{t('footerHelp')}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="hover:text-amber-400 transition-colors cursor-pointer">{t('footerSize')}</li>
              <li className="hover:text-amber-400 transition-colors cursor-pointer">{t('footerShipping')}</li>
              <li className="hover:text-amber-400 transition-colors cursor-pointer">{t('footerReturns')}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-amber-400">{t('footerContact')}</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-amber-400 mt-0.5 shrink-0" aria-hidden />
                <span>Alger, Algeria</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-amber-400 shrink-0" aria-hidden />
                <a href="mailto:hello@victoria.com" className="hover:text-amber-400 transition-colors no-underline text-inherit">
                  hello@victoria.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-amber-400 shrink-0" aria-hidden />
                <a href="tel:+21361234567" className="hover:text-amber-400 transition-colors no-underline text-inherit">
                  +213 612 345 67
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2 text-gray-200">{t('footerStay')}</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder={t('footerEmailPh')}
                  className="bg-slate-700 text-white text-sm px-3 py-2 rounded-lg flex-1 min-w-0 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  type="button"
                  className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-lg transition-colors shrink-0"
                  aria-label="Newsletter"
                >
                  <ArrowRight size={18} className="mx-auto" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400 text-center md:text-left">
            <p>
              &copy; {currentYear} Victoria Shoes. {t('footerRights')}
            </p>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <button type="button" className="hover:text-amber-400 transition-colors bg-transparent border-0 text-inherit cursor-pointer">
                {t('footerPrivacy')}
              </button>
              <button type="button" className="hover:text-amber-400 transition-colors bg-transparent border-0 text-inherit cursor-pointer">
                {t('footerTerms')}
              </button>
              <Link className="hover:text-amber-400 transition-colors no-underline text-inherit" to="/contact">
                {t('navContact')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
