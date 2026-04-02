import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../Stores/authContext.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export default function ResetPassword() {
  const { language, t } = useLanguage();
  const {
    requestPasswordReset,
    resetPassword,
    resetEmailSent,
    resetSuccess,
    clearResetStates,
    isLoading,
    error,
  } = useAuthStore();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const labels =
    language === "fr"
      ? {
          sendLink: "Envoyer le lien",
          confirm: "Confirmer le nouveau mot de passe",
          sent: "Email vérifié. Définissez votre nouveau mot de passe.",
          done: "Mot de passe mis à jour avec succès (simulation).",
          back: "Retour à la connexion",
        }
      : {
          sendLink: "Send reset link",
          confirm: "Confirm new password",
          sent: "Email checked. Set your new password.",
          done: "Password updated successfully (simulation).",
          back: "Back to login",
        };

  const handleRequest = async (event) => {
    event.preventDefault();
    await requestPasswordReset(email);
  };

  const handleReset = async (event) => {
    event.preventDefault();
    await resetPassword(email, newPassword);
  };

  return (
    <section className="mx-auto w-full max-w-md px-4 py-8 sm:py-12">
      <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-md dark:border-zinc-700 dark:bg-zinc-900 sm:p-8">
        <h1 className="mb-2 text-3xl font-bold text-rose-700 dark:text-rose-300">{t("auth.resetTitle")}</h1>
        <p className="mb-5 text-sm text-zinc-600 dark:text-zinc-300">
          {language === "fr" ? "Flux de réinitialisation simulé pour la démo." : "Simulated reset flow for the demo."}
        </p>

        {!resetEmailSent ? (
          <form className="space-y-4" onSubmit={handleRequest}>
            <label className="mb-1 block text-sm font-medium">{t("auth.email")}</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="h-11 w-full rounded-xl border border-rose-200 px-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-950"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="h-11 w-full rounded-xl bg-rose-600 font-semibold text-white hover:bg-rose-700 disabled:opacity-70"
            >
              {labels.sendLink}
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleReset}>
            <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              {labels.sent}
            </p>
            <label className="mb-1 block text-sm font-medium">{t("auth.password")}</label>
            <input
              type="password"
              minLength={6}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              required
              className="h-11 w-full rounded-xl border border-rose-200 px-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-950"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="h-11 w-full rounded-xl bg-rose-600 font-semibold text-white hover:bg-rose-700 disabled:opacity-70"
            >
              {labels.confirm}
            </button>
          </form>
        )}

        {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-300">{error}</p>}
        {resetSuccess && (
          <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            {labels.done}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between">
          <Link to="/login" className="text-sm text-rose-600 no-underline">
            {labels.back}
          </Link>
          <button
            type="button"
            onClick={() => {
              clearResetStates();
              setNewPassword("");
            }}
            className="rounded-full border border-rose-200 px-3 py-1.5 text-xs dark:border-zinc-700"
          >
            Reset UI
          </button>
        </div>
      </div>
    </section>
  );
}