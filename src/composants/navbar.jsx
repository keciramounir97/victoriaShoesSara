import { Link, NavLink } from "react-router-dom";
import { Globe, Menu, Moon, Search, Sun, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/high-heels.png";
import { useTheme } from "../contexts/ThemeContext.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { useAuthStore } from "../Stores/authContext.jsx";

export default function Navbar() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { user, logout } = useAuthStore();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navLinks = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.shop"), to: "/shop" },
    { label: t("nav.contact"), to: "/contact" },
    ...(user ? [{ label: t("nav.admin"), to: "/admin" }] : []),
  ];

  const navBg = isDark
    ? "linear-gradient(145deg, #3a2a32, #2a1f24)"
    : "linear-gradient(145deg, #fdf0f4, #fce4ec)";

  const borderColor = isDark ? "#6b4e5a" : "#f48fb1";

  return (
    <header className="sticky top-0 z-40 px-2 sm:px-4 pt-2">
      <nav
        className="rounded-2xl px-3 sm:px-5 py-3"
        style={{
          background: navBg,
          boxShadow: isDark
            ? "8px 8px 24px #1a1418, -8px -8px 24px #4a3a42, 0 0 0 1.5px #6b4e5a88"
            : "8px 8px 24px #cfa0b5, -8px -8px 24px #ffffff, 0 0 0 1.5px #f48fb188",
          border: `1.5px solid ${borderColor}`,
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 no-underline">
            <img src={logo} alt="Victoria Shoes" className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
            <span className="leading-none flex items-baseline gap-1">
              <span
                className="uppercase tracking-[0.12em] text-[0.95rem] sm:text-[1.05rem] font-semibold"
                style={{ color: isDark ? "#f8d7e0" : "#9d174d" }}
              >
                Victoria
              </span>
              <span
                className="text-[1.3rem] sm:text-[1.5rem] font-bold"
                style={{ color: isDark ? "#ff80ab" : "#d81b60", fontFamily: "'Dancing Script', cursive" }}
              >
                Shoes
              </span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm no-underline transition ${
                    isActive
                      ? "bg-pink-600 text-white shadow-md"
                      : isDark
                      ? "text-pink-100 hover:bg-zinc-800"
                      : "text-pink-900 hover:bg-white/70"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {showSearch && (
              <input
                placeholder={t("shop.searchPlaceholder")}
                className={`w-[180px] px-3 py-2 rounded-full outline-none border text-sm ${
                  isDark
                    ? "bg-zinc-800 border-zinc-700 text-gray-200 placeholder-gray-400"
                    : "bg-white border-pink-200 text-gray-800 placeholder-gray-500"
                }`}
              />
            )}

            <button
              type="button"
              title="Search"
              onClick={() => setShowSearch((previousValue) => !previousValue)}
              className="w-9 h-9 rounded-full border border-pink-200 flex items-center justify-center bg-white/60 hover:bg-white"
            >
              <Search size={16} />
            </button>

            <button
              type="button"
              title={t("common.theme")}
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full border border-pink-200 flex items-center justify-center bg-white/60 hover:bg-white"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              type="button"
              title={t("common.language")}
              onClick={toggleLanguage}
              className="h-9 px-3 rounded-full border border-pink-200 flex items-center justify-center gap-1 bg-white/60 hover:bg-white text-xs font-semibold"
            >
              <Globe size={14} />
              {language.toUpperCase()}
            </button>

            {user ? (
              <>
                <Link to="/admin" className="px-4 py-2 rounded-full bg-pink-600 text-white no-underline text-sm">
                  {t("nav.admin")}
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="px-4 py-2 rounded-full bg-zinc-800 text-white border-0 text-sm"
                >
                  {t("nav.logout")}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 rounded-full text-sm no-underline text-pink-900">
                  {t("nav.login")}
                </Link>
                <Link to="/signup" className="px-4 py-2 rounded-full bg-pink-600 text-white no-underline text-sm">
                  {t("nav.signup")}
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="md:hidden w-10 h-10 rounded-full border border-pink-300 flex items-center justify-center bg-white/60"
            onClick={() => setIsMobileOpen((previousValue) => !previousValue)}
          >
            {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {isMobileOpen && (
          <div className="md:hidden pt-3 overflow-hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-xl text-sm no-underline ${
                      isActive ? "bg-pink-600 text-white" : isDark ? "bg-zinc-800 text-pink-100" : "bg-white/80 text-pink-900"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="py-2 rounded-xl border border-pink-200 bg-white/70 text-sm"
                >
                  {theme === "dark" ? t("common.light") : t("common.dark")}
                </button>
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="py-2 rounded-xl border border-pink-200 bg-white/70 text-sm"
                >
                  {language === "fr" ? t("common.en") : t("common.fr")}
                </button>
              </div>

              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsMobileOpen(false);
                  }}
                  className="py-2 rounded-xl bg-zinc-900 text-white border-0 text-sm"
                >
                  {t("nav.logout")}
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileOpen(false)}
                    className="py-2 rounded-xl text-center no-underline bg-white/80 text-pink-900 text-sm"
                  >
                    {t("nav.login")}
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileOpen(false)}
                    className="py-2 rounded-xl text-center no-underline bg-pink-600 text-white text-sm"
                  >
                    {t("nav.signup")}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}