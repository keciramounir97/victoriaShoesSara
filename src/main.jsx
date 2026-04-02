import { StrictMode } from 'react';
// StrictMode aide à détecter effets de bord en dev (double rendu) ; sans impact en production.
import { createRoot } from 'react-dom/client';
// createRoot est l’API React 18+ pour monter l’app sur le nœud DOM `#root`.
import './index.css';
// Styles globaux Tailwind + variables ; chargés une fois pour toute l’app.
import App from './App.jsx';
// Composant racine contenant routes et layout.
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap CSS : utilisé partiellement avec les composants existants.
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// JS Bootstrap (dropdowns/modals) si des attributs `data-bs-*` sont employés.
import { ThemeProvider } from './context/ThemeContext.jsx';
// Provider du thème clair/sombre (Context API demandée).
import { LanguageProvider } from './context/LanguageContext.jsx';
// Provider FR/EN avec fonction `t()`.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
);
// Ordre des providers : Theme puis Language pour que tout composant puisse utiliser les deux hooks.
