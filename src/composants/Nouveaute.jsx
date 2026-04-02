import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "../composants/ProductCard";
import { products } from "../data";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext.jsx";
export default function Nouveaute() {
  const { t } = useLanguage();
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);




  const openProductDetail = (product) => {
    setSelectedProduct(product);
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  };
  const openQuickView = (product) => {
    setSelectedProduct(product);
  };

  return <>
     <div className="px-4 sm:px-7 pt-8">
       <div className="flex items-center justify-between" >
       <h2 className=" title"> {t("home.nouveautes")} </h2>
        <Link to="/shop" className="links flex items-center gap-1 no-underline"> {t("common.all")} <ArrowRight className="w-4 h-4"/> </Link>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{t("home.arrivals")}</p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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