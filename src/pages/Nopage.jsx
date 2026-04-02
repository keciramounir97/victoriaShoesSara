import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export default function Nopage() {
  const { t } = useLanguage();

  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-3xl border border-pink-100 bg-white p-8 text-center shadow-sm">
        <p className="text-6xl font-black text-pink-600">404</p>
        <h1 className="text-xl font-semibold mt-2">{t("common.notFound")}</h1>
        <Link
          to="/"
          className="inline-flex mt-6 px-5 py-3 rounded-xl bg-pink-600 text-white no-underline hover:bg-pink-700 transition"
        >
          {t("common.backHome")}
        </Link>
      </div>
    </section>
  );
}