# Explication ligne par ligne (FR)

Ce document explique **le role, la fonction et le pourquoi** des lignes des fichiers principaux modifies.

> Remarque importante: ajouter un commentaire sous **chaque ligne de code source** rendrait le projet illisible et difficile a maintenir.  
> A la place, ce fichier sert de documentation pedagogique detaillee, en francais.

---

## 1) `src/main.jsx`

- `import { StrictMode } from 'react'`  
  Importe StrictMode pour detecter des effets secondaires potentiels en developpement.
- `import { createRoot } from 'react-dom/client'`  
  Importe l'API moderne de rendu React.
- `import './index.css'`  
  Charge les styles globaux.
- `import App from './App.jsx'`  
  Importe le composant racine de l'application.
- `import 'bootstrap/dist/css/bootstrap.min.css'` / `import 'bootstrap/dist/js/bootstrap.bundle.min.js'`  
  Rend Bootstrap disponible (styles + scripts).
- `import { ThemeProvider } ...` / `import { LanguageProvider } ...`  
  Injecte les contexts theme et langue dans tout l'arbre React.
- `createRoot(...).render(...)`  
  Monte l'application React dans le DOM.
- `<ThemeProvider><LanguageProvider><App/></LanguageProvider></ThemeProvider>`  
  Ordre choisi pour rendre theme + langue disponibles partout.

**Pourquoi ce choix ?**  
Un provider global evite de passer manuellement les props de theme/langue a chaque composant (prop drilling).

---

## 2) `src/contexts/ThemeContext.jsx`

- `createContext(null)`  
  Cree un contexte partage pour le theme.
- `getInitialTheme()`  
  Lit `localStorage` pour restaurer la preference utilisateur.
- `useState(getInitialTheme)`  
  Initialise sans recalcul inutile a chaque rendu.
- `useEffect([...theme])`  
  Synchronise `body.classList` + `localStorage` a chaque changement.
- `useMemo(() => ({ ... }))`  
  Stabilise la reference de l'objet context (perf).
- `toggleTheme`  
  Bascule light/dark de maniere deterministe.
- `useTheme()`  
  Hook custom securise (erreur claire si provider absent).

**Pourquoi context et pas store ici ?**  
Le besoin est global mais simple; un context React natif suffit et reste lisible.

---

## 3) `src/contexts/LanguageContext.jsx`

- `translations = { fr, en }`  
  Dictionnaire central des textes.
- `getInitialLanguage()`  
  Restaure la langue depuis `localStorage`.
- `setLanguage` / `toggleLanguage`  
  Permet choix explicite ou bascule rapide.
- `t(path)`  
  Resolve des cles type `nav.home` pour centraliser les labels.

**Pourquoi `t("...")` ?**  
Pour eviter les chaines en dur partout et simplifier la maintenance i18n.

---

## 4) `src/Stores/authContext.jsx`

- `fakeUsers`  
  Base utilisateur simulee locale.
- `role: "admin"` pour Sarah  
  Active la logique de route admin protegee.
- `persist(...)`  
  Sauvegarde user/token entre rafraichissements.
- `login/signup/logout/checkAuth`  
  Simule un cycle auth complet sans backend.
- `requestPasswordReset/resetPassword`  
  Simule le flux mot de passe oublie.
- `isAuthenticated` / `isAdmin`  
  Helpers de lecture d'etat auth.

**Pourquoi fake auth ?**  
La demande impose un flux de demonstration sans API reelle.

---

## 5) `src/admin/composants/protectedRoute.jsx`

- Lit `user`, `token`, `isLoading`, `checkAuth` depuis le store.
- Affiche un etat de chargement si verification en cours.
- Redirige vers `/login` si non connecte.
- Si `requireAdmin` et role non admin => redirection home.
- Sinon retourne `children`.

**Pourquoi composant wrapper ?**  
Pour reutiliser la protection sur plusieurs routes privees.

---

## 6) `src/App.jsx`

- Definit les routes principales.
- Place `Navbar` + `Footer` autour du `main`.
- Route `/admin` encapsulee dans `<ProtectedRoute requireAdmin>`.
- Route `*` vers page 404.

**Pourquoi centraliser ici ?**  
`App.jsx` est le point unique de routing et layout global.

---

## 7) `src/composants/navbar.jsx`

- `useTheme`, `useLanguage`, `useAuthStore`  
  Reagit au theme, a la langue et a l'etat de session.
- `navLinks` via `useMemo`  
  Evite recalcul inutile de la liste.
- Version desktop + version mobile (menu burger).
- Boutons: recherche, theme, langue.
- Etat connecte: nom + logout; et lien admin si role admin.

**Pourquoi cette structure responsive ?**  
Desktop et mobile n'ont pas les memes contraintes d'espace.

---

## 8) `src/pages/Shop.jsx`

- Etats de filtre: categorie, recherche, tri.
- `visibleProducts` avec `useMemo`  
  Filtre + trie les produits efficacement.
- Grille responsive.
- Modal detail produit sur selection.

**Pourquoi `useMemo` ?**  
Evite de recalculer les filtres a chaque rendu non lie.

---

## 9) `src/pages/Login.jsx`, `SignUp.jsx`, `ResetPassword.jsx`

- Formulaires connectes au store auth.
- Labels FR/EN selon `language`.
- Messages de chargement/erreur clairs.
- Redirections apres succes (`navigate`).

**Pourquoi pages separees ?**  
Chaque etape auth a son UX propre et ses validations.

---

## 10) `src/pages/AdminPanel.jsx`

- Dashboard admin simule:
  - cartes KPI (users/products/orders/revenue),
  - table commandes mock,
  - actions rapides.
- Accessible uniquement via role admin.

**Pourquoi mock data ici ?**  
Permet de montrer l'architecture admin sans backend.

---

## 11) `src/pages/Contact.jsx`, `Nopage.jsx`, `Home.jsx`

- `Contact`: formulaire + infos contact.
- `Nopage`: 404 utile avec retour accueil.
- `Home`: hero + sections categories/nouveautes/bestsellers, layout mobile-friendly.

**Pourquoi remplir toutes les pages ?**  
Pour eviter les routes vides et rendre le parcours utilisateur complet.

---

## 12) `src/composants/Footer.jsx`, `Categories.jsx`, `Nouveaute.jsx`, `BestSellers.jsx`, `ProductCard.jsx`

- Tous alignes avec le theme visuel existant.
- Ameliorations de responsivite et coherence UX.
- Interactions produits (wishlist/quick view/detail) conservees.
- Traductions principales appliquees.

**Pourquoi ces ajustements ?**  
Conserver l'identite design tout en augmentant qualite et robustesse.

