import { useState } from 'react';
import { useAuthStore } from '../Stores/authContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Login() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    await login(email, password);
    const { user } = useAuthStore.getState();
    if (user) {
      const dest = from.startsWith('/admin') && user.role !== 'admin' ? '/' : from;
      navigate(dest, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white dark:from-zinc-950 dark:to-zinc-900 p-4">
      <Motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-600 dark:text-pink-400">Victoria Shoes</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{t('navLogin')}</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-pink-100 dark:border-zinc-700">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">{t('loginEmail')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) clearError();
                }}
                required
                className="w-full px-4 py-3 rounded-2xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:border-pink-500 outline-none"
                placeholder="sarah@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">{t('loginPassword')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) clearError();
                }}
                required
                className="w-full px-4 py-3 rounded-2xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:border-pink-500 outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-950 p-3 rounded-2xl">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-2xl transition disabled:opacity-70"
            >
              {isLoading ? t('loginLoading') : t('loginSubmit')}
            </button>
          </form>

          <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4 text-sm">
            <Link to="/reset-password" className="text-pink-600 font-medium">
              {t('resetTitle')}
            </Link>
            <span className="text-gray-600 dark:text-gray-400">
              {t('loginNoAccount')}{' '}
              <Link to="/signup" className="text-pink-600 font-medium">
                {t('navSignup')}
              </Link>
            </span>
          </div>
        </div>
      </Motion.div>
    </div>
  );
}
