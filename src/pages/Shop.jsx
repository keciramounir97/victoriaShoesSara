import { useMemo, useState } from 'react'; // `useMemo` recalcule la liste filtrée seulement si les critères changent (perf).
import { useSearchParams } from 'react-router-dom'; // Lit `?category=` et `?filter=` dans l’URL pour lier catégories/footer à la boutique.
import { products } from '../data'; // Données statiques (démo sans API).
import ProductCard from '../composants/ProductCard'; // Carte produit réutilisée (badges, prix, wishlist locale).
import { useLanguage } from '../context/LanguageContext'; // Fonction `t()` pour titres et messages vides.

export default function Shop() {
  const { t } = useLanguage(); // Hook du contexte langue : pas de props à passer depuis App.
  const [searchParams] = useSearchParams(); // Hook stable : objet URLSearchParams en lecture seule.
  const categoryQ = searchParams.get('category') || 'all'; // `get` retourne `null` si absent → on force « all ».
  const filterQ = searchParams.get('filter'); // Valeurs attendues : `new`, `bestseller`, ou absent.

  const [sort, setSort] = useState('name'); // État local du tri : pas dans l’URL pour garder l’UI simple.

  const filtered = useMemo(() => {
    let list = [...products]; // Copie pour ne pas muter le tableau exporté.
    if (categoryQ && categoryQ !== 'all') {
      list = list.filter((p) => p.category === categoryQ);
    }
    if (filterQ === 'bestseller') {
      list = list.filter((p) => p.isBestseller);
    }
    if (filterQ === 'new') {
      list = list.filter((p) => p.isNew);
    }
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [categoryQ, filterQ, sort]);

  const [wishlist, setWishlist] = useState([]); // Favoris uniquement sur cette page (démo) ; pas de persistance.

  const toggleWishlist = (productId) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  };

  const openQuickView = (product) => {
    console.log('Quick view', product.name); // Placeholder : une modale pourrait s’ouvrir ici.
  };

  const openProductDetail = (product) => {
    console.log('Detail', product.name); // Placeholder : navigation vers `/product/:id` en vrai site.
  };

  return (
    <main className="min-h-screen px-4 sm:px-6 py-10 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-pink-600 dark:text-pink-400">{t('shopTitle')}</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">{t('shopSubtitle')}</p>
      </header>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <label className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          <span>{t('shopSort')}</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-2xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-zinc-900 dark:text-zinc-100"
          >
            <option value="name">{t('shopSortName')}</option>
            <option value="price-asc">{t('shopSortPriceAsc')}</option>
            <option value="price-desc">{t('shopSortPriceDesc')}</option>
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-zinc-500 py-20">{t('shopEmpty')}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              openQuickView={openQuickView}
              openProductDetail={openProductDetail}
            />
          ))}
        </div>
      )}
    </main>
  );
}
