import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "../data";
import "../styles/bestSellers.css";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export default function BestSellers() {
  const { language, t } = useLanguage();
  const labels =
    language === "fr"
      ? {
          badge: "Best-sellers",
          description: "Découvrez les chaussures les plus appréciées par nos clientes.",
          button: "Découvrir",
        }
      : {
          badge: "Best-sellers",
          description: "Discover the shoes that our customers love the most.",
          button: "Discover",
        };

  return (
    <section className="mx-4 mt-16 rounded-2xl bg-gradient-to-br from-rose-50 to-amber-50 px-4 py-6 dark:from-zinc-900 dark:to-zinc-800 sm:mx-7 sm:px-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="mb-3 inline-flex rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
            {labels.badge}
          </span>
          <h2 className="text-prf text-2xl mb-2">{t("home.bestsellers")}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">{labels.description}</p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white no-underline hover:bg-rose-700"
        >
          {labels.button}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {products
          .filter((product) => product.isBestseller)
          .slice(0, 4)
          .map((product) => (
            <Link
              key={product.id}
              to="/shop"
              className="group relative aspect-square overflow-hidden rounded-xl shadow-md"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </Link>
          ))}
      </div>
    </section>
  );
}