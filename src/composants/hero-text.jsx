import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function HeroText() {
  const { t } = useLanguage();

  return (
    <div className="h-full w-full flex flex-col justify-center px-6 sm:px-10 text-white py-10 sm:py-0">
      <p className="uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm mb-4">{t('heroBadge')}</p>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
        {t('heroTitle1')}
        <br />
        <span className="text-yellow-200">{t('heroTitle2')}</span>
      </h1>

      <p className="text-sm text-pink-100 mb-8 max-w-md">{t('heroDesc')}</p>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <Link
          to="/shop"
          className="px-6 py-3 rounded-full bg-white text-pink-700 font-semibold text-sm hover:bg-pink-50 transition-colors text-center no-underline"
        >
          {t('heroShop')}
        </Link>
        <Link
          to="/contact"
          className="px-6 py-3 rounded-full border border-pink-100 text-white font-semibold text-sm hover:bg-pink-600/40 transition-colors text-center no-underline"
        >
          {t('heroExplore')}
        </Link>
      </div>
    </div>
  );
}
