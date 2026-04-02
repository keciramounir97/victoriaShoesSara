import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../Stores/authContext.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export default function SignUp() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { signup, isLoading, error, clearError } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const labels =
    language === "fr"
      ? {
          subtitle: "Créez votre compte en quelques secondes.",
          submit: "Créer mon compte",
          loading: "Création en cours...",
          helper: "Après inscription vous serez connecté automatiquement.",
          login: "Se connecter",
        }
      : {
          subtitle: "Create your account in just a few seconds.",
          submit: "Create account",
          loading: "Creating account...",
          helper: "After signup you will be signed in automatically.",
          login: "Sign in",
        };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup(name, email, password);
    const { user } = useAuthStore.getState();
    if (user) {
      navigate("/shop");
    }
  };

  return (
    <section className="mx-auto w-full max-w-md px-4 py-8 sm:py-12">
      <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-md dark:border-zinc-700 dark:bg-zinc-900 sm:p-8">
        <h1 className="mb-2 text-3xl font-bold text-rose-700 dark:text-rose-300">{t("auth.signupTitle")}</h1>
        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-300">{labels.subtitle}</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium">{t("auth.name")}</label>
            <input
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                if (error) clearError();
              }}
              required
              className="h-11 w-full rounded-xl border border-rose-200 px-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-950"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{t("auth.email")}</label>
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (error) clearError();
              }}
              required
              className="h-11 w-full rounded-xl border border-rose-200 px-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-950"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{t("auth.password")}</label>
            <input
              type="password"
              minLength={6}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                if (error) clearError();
              }}
              required
              className="h-11 w-full rounded-xl border border-rose-200 px-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-950"
            />
          </div>

          {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-300">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="h-11 w-full rounded-xl bg-rose-600 font-semibold text-white transition hover:bg-rose-700 disabled:opacity-70"
          >
            {isLoading ? labels.loading : labels.submit}
          </button>
        </form>

        <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-300">{labels.helper}</p>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
          {t("auth.haveAccount")}{" "}
          <Link to="/login" className="font-semibold text-rose-600 no-underline">
            {labels.login}
          </Link>
        </p>
      </div>
    </section>
  );
}