import { Link } from "react-router-dom";
import "../styles/categories.css";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { categories } from "../constants/categories.js";
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
              <div className=" mb-3 group-hover:scale-110 transition-transform icons mx-auto">
                <img src={cat.iconSrc} alt={cat.name} />
              </div>
              <h3 className="category-name">{cat.name}</h3>
              <p className="text-sm text-gray-500">{cat.count} articles</p>
            </button>
          ))}
     </section>
        </>
    )
}