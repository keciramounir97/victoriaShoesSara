import { useMemo } from 'react';
// useMemo calcule les stats une seule fois tant que `products` est stable (import statique).
import { products } from '../../data';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { LayoutDashboard, Package, Tags, Sparkles, TrendingUp } from 'lucide-react';
// Icônes Lucide : SVG léger, cohérent avec le reste du site.

export default function AdminDashboard() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const stats = useMemo(() => {
    const total = products.length;
    const categories = new Set(products.map((p) => p.category)).size;
    const avgPrice = Math.round(products.reduce((s, p) => s + p.price, 0) / total);
    const newCount = products.filter((p) => p.isNew).length;
    const bestCount = products.filter((p) => p.isBestseller).length;
    return { total, categories, avgPrice, newCount, bestCount };
  }, []);

  const cardBase =
    'rounded-3xl p-6 border shadow-lg transition-shadow hover:shadow-xl';
  const lightCard = 'bg-white border-pink-100 text-zinc-800';
  const darkCard = 'bg-zinc-900 border-zinc-700 text-zinc-100';

  return (
    <main className="min-h-[calc(100vh-120px)] px-4 py-10 md:px-8 max-w-6xl mx-auto">
      <header className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400 mb-2">
            <LayoutDashboard className="w-6 h-6" aria-hidden />
            <span className="text-sm font-semibold uppercase tracking-wider">Admin</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">{t('adminTitle')}</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 max-w-xl">{t('adminSubtitle')}</p>
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
        <article className={`${cardBase} ${theme === 'dark' ? darkCard : lightCard}`}>
          <Package className="w-8 h-8 text-pink-500 mb-3" aria-hidden />
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{t('adminProducts')}</p>
          <p className="text-3xl font-bold tabular-nums">{stats.total}</p>
        </article>
        <article className={`${cardBase} ${theme === 'dark' ? darkCard : lightCard}`}>
          <Tags className="w-8 h-8 text-amber-500 mb-3" aria-hidden />
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{t('adminCategories')}</p>
          <p className="text-3xl font-bold tabular-nums">{stats.categories}</p>
        </article>
        <article className={`${cardBase} ${theme === 'dark' ? darkCard : lightCard}`}>
          <TrendingUp className="w-8 h-8 text-emerald-500 mb-3" aria-hidden />
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{t('adminAvgPrice')}</p>
          <p className="text-3xl font-bold tabular-nums">{stats.avgPrice} Da</p>
        </article>
        <article className={`${cardBase} ${theme === 'dark' ? darkCard : lightCard}`}>
          <Sparkles className="w-8 h-8 text-violet-500 mb-3" aria-hidden />
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{t('adminNew')}</p>
          <p className="text-3xl font-bold tabular-nums">{stats.newCount}</p>
          <p className="text-xs text-zinc-500 mt-1">{t('adminBestsellers')}: {stats.bestCount}</p>
        </article>
      </section>

      <section className={`${cardBase} ${theme === 'dark' ? darkCard : lightCard} overflow-x-auto`}>
        <h2 className="text-lg font-semibold mb-4">{t('adminProducts')}</h2>
        <table className="w-full text-sm text-left min-w-[520px]">
          <thead>
            <tr className="border-b border-pink-100 dark:border-zinc-700">
              <th className="py-3 pr-4 font-medium">{t('adminTableProduct')}</th>
              <th className="py-3 pr-4 font-medium">{t('adminTableBrand')}</th>
              <th className="py-3 pr-4 font-medium">{t('adminTableCategory')}</th>
              <th className="py-3 font-medium text-right">{t('adminTablePrice')}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-pink-50 dark:border-zinc-800 last:border-0">
                <td className="py-3 pr-4">{p.name}</td>
                <td className="py-3 pr-4 text-zinc-600 dark:text-zinc-400">{p.brand}</td>
                <td className="py-3 pr-4 capitalize">{p.category}</td>
                <td className="py-3 text-right tabular-nums font-medium text-pink-600 dark:text-pink-400">
                  {p.price} Da
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
