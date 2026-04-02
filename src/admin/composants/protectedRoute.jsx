import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
    const { user, token, checkAuth, isLoading } = useAuthStore();
    const location = useLocation();

    // Vérifier l'authentification au chargement de la page protégée
    useEffect(() => {
        if (token && !user) {
            checkAuth();   // On vérifie si le token est toujours valide
        }
    }, [token, user, checkAuth]);

    // Pendant le chargement → on affiche un spinner
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white dark:from-zinc-950 dark:to-zinc-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-pink-600 dark:text-pink-400 font-medium">Vérification de l'authentification...</p>
                </div>
            </div>
        );
    }

    // Si l'utilisateur n'est PAS connecté → redirection vers la page de login
    if (!user || !token) {
        return <Navigate 
            to="/login" 
            state={{ from: location.pathname }}   // On garde la page voulue pour rediriger après login
            replace 
        />;
    }

    // Si tout est OK → on affiche le contenu protégé
    return children;
}