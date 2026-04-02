import { createContext, useContext, useMemo, useState } from "react";

const LanguageContext = createContext(null);

const translations = {
  fr: {
    nav: {
      home: "Accueil",
      shop: "Boutique",
      contact: "Contact",
      admin: "Admin",
      login: "Connexion",
      signup: "Inscription",
      logout: "Déconnexion",
      welcome: "Bonjour, {{name}}",
    },
    home: {
      title: "Entrez dans l'elegance Victoria",
      subtitle: "Collection 2026",
      description:
        "Des chaussures feminines premium pensees pour le confort, le style et la performance.",
      shopNow: "Acheter maintenant",
      explore: "Explorer la collection",
      categories: "Categories",
      newArrivals: "Nouveautes",
      bestsellerTitle: "Nos produits preferes",
    },
    shop: {
      title: "Boutique",
      subtitle: "Trouvez la paire parfaite selon votre style.",
      searchPlaceholder: "Rechercher un produit...",
      allCategories: "Toutes les categories",
      sortBy: "Trier par",
      sortPopular: "Popularite",
      sortPriceAsc: "Prix croissant",
      sortPriceDesc: "Prix decroissant",
      results: "{{count}} produits trouves",
      empty: "Aucun produit ne correspond a votre recherche.",
    },
    auth: {
      loginTitle: "Connectez-vous",
      signupTitle: "Creer un compte",
      email: "Email",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      name: "Nom complet",
      noAccount: "Pas de compte ?",
      haveAccount: "Deja un compte ?",
      forgotPassword: "Mot de passe oublie ?",
      createAccount: "Creer un compte",
      signingIn: "Connexion en cours...",
      signingUp: "Creation du compte...",
      submitLogin: "Se connecter",
      submitSignup: "S'inscrire",
      resetTitle: "Reinitialiser le mot de passe",
      sendReset: "Envoyer le lien",
      resetStep2: "Definir un nouveau mot de passe",
      resetDone: "Mot de passe mis a jour avec succes.",
      backToLogin: "Retour a la connexion",
      resetEmailHint: "Email utilise lors de l'inscription",
      resetNewPassword: "Nouveau mot de passe",
      resetContinue: "Continuer",
      demoCreds: "Compte admin de demo : sarah@example.com / 123456",
    },
    contact: {
      title: "Contactez-nous",
      subtitle: "Une question ? Notre equipe vous repond rapidement.",
      firstname: "Prenom",
      lastname: "Nom",
      subject: "Sujet",
      message: "Message",
      send: "Envoyer le message",
      sent: "Message envoye. Merci !",
    },
    admin: {
      title: "Tableau de bord admin",
      subtitle: "Vue d'ensemble de votre boutique.",
      notAllowed: "Cette page est reservee aux administrateurs.",
      statsProducts: "Produits",
      statsCategories: "Categories",
      statsNew: "Nouveautes",
      statsBest: "Best-sellers",
      users: "Utilisateurs",
      recentOrders: "Dernieres commandes (fictives)",
    },
    common: {
      viewAll: "Tout voir",
      language: "Langue",
      theme: "Theme",
      light: "Clair",
      dark: "Sombre",
      fr: "FR",
      en: "EN",
      notFound: "Page introuvable",
      backHome: "Retour a l'accueil",
    },
  },
  en: {
    nav: {
      home: "Home",
      shop: "Shop",
      contact: "Contact",
      admin: "Admin",
      login: "Login",
      signup: "Sign up",
      logout: "Logout",
      welcome: "Hello, {{name}}",
    },
    home: {
      title: "Step into Victoria elegance",
      subtitle: "Collection 2026",
      description: "Premium women footwear crafted for comfort, style and performance.",
      shopNow: "Shop now",
      explore: "Explore collection",
      categories: "Categories",
      newArrivals: "New arrivals",
      bestsellerTitle: "Our favorite products",
    },
    shop: {
      title: "Shop",
      subtitle: "Find the perfect pair for your style.",
      searchPlaceholder: "Search products...",
      allCategories: "All categories",
      sortBy: "Sort by",
      sortPopular: "Popularity",
      sortPriceAsc: "Price: low to high",
      sortPriceDesc: "Price: high to low",
      results: "{{count}} products found",
      empty: "No products match your filters.",
    },
    auth: {
      loginTitle: "Sign in",
      signupTitle: "Create an account",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      name: "Full name",
      noAccount: "No account yet?",
      haveAccount: "Already have an account?",
      forgotPassword: "Forgot password?",
      createAccount: "Create account",
      signingIn: "Signing in...",
      signingUp: "Creating account...",
      submitLogin: "Sign in",
      submitSignup: "Sign up",
      resetTitle: "Reset your password",
      sendReset: "Send reset link",
      resetStep2: "Set your new password",
      resetDone: "Password updated successfully.",
      backToLogin: "Back to login",
      resetEmailHint: "Email used during sign up",
      resetNewPassword: "New password",
      resetContinue: "Continue",
      demoCreds: "Admin demo account: sarah@example.com / 123456",
    },
    contact: {
      title: "Contact us",
      subtitle: "Any question? Our team will answer quickly.",
      firstname: "First name",
      lastname: "Last name",
      subject: "Subject",
      message: "Message",
      send: "Send message",
      sent: "Message sent. Thank you!",
    },
    admin: {
      title: "Admin dashboard",
      subtitle: "Overview of your store.",
      notAllowed: "This page is only available for administrators.",
      statsProducts: "Products",
      statsCategories: "Categories",
      statsNew: "New arrivals",
      statsBest: "Best sellers",
      users: "Users",
      recentOrders: "Recent orders (mock)",
    },
    common: {
      viewAll: "View all",
      language: "Language",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      fr: "FR",
      en: "EN",
      notFound: "Page not found",
      backHome: "Back home",
    },
  },
};

const getInitialLanguage = () => {
  const savedLanguage = localStorage.getItem("language");
  if (savedLanguage === "fr" || savedLanguage === "en") {
    return savedLanguage;
  }
  return "fr";
};

const getValueFromPath = (objectValue, path) => {
  return path.split(".").reduce((result, key) => {
    if (result && typeof result === "object" && key in result) {
      return result[key];
    }
    return undefined;
  }, objectValue);
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  const value = useMemo(() => {
    const t = (key, params = {}) => {
      const selectedValue = getValueFromPath(translations[language], key);
      const fallbackValue = getValueFromPath(translations.fr, key);
      const resolvedText = selectedValue ?? fallbackValue ?? key;

      return Object.entries(params).reduce(
        (text, [paramKey, paramValue]) => text.replaceAll(`{{${paramKey}}}`, String(paramValue)),
        resolvedText,
      );
    };

    const updateLanguage = (nextLanguage) => {
      setLanguage(nextLanguage);
      localStorage.setItem("language", nextLanguage);
    };

    return {
      language,
      setLanguage: updateLanguage,
      toggleLanguage: () => updateLanguage(language === "fr" ? "en" : "fr"),
      t,
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
