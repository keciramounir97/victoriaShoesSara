import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Nopage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <Motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <p className="text-8xl font-black text-pink-200 dark:text-pink-900 select-none">404</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white -mt-4 mb-4">{t('nopageTitle')}</h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto mb-8">{t('nopageText')}</p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-pink-600 text-white font-semibold no-underline hover:bg-pink-700 transition"
        >
          {t('nopageCta')}
        </Link>
      </Motion.div>
    </div>
  );
}
