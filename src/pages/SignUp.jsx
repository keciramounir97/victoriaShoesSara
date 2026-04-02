import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../Stores/authContext.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export default function SignUp() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { signup, isLoading, error, clearError } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousValue) => ({ ...previousValue, [name]: value }));
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return;
    }

    await signup(formData.name, formData.email, formData.password);
    const { user } = useAuthStore.getState();
    if (user) {
      navigate("/admin", { replace: true });
    }
  };

  const passwordMismatch =
    formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white dark:from-zinc-950 dark:to-zinc-900 p-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-600">Victoria Shoes</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{t("auth.signupTitle")}</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-pink-100 dark:border-zinc-700">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">{t("auth.name")}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-2xl border border-pink-200 dark:border-zinc-700 focus:border-pink-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">{t("auth.email")}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-2xl border border-pink-200 dark:border-zinc-700 focus:border-pink-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">{t("auth.password")}</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-2xl border border-pink-200 dark:border-zinc-700 focus:border-pink-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">{t("auth.confirmPassword")}</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-2xl border border-pink-200 dark:border-zinc-700 focus:border-pink-500 outline-none"
              />
              {passwordMismatch && (
                <p className="text-xs text-red-600 mt-2">{t("auth.confirmPassword")} invalide.</p>
              )}
            </div>

            {error && (
              <p className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-950 p-3 rounded-2xl">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading || passwordMismatch}
              className="w-full py-3.5 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-2xl transition disabled:opacity-70"
            >
              {isLoading ? t("auth.signingUp") : t("auth.submitSignup")}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
            {t("auth.haveAccount")}{" "}
            <Link to="/login" className="text-pink-600 font-medium no-underline">
              {t("auth.submitLogin")}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}