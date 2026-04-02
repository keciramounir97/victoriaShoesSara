import { useState } from 'react';
import { useAuthStore } from '../Stores/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function SignUp() {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    await signup(name, email, password);
    const { user } = useAuthStore.getState();
    if (user) navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white dark:from-zinc-950 dark:to-zinc-900 p-4">
      <Motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-600 dark:text-pink-400">Victoria Shoes</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{t('signupSubtitle')}</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-pink-100 dark:border-zinc-700">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">{t('signupName')}</label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) clearError();
                }}
                required
                className="w-full px-4 py-3 rounded-2xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:border-pink-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('contactEmail')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) clearError();
                }}
                required
                className="w-full px-4 py-3 rounded-2xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:border-pink-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('signupPassword')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) clearError();
                }}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-2xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:border-pink-500 outline-none"
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
              {isLoading ? '…' : t('signupSubmit')}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
            {t('signupHasAccount')}{' '}
            <Link to="/login" className="text-pink-600 font-medium">
              {t('navLogin')}
            </Link>
          </p>
        </div>
      </Motion.div>
    </div>
  );
}
