import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../Stores/authContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user, token, checkAuth, isLoading } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (token && !user) {
      checkAuth();
    }
  }, [token, user, checkAuth]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-pink-600">Verification de session...</p>
        </div>
      </div>
    );
  }

  if (!user || !token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}