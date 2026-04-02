import { createContext, useContext, useEffect, useMemo, useState } from 'react';
// createContext crée un « canal » React pour partager le thème sans props en cascade ; on évite ainsi de passer `theme` à chaque composant enfant.
// useContext permet de lire cette valeur n’importe où sous le fournisseur ; c’est plus idiomatique qu’un store global pour un état UI simple.
// useEffect synchronise le thème avec le DOM (`body`) et le stockage ; sans effet, le changement ne s’appliquerait qu’en mémoire React.
// useMemo évite de recréer l’objet `value` à chaque rendu si les dépendances n’ont pas changé ; les enfants évitent des re-rendus inutiles.
// useState garde l’état local du thème (`light` / `dark`) ; on a choisi l’état local + Context plutôt que Zustand ici pour coller à la demande « contexte thème ».

const STORAGE_KEY = 'victoria-theme';
// Clé localStorage unique au projet ; un préfixe évite les collisions avec d’autres apps sur le même domaine.

const ThemeContext = createContext(null);
// Valeur par défaut `null` : si un composant utilise le hook hors Provider, on pourra lever une erreur explicite.

export function ThemeProvider({ children }) {
  // `children` représente tout l’arbre React enveloppé (souvent `App`) ; le Provider « injecte » le thème en dessous.
  const [theme, setTheme] = useState(() => {
    // Initialisation paresseuse : on lit localStorage une seule fois au premier montage, pas à chaque rendu.
    if (typeof window === 'undefined') return 'light';
    // Garde SSR / environnements sans `window` ; ici Vite est client-only mais la défensive ne coûte rien.
    return window.localStorage.getItem(STORAGE_KEY) || 'light';
    // On retombe sur `light` si aucune préférence ; choix UX classique plutôt que `prefers-color-scheme` pour rester prévisible en démo.
  });

  useEffect(() => {
    // Chaque fois que `theme` change, on met à jour le DOM pour que le CSS global (`body.light` / `body.dark`) s’applique.
    document.body.classList.remove('light', 'dark');
    // On retire les deux classes pour éviter d’empiler `light dark` par erreur.
    document.body.classList.add(theme);
    // On n’ajoute qu’une seule classe active ; c’est plus simple que des variables CSS partout pour ce site.
    window.localStorage.setItem(STORAGE_KEY, theme);
    // Persistance : au rechargement, l’utilisateur retrouve son choix ; alternative aurait été cookies (serveur) — inutile ici.
  }, [theme]);
  // Tableau de dépendances : l’effet ne tourne que quand `theme` change, pas à chaque rendu parent.

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    // Forme fonctionnelle de `setState` : on s’appuie sur l’état précédent, ce qui évite les courses si plusieurs toggles rapides.
  };

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme }),
    // Objet stable tant que `theme` est identique ; `toggleTheme` et `setTheme` sont stables (référence React).
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
  // Le Provider « pousse » `value` dans l’arbre ; tout descendant peut consommer sans props drilling.
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  // Lecture du contexte ; `ctx` vaut `null` si hook utilisé hors Provider.
  if (!ctx) {
    throw new Error('useTheme doit être utilisé à l’intérieur de ThemeProvider');
    // Erreur explicite plutôt qu’un bug silencieux `undefined.theme` plus tard.
  }
  return ctx;
  // On retourne `{ theme, toggleTheme, setTheme }` typé par usage.
}
