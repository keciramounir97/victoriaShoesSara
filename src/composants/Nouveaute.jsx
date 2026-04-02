import {Link} from  "react-router-dom"
import { ArrowRight } from 'lucide-react';
import ProductCard from "../composants/ProductCard"
import {products} from "../data"
import {useState} from "react"
export default function Nouveaute() {
    
    const [wishlist, setWishlist] = useState([]);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);




    const openProductDetail = (product) => {
        setSelectedProduct(product);
        setIsProductDetailOpen(true);
      };
    
    const toggleWishlist = (productId) => {
        setWishlist(prev => 
          prev.includes(productId) 
            ? prev.filter(id => id !== productId) 
            : [...prev, productId]
        );
      };
      const openQuickView = (product) => {
        setSelectedProduct(product);
        setIsQuickViewOpen(true);
      };
    
    return <>
     <div className="px-7  pt-8">
       <div className="flex justify-between" >
       <h2 className=" title"> Nouveautés </h2>
        <button> 
        <Link to="/shop" className="links flex  "> Tout Voir <ArrowRight className="w-4 h-4 ml-1 mt-1"/> </Link>
        </button>
        </div>
        <p className="text-gray-600"> Les dernières arrivages</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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