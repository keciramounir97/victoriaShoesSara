import { createContext, useContext, useMemo, useState } from "react";

const LanguageContext = createContext(null);

const translations = {
  fr: {
    nav: {
      home: "Accueil",
      shop: "Boutique",
      contact: "Contact",
      login: "Connexion",
      signup: "Inscription",
      admin: "Admin",
      logout: "Déconnexion",
    },
    common: {
      search: "Rechercher",
      discover: "Découvrir",
      all: "Tout voir",
      welcome: "Bienvenue",
      language: "Langue",
      theme: "Thème",
    },
    home: {
      collection: "Nouvelle collection 2026",
      titleTop: "Entrez dans",
      titleBottom: "l'élégance Victoria",
      subtitle:
        "Chaussures premium pour femmes, pensées pour le confort et le style au quotidien.",
      shopNow: "Acheter maintenant",
      exploreCollection: "Explorer la collection",
      nouveautes: "Nouveautés",
      arrivals: "Les derniers arrivages",
      categories: "Catégories",
      bestsellers: "Nos produits préférés",
    },
    auth: {
      email: "Email",
      password: "Mot de passe",
      name: "Nom complet",
      loginTitle: "Connectez-vous",
      signupTitle: "Créer un compte",
      resetTitle: "Réinitialiser le mot de passe",
      noAccount: "Pas de compte ?",
      haveAccount: "Déjà un compte ?",
    },
    admin: {
      title: "Panneau d'administration",
      subtitle: "Tableau de bord interne (simulation)",
      users: "Utilisateurs",
      products: "Produits",
      orders: "Commandes",
      revenue: "Revenus",
    },
  },
  en: {
    nav: {
      home: "Home",
      shop: "Shop",
      contact: "Contact",
      login: "Login",
      signup: "Sign Up",
      admin: "Admin",
      logout: "Logout",
    },
    common: {
      search: "Search",
      discover: "Discover",
      all: "See all",
      welcome: "Welcome",
      language: "Language",
      theme: "Theme",
    },
    home: {
      collection: "New collection 2026",
      titleTop: "Step into",
      titleBottom: "Victoria elegance",
      subtitle:
        "Premium women footwear crafted for daily comfort and refined style.",
      shopNow: "Shop now",
      exploreCollection: "Explore collection",
      nouveautes: "New arrivals",
      arrivals: "Latest drops",
      categories: "Categories",
      bestsellers: "Our favorite products",
    },
    auth: {
      email: "Email",
      password: "Password",
      name: "Full name",
      loginTitle: "Sign in",
      signupTitle: "Create account",
      resetTitle: "Reset password",
      noAccount: "No account yet?",
      haveAccount: "Already have an account?",
    },
    admin: {
      title: "Admin panel",
      subtitle: "Internal dashboard (simulation)",
      users: "Users",
      products: "Products",
      orders: "Orders",
      revenue: "Revenue",
    },
  },
};

function getInitialLanguage() {
  const storedLanguage = localStorage.getItem("language");
  return storedLanguage === "en" ? "en" : "fr";
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  const value = useMemo(() => {
    const dictionary = translations[language];
    return {
      language,
      setLanguage: (nextLanguage) => {
        const resolvedLanguage = nextLanguage === "en" ? "en" : "fr";
        localStorage.setItem("language", resolvedLanguage);
        setLanguage(resolvedLanguage);
      },
      toggleLanguage: () => {
        const nextLanguage = language === "fr" ? "en" : "fr";
        localStorage.setItem("language", nextLanguage);
        setLanguage(nextLanguage);
      },
      t: (path) => {
        const result = path.split(".").reduce((acc, key) => acc?.[key], dictionary);
        return typeof result === "string" ? result : path;
      },
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
