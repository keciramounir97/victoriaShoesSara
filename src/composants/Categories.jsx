import { Link } from "react-router-dom";
import "../styles/categories.css";
import { ArrowRight } from "lucide-react";
import heels from "../assets/icons/icon-heels.jpg";
import sneakers from "../assets/icons/icon-basket.jpg";
import boots from "../assets/icons/icon-boots.png";
import sandals from "../assets/icons/icon-sandale.jpg";
import flats from "../assets/icons/icon-flat.png";
import { useLanguage } from "../contexts/LanguageContext.jsx";
export const categories = [
  { id: "heels", name: "Heels", icon: <img src={heels} alt="heels category" />, count: 3 },
  { id: "sneakers", name: "Sneakers", icon: <img src={sneakers} alt="sneakers category" />, count: 2 },
  { id: "boots", name: "Boots", icon: <img src={boots} alt="boots category" />, count: 3 },
  { id: "sandals", name: "Sandals", icon: <img src={sandals} alt="sandals category" />, count: 2 },
  { id: "flats", name: "Flats", icon: <img src={flats} alt="flats category" />, count: 2 },
];
export default function Categories() {
  const { t } = useLanguage();

  return (
    <>
      <div className="px-4 sm:px-7 flex items-center justify-between">
        <h2 className="title">{t("home.categories")}</h2>
        <Link to="/shop" className="links flex items-center gap-1 no-underline">
          {t("common.all")} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <br />
      <section className="px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className="p-4 sm:p-6 bg-gradient-to-br from-rose-50 to-amber-50 rounded-xl border border-rose-100 hover:border-rose-300 hover:shadow-lg transition-all group dark:from-zinc-900 dark:to-zinc-800 dark:border-zinc-700"
          >
            <div className="mb-3 group-hover:scale-110 transition-transform icons mx-auto">{cat.icon}</div>
            <h3 className="category-name">{cat.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">{cat.count} articles</p>
          </button>
        ))}
      </section>
    </>
  );
}