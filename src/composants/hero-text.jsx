import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export default function HeroText() {
  const { t } = useLanguage();

  return (
    <div className="h-full w-full flex flex-col justify-center px-5 sm:px-8 lg:px-10 text-white py-10 lg:py-0">
      <p className="uppercase tracking-[0.3em] text-xs sm:text-sm mb-4">{t("home.subtitle")}</p>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
        <span className="text-yellow-200">{t("home.title")}</span>
      </h1>

      <p className="text-sm text-pink-100 mb-8 max-w-md">{t("home.description")}</p>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          to="/shop"
          className="px-6 py-3 rounded-full bg-white text-pink-700 font-semibold text-sm hover:bg-pink-50 transition-colors no-underline"
        >
          {t("home.shopNow")}
        </Link>
        <Link
          to="/shop"
          className="px-6 py-3 rounded-full border border-pink-100 text-white font-semibold text-sm hover:bg-pink-600/40 transition-colors no-underline"
        >
          {t("home.explore")}
        </Link>
      </div>
    </div>
  );
}
