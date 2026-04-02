import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../composants/ProductCard';
import { products } from '../data';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Nouveaute() {
  const { t } = useLanguage();
  const [wishlist, setWishlist] = useState([]);

  const openProductDetail = (product) => {
    console.log('Détail produit (démo)', product.name);
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    );
  };

  const openQuickView = (product) => {
    console.log('Aperçu rapide (démo)', product.name);
  };

  return (
    <>
      <div className="px-4 sm:px-7 pt-8">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <h2 className="title">{t('newTitle')}</h2>
          <button type="button" className="border-0 bg-transparent p-0 self-start">
            <Link to="/shop?filter=new" className="links flex items-center gap-1 no-underline">
              {t('categoriesSeeAll')}
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </button>
        </div>
        <p className="text-gray-600 dark:text-zinc-400">{t('newSubtitle')}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products
            .filter((p) => p.isNew)
            .slice(0, 4)
            .map((p) => (
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
      </div>
    </>
  );
}
