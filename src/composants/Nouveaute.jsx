import {Link} from  "react-router-dom"
import { ArrowRight } from 'lucide-react';
import ProductCard from "../composants/ProductCard"
import {products} from "../data"
import {useState} from "react"
import { useLanguage } from "../contexts/LanguageContext.jsx";
export default function Nouveaute() {
    const { t } = useLanguage();
    const [wishlist, setWishlist] = useState([]);
    const openProductDetail = () => {};
    
    const toggleWishlist = (productId) => {
        setWishlist(prev => 
          prev.includes(productId) 
            ? prev.filter(id => id !== productId) 
            : [...prev, productId]
        );
      };
      const openQuickView = () => {};
    
    return <>
     <div className="px-7  pt-8">
       <div className="flex justify-between" >
       <h2 className=" title"> {t("home.newArrivals")} </h2>
        <button> 
        <Link to="/shop" className="links flex  "> {t("common.viewAll")} <ArrowRight className="w-4 h-4 ml-1 mt-1"/> </Link>
        </button>
        </div>
        <p className="text-gray-600">{t("shop.subtitle")}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.filter(p => p.isNew).slice(0, 4).map(p => (
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
}