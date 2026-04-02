import { Link, useLocation } from 'react-router-dom';
import { Search, Sun, Moon, Globe } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../assets/high-heels.png';
import { useThemeStore } from '../Stores/themeStore';

const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/shop' },
    { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
    const { theme, toggleTheme } = useThemeStore();
    const location = useLocation();
    const [showSearch, setShowSearch] = useState(false);

    // Dynamic styles based on theme
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
        ? {
              boxShadow: 'inset 4px 4px 8px #1a1418, inset -4px -4px 8px #3a2a32',
          }
        : {
              boxShadow: 'inset 3px 3px 7px #d4a5b0, inset -3px -3px 7px #ffffff',
          };

    const navBg = isDark
        ? 'linear-gradient(145deg, #3a2a32, #2a1f24)'
        : 'linear-gradient(145deg, #fdf0f4, #fce4ec)';

    const borderColor = isDark ? '#6b4e5a' : '#f48fb1';

    const textColor = isDark ? '#f8d7e0' : '#9d174d';
    const activeTextColor = isDark ? '#ff80ab' : '#d81b60';

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="mt-2 mx-4 rounded-t-2xl px-6 py-3 flex items-center justify-between"
            style={{
                background: navBg,
                boxShadow: isDark
                    ? '8px 8px 24px #1a1418, -8px -8px 24px #4a3a42, 0 0 0 1.5px #6b4e5a88'
                    : '8px 8px 24px #cfa0b5, -8px -8px 24px #ffffff, 0 0 0 1.5px #f48fb188',
                border: `1.5px solid ${borderColor}`,
            }}
        >
            {/* Logo + Brand */}
            <Link to="/" style={{ textDecoration: 'none' }} className="flex items-center gap-3">
                <motion.img
                    src={logo}
                    alt="Victoria Shoes"
                    className="w-9 h-9 object-contain"
                    whileHover={{ rotate: [0, -10, 10, -6, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                />
                <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    style={{ userSelect: 'none', lineHeight: 1, display: 'flex', alignItems: 'baseline', gap: '5px' }}
                >
                    <span
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: '1.05rem',
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
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: isDark ? '#ff80ab' : '#d81b60',
                            letterSpacing: '0.02em',
                        }}
                    >
                        Shoes
                    </span>
                </motion.span>
            </Link>

            {/* Center Nav Links */}
            <div className="flex items-center gap-[10px]">
                {navLinks.map(({ label, to }, i) => {
                    const active = location.pathname === to;
                    return (
                        <motion.div
                            key={to}
                            initial={{ opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.91, ...neuPressed }}
                            transition={{ type: 'spring', stiffness: 700, damping: 18, mass: 0.3, delay: 0.15 + i * 0.08 }}
                            style={{
                                borderRadius: '999px',
                                ...neuBase,
                            }}
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
                                {label}
                            </Link>
                        </motion.div>
                    );
                })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-[10px]">
                {/* Search Input */}
                <AnimatePresence>
                    {showSearch && (
                        <motion.input
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 180, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            placeholder="Search..."
                            className={`px-3 py-1 rounded-full outline-none border text-sm shadow transition-colors ${
                                isDark
                                    ? 'bg-zinc-800 border-zinc-700 text-gray-200 placeholder-gray-400'
                                    : 'bg-white border-pink-200 text-gray-800 placeholder-gray-500'
                            }`}
                        />
                    )}
                </AnimatePresence>

                {/* Search Button */}
                <motion.button
                    title="Search"
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
                </motion.button>

                {/* Theme Toggle */}
                <motion.button
                    title="Toggle theme"
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
                    {isDark ? (
                        <Sun size={16} color="#f8d7e0" />
                    ) : (
                        <Moon size={16} color="#9d174d" />
                    )}
                </motion.button>

                {/* Language / Globe */}
                <motion.button
                    title="Change language"
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.9, ...neuPressed }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35, type: 'spring', stiffness: 200 }}
                    className="flex items-center justify-center cursor-pointer outline-none border-none"
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        ...neuBase,
                        border: `1px solid ${isDark ? '#6b4e5a' : '#f8bbd055'}`,
                    }}
                >
                    <Globe size={16} color={isDark ? '#f8d7e0' : '#9d174d'} />
                </motion.button>

                {/* Divider */}
                <span
                    className="mx-1 h-6 w-px rounded-full"
                    style={{
                        background: isDark
                            ? 'linear-gradient(to bottom, transparent, #8b6f7f, transparent)'
                            : 'linear-gradient(to bottom, transparent, #e8a0b8, transparent)',
                    }}
                />

                {/* Login */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95, ...neuPressed }}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 140 }}
                    style={{
                        borderRadius: '999px',
                        ...neuBase,
                    }}
                >
                    <Link
                        to="/login"
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            textDecoration: 'none',
                            display: 'block',
                            padding: '7px 22px',
                            borderRadius: '999px',
                            fontSize: '0.8125rem',
                            fontWeight: 600,
                            color: textColor,
                            letterSpacing: '0.02em',
                        }}
                    >
                        Login
                    </Link>
                </motion.div>

                {/* Sign Up */}
                <motion.div
                    whileHover={{ scale: 1.06, boxShadow: isDark ? '0 0 20px #f0629266' : '0 0 20px #ec407a66' }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.48, type: 'spring', stiffness: 140 }}
                    style={{ borderRadius: '999px' }}
                >
                    <Link
                        to="/signup"
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            textDecoration: 'none',
                            display: 'block',
                            padding: '7px 22px',
                            borderRadius: '999px',
                            fontSize: '0.8125rem',
                            fontWeight: 700,
                            color: '#ffffff',
                            letterSpacing: '0.03em',
                            background: 'linear-gradient(135deg, #f06292, #d81b60)',
                            boxShadow: '4px 4px 12px #c2185b55, -2px -2px 8px #ffffff44',
                        }}
                    >
                        Sign Up
                    </Link>
                </motion.div>
            </div>
        </motion.nav>
    );
}