import { Link } from 'react-router-dom';
import '../styles/categories.css';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { categoryIds, categoryLabels } from '../data/categoryConfig';

export default function Categories() {
  const { language, t } = useLanguage();

  const list = categoryIds.map((c) => ({
    ...c,
    name: language === 'en' ? categoryLabels.en[c.id] : categoryLabels.fr[c.id],
    count: [3, 2, 3, 2, 2][categoryIds.indexOf(c)],
  }));

  return (
    <>
      <div className="px-4 sm:px-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="title">{t('categoriesTitle')}</h2>
        <button type="button" className="self-start sm:self-auto border-0 bg-transparent p-0">
          <Link to="/shop" className="links flex items-center gap-1 no-underline">
            {t('categoriesSeeAll')}
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </button>
      </div>
      <br />
      <section className="px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        {list.map((cat) => (
          <Link
            key={cat.id}
            to={`/shop?category=${cat.id}`}
            className="p-4 sm:p-6 bg-gradient-to-br from-rose-50 to-amber-50 dark:from-zinc-800 dark:to-zinc-900 rounded-xl border border-rose-100 dark:border-zinc-700 hover:border-rose-300 dark:hover:border-pink-500 hover:shadow-lg transition-all group text-left no-underline text-inherit"
          >
            <div className="mb-3 group-hover:scale-110 transition-transform icons mx-auto flex justify-center">{cat.icon}</div>
            <h3 className="category-name">{cat.name}</h3>
            <p className="text-sm text-gray-500 dark:text-zinc-400">
              {cat.count} {t('categoriesArticles')}
            </p>
          </Link>
        ))}
      </section>
    </>
  );
}
