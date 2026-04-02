import { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white dark:from-zinc-950 dark:to-zinc-900 p-4">
      <Motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
        <h1 className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">{t('contactTitle')}</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">{t('contactSubtitle')}</p>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl shadow-xl border border-pink-100 dark:border-zinc-700 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">{t('contactName')}</label>
            <input required className="w-full px-4 py-3 rounded-2xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 outline-none focus:border-pink-500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('contactEmail')}</label>
            <input type="email" required className="w-full px-4 py-3 rounded-2xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 outline-none focus:border-pink-500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('contactMessage')}</label>
            <textarea required rows={4} className="w-full px-4 py-3 rounded-2xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 outline-none focus:border-pink-500 resize-y" />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-2xl transition"
          >
            {t('contactSend')}
          </button>
          {sent && <p className="text-sm text-emerald-600 dark:text-emerald-400 text-center">{t('contactSent')}</p>}
        </form>
      </Motion.div>
    </div>
  );
}
