import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export default function Nopage() {
  const { language } = useLanguage();

  return (
    <section className="flex min-h-[55vh] items-center justify-center px-4">
      <div className="max-w-md rounded-3xl border border-rose-100 bg-white p-8 text-center shadow-md dark:border-zinc-700 dark:bg-zinc-900">
        <p className="mb-2 text-6xl font-black text-rose-600">404</p>
        <h1 className="mb-2 text-2xl font-bold">
          {language === "fr" ? "Page introuvable" : "Page not found"}
        </h1>
        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-300">
          {language === "fr"
            ? "La page demandée n'existe pas ou a été déplacée."
            : "The page you are looking for does not exist or has been moved."}
        </p>
        <Link
          to="/"
          className="inline-flex rounded-full bg-rose-600 px-5 py-2 text-sm font-semibold text-white no-underline hover:bg-rose-700"
        >
          {language === "fr" ? "Retour à l'accueil" : "Back to home"}
        </Link>
      </div>
    </section>
  );
}