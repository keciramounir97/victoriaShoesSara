import Badge from './Badge';
import Button from './Button';
import { ArrowRight } from 'lucide-react';
import { products } from '../data';
import '../styles/bestSellers.css';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function BestSellers() {
  const { t } = useLanguage();

  return (
    <section className="bg-gradient-to-br from-rose-50 to-amber-50 dark:from-zinc-900 dark:to-zinc-950 rounded-2xl mt-12 sm:mt-20 mx-4 sm:mx-7">
      <div className="flex flex-col lg:flex-row gap-8 items-center py-6 sm:py-0">
        <div className="lg:w-1/2 text-center lg:text-left pl-4 sm:pl-6 pr-4 lg:pr-0">
          <Badge className="mb-4 bg-amber-500 text-white mt-4 inline-block">{t('bestBadge')}</Badge>
          <h2 className="text-prf text-2xl mb-4">{t('bestTitle')}</h2>
          <p className="text-gray-600 dark:text-zinc-400 mb-6">{t('bestSubtitle')}</p>
          <Link to="/shop?filter=bestseller" className="inline-block no-underline">
            <Button className="bg-rose-500 hover:bg-rose-600 text-white border-0">
              {t('bestCta')}
              <ArrowRight className="w-4 h-4 ml-2 inline" aria-hidden />
            </Button>
          </Link>
        </div>
        <div className="lg:w-1/2 w-full grid grid-cols-2 gap-3 sm:gap-4 px-4 pb-6 lg:pb-0 lg:pr-6">
          {products
            .filter((p) => p.isBestseller)
            .slice(0, 4)
            .map((p) => (
              <Link
                key={p.id}
                to="/shop"
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-md mt-0 sm:mt-6 block"
              >
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
