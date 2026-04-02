import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../Stores/authContext';
import { motion as Motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function ResetPassword() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { requestPasswordReset, resetPassword, isLoading, error, resetEmailSent, resetSuccess, clearError, clearResetStates } =
    useAuthStore();

  const handleRequest = async (e) => {
    e.preventDefault();
    await requestPasswordReset(email);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    await resetPassword(email, newPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white dark:from-zinc-950 dark:to-zinc-900 p-4">
      <Motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">{t('resetTitle')}</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">{t('resetSubtitle')}</p>

        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-pink-100 dark:border-zinc-700 space-y-6">
          {!resetEmailSent && !resetSuccess && (
            <form onSubmit={handleRequest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('resetEmail')}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) clearError();
                  }}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 outline-none"
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button type="submit" disabled={isLoading} className="w-full py-3 bg-pink-600 text-white rounded-2xl font-semibold disabled:opacity-70">
                {t('resetRequest')}
              </button>
            </form>
          )}

          {resetEmailSent && !resetSuccess && (
            <form onSubmit={handleReset} className="space-y-4">
              <p className="text-sm text-emerald-600 dark:text-emerald-400">{t('resetSubtitle')}</p>
              <div>
                <label className="block text-sm font-medium mb-1">{t('resetNewPassword')}</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-2xl border border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 outline-none"
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button type="submit" disabled={isLoading} className="w-full py-3 bg-pink-600 text-white rounded-2xl font-semibold disabled:opacity-70">
                {t('resetConfirm')}
              </button>
            </form>
          )}

          {resetSuccess && (
            <p className="text-emerald-600 dark:text-emerald-400 font-medium text-center">
              OK — {t('resetBackLogin')}
            </p>
          )}

          <div className="flex justify-center gap-4 text-sm">
            <Link to="/login" onClick={() => clearResetStates()} className="text-pink-600 font-medium">
              {t('resetBackLogin')}
            </Link>
          </div>
        </div>
      </Motion.div>
    </div>
  );
}
