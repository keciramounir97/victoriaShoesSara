import { Link, useLocation } from 'react-router-dom';
// Link : navigation SPA sans rechargement ; useLocation pour surligner la route active.
import { Search, Sun, Moon, Menu, X } from 'lucide-react';
// Icônes cohérentes avec le design existant ; Menu/X pour le drawer mobile.
import { useState } from 'react';
// useState pour la recherche, le menu mobile et l’UI locale.
import { AnimatePresence, motion as Motion } from 'framer-motion';
// Animations d’entrée/sortie du champ recherche et du panneau mobile.
import { useTheme } from '../context/ThemeContext';
// Context thème (demande utilisateur) à la place du store Zustand supprimé.
import { useLanguage } from '../context/LanguageContext';
// Context langue : libellés dynamiques FR/EN.
import { useAuthStore } from '../Stores/authContext';
// Auth factice : afficher Déconnexion ou Login selon l’état.

const navPaths = [
  { key: 'navHome', to: '/' },
  { key: 'navShop', to: '/shop' },
  { key: 'navContact', to: '/contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDark = theme === 'dark';

  const neuBase = isDark
    ? {
        background: 'linear-gradient(145deg, #2a1f24, #1f171b)',
        boxShadow: '5px 5px 12px #1a1418, -5px -5px 12px #3a2a32',
      }
    : {
        background: 'linear-gradient(145deg, #fce4ec, #f8d7e0)',
        boxShadow: '5px 5px 10px #d4a5b0, -5px -5px 10px #ffffff',
      };

  const neuPressed = isDark
    ? { boxShadow: 'inset 4px 4px 8px #1a1418, inset -4px -4px 8px #3a2a32' }
    : { boxShadow: 'inset 3px 3px 7px #d4a5b0, inset -3px -3px 7px #ffffff' };

  const navBg = isDark
    ? 'linear-gradient(145deg, #3a2a32, #2a1f24)'
    : 'linear-gradient(145deg, #fdf0f4, #fce4ec)';

  const borderColor = isDark ? '#6b4e5a' : '#f48fb1';
  const textColor = isDark ? '#f8d7e0' : '#9d174d';
  const activeTextColor = isDark ? '#ff80ab' : '#d81b60';

  const cycleLanguage = () => setLanguage(language === 'fr' ? 'en' : 'fr');

  return (
    <>
      <Motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className="mt-2 mx-2 sm:mx-4 rounded-t-2xl px-3 sm:px-6 py-3 flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap"
        style={{
          background: navBg,
          boxShadow: isDark
            ? '8px 8px 24px #1a1418, -8px -8px 24px #4a3a42, 0 0 0 1.5px #6b4e5a88'
            : '8px 8px 24px #cfa0b5, -8px -8px 24px #ffffff, 0 0 0 1.5px #f48fb188',
          border: `1.5px solid ${borderColor}`,
        }}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1 sm:flex-initial">
          <Motion.button
            type="button"
            className="sm:hidden flex items-center justify-center cursor-pointer outline-none border-none shrink-0"
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              ...neuBase,
              border: `1px solid ${isDark ? '#6b4e5a' : '#f8bbd055'}`,
            }}
            whileTap={{ scale: 0.92, ...neuPressed }}
            aria-label={mobileOpen ? t('navClose') : t('navMenu')}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <X size={18} color={isDark ? '#f8d7e0' : '#9d174d'} />
            ) : (
              <Menu size={18} color={isDark ? '#f8d7e0' : '#9d174d'} />
            )}
          </Motion.button>

          <Link to="/" style={{ textDecoration: 'none' }} className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Motion.img
              src="/logo-shoe.svg"
              alt="Victoria Shoes"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain shrink-0"
              whileHover={{ rotate: [0, -10, 10, -6, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <Motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{ userSelect: 'none', lineHeight: 1, display: 'flex', alignItems: 'baseline', gap: '5px' }}
              className="truncate"
            >
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 'clamp(0.85rem, 2.5vw, 1.05rem)',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: isDark ? '#f8d7e0' : '#9d174d',
                  textTransform: 'uppercase',
                }}
              >
                Victoria
              </span>
              <span
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: 'clamp(1.15rem, 4vw, 1.5rem)',
                  fontWeight: 700,
                  color: isDark ? '#ff80ab' : '#d81b60',
                  letterSpacing: '0.02em',
                }}
              >
                Shoes
              </span>
            </Motion.span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-[10px] flex-1 justify-center">
          {navPaths.map(({ key, to }, i) => {
            const active = location.pathname === to;
            return (
              <Motion.div
                key={to}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.91, ...neuPressed }}
                transition={{ type: 'spring', stiffness: 700, damping: 18, mass: 0.3, delay: 0.15 + i * 0.08 }}
                style={{ borderRadius: '999px', ...neuBase }}
              >
                <Link
                  to={to}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    textDecoration: 'none',
                    color: active ? activeTextColor : textColor,
                    fontWeight: active ? 600 : 500,
                    fontSize: '0.875rem',
                    padding: '7px 18px',
                    borderRadius: '999px',
                    display: 'block',
                    letterSpacing: '0.02em',
                  }}
                >
                  {t(key)}
                </Link>
              </Motion.div>
            );
          })}
          {user?.role === 'admin' && (
            <Motion.div
              key="admin"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.91, ...neuPressed }}
              style={{ borderRadius: '999px', ...neuBase }}
            >
              <Link
                to="/admin"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  textDecoration: 'none',
                  color: location.pathname === '/admin' ? activeTextColor : textColor,
                  fontWeight: location.pathname === '/admin' ? 600 : 500,
                  fontSize: '0.875rem',
                  padding: '7px 18px',
                  borderRadius: '999px',
                  display: 'block',
                  letterSpacing: '0.02em',
                }}
              >
                {t('navAdmin')}
              </Link>
            </Motion.div>
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-[10px] shrink-0">
          <AnimatePresence>
            {showSearch && (
              <Motion.input
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 140, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                placeholder={t('navSearchPlaceholder')}
                aria-label={t('navSearch')}
                className={`hidden sm:block px-3 py-1 rounded-full outline-none border text-sm shadow transition-colors max-w-[140px] sm:max-w-none sm:w-44 ${
                  isDark
                    ? 'bg-zinc-800 border-zinc-700 text-gray-200 placeholder-gray-400'
                    : 'bg-white border-pink-200 text-gray-800 placeholder-gray-500'
                }`}
              />
            )}
          </AnimatePresence>

          <Motion.button
            type="button"
            title={t('navSearch')}
            onClick={() => setShowSearch(!showSearch)}
            whileHover={{ scale: 1.12, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center text-pink-700 cursor-pointer outline-none border-none"
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              ...neuBase,
              border: `1px solid ${isDark ? '#6b4e5a' : '#f8bbd055'}`,
            }}
          >
            <Search size={16} color={isDark ? '#f8d7e0' : '#9d174d'} />
          </Motion.button>

          <Motion.button
            type="button"
            title={language.toUpperCase()}
            onClick={cycleLanguage}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9, ...neuPressed }}
            className="flex items-center justify-center cursor-pointer outline-none border-none font-semibold text-xs"
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              ...neuBase,
              border: `1px solid ${isDark ? '#6b4e5a' : '#f8bbd055'}`,
              color: isDark ? '#f8d7e0' : '#9d174d',
            }}
          >
            {language.toUpperCase()}
          </Motion.button>

          <Motion.button
            type="button"
            title="Theme"
            onClick={toggleTheme}
            whileHover={{ scale: 1.12, rotate: 30 }}
            whileTap={{ scale: 0.9, ...neuPressed }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="flex items-center justify-center cursor-pointer outline-none border-none"
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              ...neuBase,
              border: `1px solid ${isDark ? '#6b4e5a' : '#f8bbd055'}`,
            }}
          >
            {isDark ? <Sun size={16} color="#f8d7e0" /> : <Moon size={16} color="#9d174d" />}
          </Motion.button>

          <span
            className="hidden sm:block mx-1 h-6 w-px rounded-full"
            style={{
              background: isDark
                ? 'linear-gradient(to bottom, transparent, #8b6f7f, transparent)'
                : 'linear-gradient(to bottom, transparent, #e8a0b8, transparent)',
            }}
          />

          {user ? (
            <Motion.button
              type="button"
              onClick={() => logout()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95, ...neuPressed }}
              style={{
                borderRadius: '999px',
                ...neuBase,
                fontFamily: "'Montserrat', sans-serif",
                padding: '7px 14px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: textColor,
                border: `1px solid ${isDark ? '#6b4e5a' : '#f8bbd055'}`,
                cursor: 'pointer',
              }}
            >
              {t('navLogout')}
            </Motion.button>
          ) : (
            <>
              <Motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95, ...neuPressed }}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 140 }}
                style={{ borderRadius: '999px', ...neuBase }}
              >
                <Link
                  to="/login"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    textDecoration: 'none',
                    display: 'block',
                    padding: '7px 16px',
                    borderRadius: '999px',
                    fontWeight: 600,
                    color: textColor,
                    letterSpacing: '0.02em',
                  }}
                  className="text-xs sm:text-[0.8125rem]"
                >
                  {t('navLogin')}
                </Link>
              </Motion.div>
              <Motion.div
                whileHover={{ scale: 1.06, boxShadow: isDark ? '0 0 20px #f0629266' : '0 0 20px #ec407a66' }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.48, type: 'spring', stiffness: 140 }}
                style={{ borderRadius: '999px' }}
                className="hidden sm:block"
              >
                <Link
                  to="/signup"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    textDecoration: 'none',
                    display: 'block',
                    padding: '7px 18px',
                    borderRadius: '999px',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '0.03em',
                    background: 'linear-gradient(135deg, #f06292, #d81b60)',
                    boxShadow: '4px 4px 12px #c2185b55, -2px -2px 8px #ffffff44',
                  }}
                >
                  {t('navSignup')}
                </Link>
              </Motion.div>
            </>
          )}
        </div>
      </Motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <Motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mx-2 sm:mx-4 overflow-hidden rounded-b-2xl border border-t-0 px-4 py-4 space-y-2"
            style={{
              background: navBg,
              borderColor,
            }}
          >
            {[...navPaths, ...(user?.role === 'admin' ? [{ key: 'navAdmin', to: '/admin' }] : [])].map(({ key, to }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to + key}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 px-4 rounded-2xl no-underline font-medium"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    color: active ? activeTextColor : textColor,
                    background: active ? (isDark ? '#2a1f24' : '#fff') : 'transparent',
                  }}
                >
                  {t(key)}
                </Link>
              );
            })}
            {!user && (
              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className="block py-3 px-4 rounded-2xl text-center text-white font-bold no-underline sm:hidden"
                style={{
                  background: 'linear-gradient(135deg, #f06292, #d81b60)',
                }}
              >
                {t('navSignup')}
              </Link>
            )}
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
