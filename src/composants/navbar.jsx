import { Link, useLocation } from "react-router-dom";
import { Menu, Moon, Search, Sun, Globe, X } from "lucide-react";
import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import logo from "../assets/high-heels.png";
import { useTheme } from "../contexts/ThemeContext.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { useAuthStore } from "../Stores/authContext.jsx";

export default function Navbar() {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { user, logout } = useAuthStore();
  const [showSearch, setShowSearch] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = useMemo(
    () => [
      { label: t("nav.home"), to: "/" },
      { label: t("nav.shop"), to: "/shop" },
      { label: t("nav.contact"), to: "/contact" },
    ],
    [t],
  );

  const surfaceClasses = isDark
    ? "bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border-zinc-700 text-zinc-100"
    : "bg-gradient-to-br from-rose-50 via-white to-rose-100 border-rose-200 text-zinc-800";

  const linkClass = (isActive) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-rose-600 text-white shadow"
        : isDark
          ? "hover:bg-zinc-800 text-zinc-200"
          : "hover:bg-rose-100 text-zinc-700"
    }`;

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6">
      <nav className={`rounded-2xl border px-4 py-3 sm:px-5 ${surfaceClasses} shadow-lg`}>
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <img src={logo} alt="Victoria Shoes" className="h-9 w-9 object-contain" />
            <div className="leading-none">
              <p className="m-0 text-xs font-semibold uppercase tracking-[0.2em] text-rose-700 dark:text-rose-300">
                Victoria
              </p>
              <p className="m-0 text-xl font-bold text-rose-600">Shoes</p>
            </div>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className={linkClass(location.pathname === link.to)}>
                {link.label}
              </Link>
            ))}
            {user?.role === "admin" && (
              <Link to="/admin" className={linkClass(location.pathname === "/admin")}>
                {t("nav.admin")}
              </Link>
            )}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <AnimatePresence>
              {showSearch && (
                <input
                  placeholder={t("common.search")}
                  className={`h-9 rounded-full border px-3 text-sm outline-none ${
                    isDark
                      ? "border-zinc-700 bg-zinc-900 text-zinc-100"
                      : "border-rose-200 bg-white text-zinc-800"
                  }`}
                />
              )}
            </AnimatePresence>
            <button
              type="button"
              onClick={() => setShowSearch((prev) => !prev)}
              className="h-9 w-9 rounded-full border border-rose-200 bg-white/70 text-rose-600 transition hover:scale-105 dark:border-zinc-700 dark:bg-zinc-800"
              title={t("common.search")}
            >
              <Search className="mx-auto h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="h-9 w-9 rounded-full border border-rose-200 bg-white/70 text-rose-600 transition hover:scale-105 dark:border-zinc-700 dark:bg-zinc-800"
              title={t("common.theme")}
            >
              {isDark ? <Sun className="mx-auto h-4 w-4" /> : <Moon className="mx-auto h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={toggleLanguage}
              className="h-9 min-w-9 rounded-full border border-rose-200 bg-white/70 px-2 text-xs font-bold text-rose-600 transition hover:scale-105 dark:border-zinc-700 dark:bg-zinc-800"
              title={t("common.language")}
            >
              <span className="flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" />
                {language.toUpperCase()}
              </span>
            </button>
            {!user ? (
              <>
                <Link to="/login" className={linkClass(location.pathname === "/login")}>
                  {t("nav.login")}
                </Link>
                <Link to="/signup" className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white no-underline transition hover:bg-rose-700">
                  {t("nav.signup")}
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <p className="m-0 text-sm">{user.name}</p>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-900"
                >
                  {t("nav.logout")}
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rose-200 md:hidden dark:border-zinc-700"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileOpen && (
            <div className="mt-3 space-y-2 border-t border-rose-200 pt-3 dark:border-zinc-700 md:hidden">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileOpen(false)}
                  className={`block no-underline ${linkClass(location.pathname === link.to)}`}
                >
                  {link.label}
                </Link>
              ))}
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileOpen(false)}
                  className={`block no-underline ${linkClass(location.pathname === "/admin")}`}
                >
                  {t("nav.admin")}
                </Link>
              )}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="rounded-full border px-3 py-1.5 text-sm dark:border-zinc-700"
                >
                  {isDark ? "Light" : "Dark"}
                </button>
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="rounded-full border px-3 py-1.5 text-sm dark:border-zinc-700"
                >
                  {language.toUpperCase()}
                </button>
              </div>
              {!user ? (
                <div className="flex gap-2 pt-1">
                  <Link to="/login" onClick={() => setIsMobileOpen(false)} className={linkClass(false)}>
                    {t("nav.login")}
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileOpen(false)}
                    className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white no-underline"
                  >
                    {t("nav.signup")}
                  </Link>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsMobileOpen(false);
                  }}
                  className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
                >
                  {t("nav.logout")}
                </button>
              )}
            </div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}