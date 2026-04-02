import { useState } from 'react';
import { useAuthStore } from '../Stores/authContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext.jsx';

export default function Login() {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Page vers laquelle rediriger après connexion réussie
  const from = location.state?.from || '/admin';
  const labels =
    language === "fr"
      ? {
          title: "Victoria Shoes",
          subtitle: t("auth.loginTitle"),
          loading: "Connexion en cours...",
          submit: "Se connecter",
          forgot: "Mot de passe oublié ?",
          create: "Créer un compte",
          demo: "Compte admin demo: sarah@example.com / 123456",
        }
      : {
          title: "Victoria Shoes",
          subtitle: t("auth.loginTitle"),
          loading: "Signing in...",
          submit: "Sign in",
          forgot: "Forgot password?",
          create: "Create account",
          demo: "Admin demo account: sarah@example.com / 123456",
        };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    // Appel de la fonction login du store
    await login(email, password);

    // Vérifier si la connexion a réussi
    const { user } = useAuthStore.getState();
    if (user) {
      navigate(from, { replace: true });   // Redirection
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white dark:from-zinc-950 dark:to-zinc-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-600">{labels.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{labels.subtitle}</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-pink-100 dark:border-zinc-700">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">{t("auth.email")}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) clearError();
                }}
                required
                className="w-full px-4 py-3 rounded-2xl border border-pink-200 dark:border-zinc-700 focus:border-pink-500 outline-none"
                placeholder="sarah@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">{t("auth.password")}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) clearError();
                }}
                required
                className="w-full px-4 py-3 rounded-2xl border border-pink-200 dark:border-zinc-700 focus:border-pink-500 outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-950 p-3 rounded-2xl">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-2xl transition disabled:opacity-70"
            >
              {isLoading ? labels.loading : labels.submit}
            </button>
          </form>
          <Link to="/reset-password" className="mt-4 block text-center text-sm text-pink-600 no-underline">
            {labels.forgot}
          </Link>
          <p className="mt-3 rounded-xl bg-rose-50 p-3 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {labels.demo}
          </p>

          <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
            {t("auth.noAccount")}{' '}
            <Link to="/signup" className="text-pink-600 font-medium no-underline">{labels.create}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}