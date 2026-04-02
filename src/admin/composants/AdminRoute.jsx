import { Link, useLocation } from 'react-router-dom';
// Link pour un CTA explicite ; on évite `Navigate` ici pour laisser lire le message « accès refusé ».
import { useAuthStore } from '../../Stores/authContext';
import { useLanguage } from '../../context/LanguageContext';
import ProtectedRoute from './ProtectedRoute';

export default function AdminRoute({ children }) {
  const { user } = useAuthStore();
  const { t } = useLanguage();
  const location = useLocation();

  return (
    <ProtectedRoute>
      {user?.role === 'admin' ? (
        children
      ) : (
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 p-6 bg-gradient-to-br from-pink-50 to-white dark:from-zinc-950 dark:to-zinc-900 rounded-3xl mx-4 my-8 border border-pink-100 dark:border-zinc-800">
          <p className="text-center text-zinc-700 dark:text-zinc-300 max-w-md text-lg">{t('adminForbidden')}</p>
          <p className="text-sm text-zinc-500 text-center max-w-sm">
            {location.pathname}
            {/* Affiche l’URL tentée pour le debug UX en démo ; en prod on pourrait masquer. */}
          </p>
          <Link
            to="/"
            className="px-6 py-3 rounded-2xl bg-pink-600 text-white font-semibold hover:bg-pink-700 transition-colors no-underline"
          >
            {t('adminBackHome')}
          </Link>
        </div>
      )}
    </ProtectedRoute>
  );
}
