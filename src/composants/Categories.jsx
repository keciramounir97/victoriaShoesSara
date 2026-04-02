import {Link} from  "react-router-dom"
import "../styles/categories.css"
import { ArrowRight } from 'lucide-react';
import heels from "../assets/icons/icon-heels.jpg"
import sneakers from "../assets/icons/icon-basket.jpg"
import boots from "../assets/icons/icon-boots.png"
import sandals from "../assets/icons/icon-sandale.jpg"
import flats from "../assets/icons/icon-flat.png"
import { useLanguage } from "../contexts/LanguageContext.jsx";
export const categories = [
    { id: 'heels', name: 'Heels', icon: <img  src={heels}/>, count: 3 },
    { id: 'sneakers', name: 'Sneakers', icon: <img  src={sneakers}/>, count: 2 },
    { id: 'boots', name: 'Boots', icon: <img  src={boots}/>, count: 3 },
    { id: 'sandals', name: 'Sandals', icon: <img  src={sandals}/>, count: 2 },
    { id: 'flats', name: 'Flats', icon: <img  src={flats}/>, count: 2 },
  ];
export default function Categories() {
    const { t } = useLanguage();
    return (
    <>
        <div className="px-7 flex justify-between">
        <h2 className=" title"> {t("home.categories")} </h2>
        <button> 
        <Link to="/shop" className="links flex  "> {t("common.viewAll")} <ArrowRight className="w-4 h-4 ml-1 mt-1"/> </Link>
        </button>
        </div>
        <br />
     <section  className=" px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
     {categories.map(cat => (
            <button 
              key={cat.id}
              className="p-6 bg-gradient-to-br from-rose-50 to-amber-50 rounded-xl border border-rose-100 hover:border-rose-300 hover:shadow-lg transition-all group"
            >
              <div className=" mb-3 group-hover:scale-110 transition-transform icons mx-auto">{cat.icon}</div>
              <h3 className="category-name">{cat.name}</h3>
              <p className="text-sm text-gray-500">{cat.count} articles</p>
            </button>
          ))}
     </section>
        </>
    )
}