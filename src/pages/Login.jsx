import { useState } from 'react';
import { useAuthStore } from '../Stores/authContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useLanguage();

  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Page vers laquelle rediriger après connexion réussie
  const from = location.state?.from || '/admin';

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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-600">Victoria Shoes</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{t("auth.loginTitle")}</p>
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
              {isLoading ? t("auth.signingIn") : t("auth.submitLogin")}
            </button>
          </form>

          <p className="text-xs text-pink-700 bg-pink-50 rounded-xl p-3 mt-4">
            {t("auth.demoCreds")}
          </p>

          <div className="text-center mt-4">
            <Link to="/reset-password" className="text-sm text-pink-600 no-underline">
              {t("auth.forgotPassword")}
            </Link>
          </div>

          <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
            {t("auth.noAccount")}{' '}
            <Link to="/signup" className="text-pink-600 font-medium no-underline">{t("auth.createAccount")}</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}