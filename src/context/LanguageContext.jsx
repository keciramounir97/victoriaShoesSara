import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
// createContext : même idée que pour le thème, mais pour la langue affichée (FR/EN).
// useCallback mémorise `setLanguage` / `t` pour éviter de casser les `useEffect` des enfants qui dépendraient de ces fonctions.
// useContext consomme le contexte langue.
// useMemo stabilise l’objet `value` du Provider.
// useState stocke le code langue courant (`fr` ou `en`).

const STORAGE_KEY = 'victoria-lang';
// Clé localStorage pour mémoriser la langue ; séparée du thème pour clarté.

const translations = {
  // Objet central des textes : une seule source de vérité plutôt que des chaînes éparpillées (maintenance plus simple).
  fr: {
    navHome: 'Accueil',
    navShop: 'Boutique',
    navContact: 'Contact',
    navAdmin: 'Admin',
    navLogin: 'Connexion',
    navSignup: 'Inscription',
    navLogout: 'Déconnexion',
    navSearch: 'Rechercher',
    navSearchPlaceholder: 'Rechercher…',
    navMenu: 'Menu',
    navClose: 'Fermer',
    shopTitle: 'Boutique',
    shopSubtitle: 'Toutes nos pièces, filtres et tri.',
    shopFilterAll: 'Toutes',
    shopSort: 'Trier',
    shopSortPriceAsc: 'Prix croissant',
    shopSortPriceDesc: 'Prix décroissant',
    shopSortName: 'Nom A–Z',
    shopEmpty: 'Aucun produit ne correspond à vos filtres.',
    contactTitle: 'Contact',
    contactSubtitle: 'Une question ? Écrivez-nous.',
    contactName: 'Nom',
    contactEmail: 'E-mail',
    contactMessage: 'Message',
    contactSend: 'Envoyer',
    contactSent: 'Message envoyé (démo).',
    signupTitle: 'Créer un compte',
    signupSubtitle: 'Rejoignez Victoria Shoes.',
    signupName: 'Nom complet',
    signupPassword: 'Mot de passe',
    signupSubmit: 'S’inscrire',
    signupHasAccount: 'Déjà un compte ?',
    resetTitle: 'Mot de passe oublié',
    resetSubtitle: 'Recevez un lien factice de réinitialisation.',
    resetEmail: 'E-mail',
    resetRequest: 'Envoyer le lien',
    resetNewPassword: 'Nouveau mot de passe',
    resetConfirm: 'Réinitialiser',
    resetBackLogin: 'Retour à la connexion',
    nopageTitle: 'Page introuvable',
    nopageText: 'La page demandée n’existe pas.',
    nopageCta: 'Retour à l’accueil',
    adminTitle: 'Panneau d’administration',
    adminSubtitle: 'Vue d’ensemble (données locales de démo).',
    adminProducts: 'Produits',
    adminCategories: 'Catégories',
    adminAvgPrice: 'Prix moyen (Da)',
    adminNew: 'Nouveautés',
    adminBestsellers: 'Best-sellers',
    adminTableProduct: 'Produit',
    adminTableBrand: 'Marque',
    adminTableCategory: 'Catégorie',
    adminTablePrice: 'Prix',
    adminForbidden: 'Accès réservé aux administrateurs.',
    adminBackHome: 'Retour à l’accueil',
    loginEmail: 'E-mail',
    loginPassword: 'Mot de passe',
    loginSubmit: 'Se connecter',
    loginLoading: 'Connexion en cours…',
    loginNoAccount: 'Pas de compte ?',
    heroShop: 'Acheter',
    heroExplore: 'Découvrir',
    heroBadge: 'Nouvelle collection 2026',
    heroTitle1: 'Entrez dans',
    heroTitle2: 'l’élégance Victoria',
    heroDesc:
      'Chaussures premium pour femmes : confort, style et performance. Talons, baskets et silhouettes soignées.',
    categoriesTitle: 'Catégories',
    categoriesSeeAll: 'Tout voir',
    categoriesArticles: 'articles',
    bestBadge: 'Best-sellers',
    bestTitle: 'Nos produits préférés',
    bestSubtitle: 'Les chaussures les plus appréciées par nos clients.',
    bestCta: 'Découvrir',
    newTitle: 'Nouveautés',
    newSubtitle: 'Les dernières arrivées.',
    footerTagline:
      'Découvrez l’élégance à chaque pas. Nous sélectionnons les plus belles chaussures pour femmes.',
    footerShop: 'Boutique',
    footerHelp: 'Aide',
    footerSize: 'Guide des tailles',
    footerShipping: 'Livraison',
    footerReturns: 'Retours',
    footerContact: 'Nous contacter',
    footerStay: 'Restez informé(e)',
    footerEmailPh: 'Votre e-mail',
    footerRights: 'Tous droits réservés.',
    footerPrivacy: 'Confidentialité',
    footerTerms: 'Conditions',
    productNew: 'Nouveau',
    productBestseller: 'Best-seller',
  },
  en: {
    navHome: 'Home',
    navShop: 'Shop',
    navContact: 'Contact',
    navAdmin: 'Admin',
    navLogin: 'Login',
    navSignup: 'Sign up',
    navLogout: 'Log out',
    navSearch: 'Search',
    navSearchPlaceholder: 'Search…',
    navMenu: 'Menu',
    navClose: 'Close',
    shopTitle: 'Shop',
    shopSubtitle: 'All pieces, filters and sort.',
    shopFilterAll: 'All',
    shopSort: 'Sort',
    shopSortPriceAsc: 'Price: low to high',
    shopSortPriceDesc: 'Price: high to low',
    shopSortName: 'Name A–Z',
    shopEmpty: 'No products match your filters.',
    contactTitle: 'Contact',
    contactSubtitle: 'Questions? Write to us.',
    contactName: 'Name',
    contactEmail: 'Email',
    contactMessage: 'Message',
    contactSend: 'Send',
    contactSent: 'Message sent (demo).',
    signupTitle: 'Create account',
    signupSubtitle: 'Join Victoria Shoes.',
    signupName: 'Full name',
    signupPassword: 'Password',
    signupSubmit: 'Sign up',
    signupHasAccount: 'Already have an account?',
    resetTitle: 'Forgot password',
    resetSubtitle: 'Receive a fake reset link.',
    resetEmail: 'Email',
    resetRequest: 'Send link',
    resetNewPassword: 'New password',
    resetConfirm: 'Reset password',
    resetBackLogin: 'Back to login',
    nopageTitle: 'Page not found',
    nopageText: 'The page you requested does not exist.',
    nopageCta: 'Back to home',
    adminTitle: 'Admin panel',
    adminSubtitle: 'Overview (local demo data).',
    adminProducts: 'Products',
    adminCategories: 'Categories',
    adminAvgPrice: 'Avg. price (Da)',
    adminNew: 'New arrivals',
    adminBestsellers: 'Bestsellers',
    adminTableProduct: 'Product',
    adminTableBrand: 'Brand',
    adminTableCategory: 'Category',
    adminTablePrice: 'Price',
    adminForbidden: 'Admins only.',
    adminBackHome: 'Back to home',
    loginEmail: 'Email',
    loginPassword: 'Password',
    loginSubmit: 'Sign in',
    loginLoading: 'Signing in…',
    loginNoAccount: 'No account?',
    heroShop: 'Shop now',
    heroExplore: 'Explore',
    heroBadge: 'New collection 2026',
    heroTitle1: 'Step into',
    heroTitle2: 'Victoria elegance',
    heroDesc:
      "Premium women's footwear: comfort, style and performance. Heels, sneakers and refined silhouettes.",
    categoriesTitle: 'Categories',
    categoriesSeeAll: 'See all',
    categoriesArticles: 'items',
    bestBadge: 'Bestsellers',
    bestTitle: 'Our favorites',
    bestSubtitle: 'The shoes our customers love most.',
    bestCta: 'Discover',
    newTitle: 'New arrivals',
    newSubtitle: 'The latest drops.',
    footerTagline:
      'Discover elegance in every step. We curate fine women’s footwear from around the world.',
    footerShop: 'Shop',
    footerHelp: 'Help',
    footerSize: 'Size guide',
    footerShipping: 'Shipping',
    footerReturns: 'Returns',
    footerContact: 'Contact us',
    footerStay: 'Stay updated',
    footerEmailPh: 'Your email',
    footerRights: 'All rights reserved.',
    footerPrivacy: 'Privacy',
    footerTerms: 'Terms',
    productNew: 'New',
    productBestseller: 'Bestseller',
  },
};
// Pourquoi FR+EN dans un objet : bascule instantanée sans recharger la page ; alternative i18next serait lourde pour ce prototype.

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    if (typeof window === 'undefined') return 'fr';
    return window.localStorage.getItem(STORAGE_KEY) || 'fr';
    // Défaut `fr` car la consigne utilisateur est en français ; l’utilisateur peut passer en EN depuis la barre.
  });

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    window.localStorage.setItem(STORAGE_KEY, lang);
    // Persistance immédiate ; on pourrait aussi mettre `document.documentElement.lang` dans un useEffect.
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'fr';
    // Améliore l’accessibilité et le SEO côté navigateur (lecteurs d’écran, traduction automatique du navigateur).
  }, [language]);

  const t = useCallback(
    (key) => {
      const pack = translations[language] || translations.fr;
      // Repli sur FR si une clé manque en EN — évite les trous vides en prod.
      return pack[key] ?? translations.fr[key] ?? key;
      // Dernier repli : afficher la clé pour repérer vite une traduction oubliée pendant le dev.
    },
    [language],
  );

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage doit être utilisé à l’intérieur de LanguageProvider');
  }
  return ctx;
}
