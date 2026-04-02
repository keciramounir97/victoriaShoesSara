import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export default function HeroText() {
  const { t } = useLanguage();

  return (
    <div className="h-full w-full flex flex-col justify-center px-10 text-white">
      <p className="uppercase tracking-[0.3em] text-sm mb-4">
        {t("home.collection")}
      </p>

      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
        {t("home.titleTop")}
        <br />
        <span className="text-yellow-200">{t("home.titleBottom")}</span>
      </h1>

      <p className="text-sm sm:text-base text-pink-100 mb-8 max-w-md">
        {t("home.subtitle")}
      </p>

      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <Link
          to="/shop"
          className="no-underline px-6 py-3 rounded-full bg-white text-pink-700 font-semibold text-sm hover:bg-pink-50 transition-colors"
        >
          {t("home.shopNow")}
        </Link>
        <Link
          to="/shop"
          className="no-underline px-6 py-3 rounded-full border border-pink-100 text-white font-semibold text-sm hover:bg-pink-600/40 transition-colors"
        >
          {t("home.exploreCollection")}
        </Link>
      </div>
    </div>
  );
}
