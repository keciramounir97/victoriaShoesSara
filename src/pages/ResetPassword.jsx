import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../Stores/authContext.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export default function ResetPassword() {
  const { t } = useLanguage();
  const {
    requestPasswordReset,
    resetPassword,
    clearResetStates,
    resetEmailSent,
    resetSuccess,
    isLoading,
    error,
  } = useAuthStore();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    return () => {
      clearResetStates();
    };
  }, [clearResetStates]);

  const handleRequest = async (event) => {
    event.preventDefault();
    await requestPasswordReset(email);
  };

  const handleReset = async (event) => {
    event.preventDefault();
    await resetPassword(email, newPassword);
  };

  return (
    <section className="min-h-screen px-4 py-8 sm:py-12">
      <div className="max-w-md mx-auto bg-white rounded-3xl border border-pink-100 shadow-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-pink-700 mb-2">{t("auth.resetTitle")}</h1>

        {!resetEmailSent ? (
          <form onSubmit={handleRequest} className="space-y-4">
            <p className="text-sm text-gray-600">{t("auth.resetEmailHint")}</p>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-500 outline-none"
              placeholder="sarah@example.com"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold transition disabled:opacity-70"
            >
              {isLoading ? `${t("auth.sendReset")}...` : t("auth.sendReset")}
            </button>
          </form>
        ) : !resetSuccess ? (
          <form onSubmit={handleReset} className="space-y-4">
            <p className="text-sm text-gray-600">{t("auth.resetStep2")}</p>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-500 outline-none"
              placeholder="sarah@example.com"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              minLength={6}
              required
              className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-500 outline-none"
              placeholder={t("auth.resetNewPassword")}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold transition disabled:opacity-70"
            >
              {isLoading ? `${t("auth.resetContinue")}...` : t("auth.resetContinue")}
            </button>
          </form>
        ) : (
          <div className="rounded-xl bg-green-50 text-green-700 p-4 text-sm">{t("auth.resetDone")}</div>
        )}

        {error && <p className="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-xl">{error}</p>}

        <div className="mt-6 text-center">
          <Link to="/login" className="text-pink-600 no-underline text-sm font-medium">
            {t("auth.backToLogin")}
          </Link>
        </div>
      </div>
    </section>
  );
}