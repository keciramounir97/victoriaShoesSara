import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../Stores/authContext.jsx";
import { useEffect } from "react";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, token, checkAuth, isLoading } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (token && !user) {
      checkAuth();
    }
  }, [token, user, checkAuth]);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4">
        <div className="flex items-center gap-3 rounded-full border border-rose-200 px-4 py-2 text-rose-600 dark:border-zinc-700 dark:text-rose-300">
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span className="text-sm font-medium">Checking authentication...</span>
        </div>
      </div>
    );
  }

  if (!user || !token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (requireAdmin && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}