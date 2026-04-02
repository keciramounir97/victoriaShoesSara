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
        {selectedProduct && (
          <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-3 sm:items-center"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl dark:bg-zinc-900"
              onClick={(event) => event.stopPropagation()}
            >
              <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-300">{selectedProduct.brand}</p>
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="my-4 h-60 w-full rounded-xl object-cover"
              />
              <p className="text-sm">{selectedProduct.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-semibold text-rose-600">{selectedProduct.price} Da</p>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
    </>
}