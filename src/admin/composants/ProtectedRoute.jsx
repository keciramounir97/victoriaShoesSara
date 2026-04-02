import { Navigate, useLocation } from 'react-router-dom';
// Navigate redirige sans recharger la page (SPA) ; useLocation lit l’URL courante pour renvoyer l’utilisateur après login.
import { useAuthStore } from '../../Stores/authContext';
// Store d’auth factice partagé avec Login ; chemin relatif corrigé (l’ancien import `../stores/useAuthStore` n’existait pas).
import { useEffect } from 'react';
// useEffect déclenche `checkAuth` au montage si token présent mais user absent (rehydratation Zustand).

export default function ProtectedRoute({ children }) {
  // `children` est la page à afficher si l’utilisateur est connecté (ex. tableau de bord).
  const { user, token, checkAuth, isLoading } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (token && !user) {
      checkAuth();
    }
  }, [token, user, checkAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white dark:from-zinc-950 dark:to-zinc-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-pink-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-pink-600 dark:text-pink-400 font-medium">Vérification…</p>
        </div>
      </div>
    );
  }

  if (!user || !token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
