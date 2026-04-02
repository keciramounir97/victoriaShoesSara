import './App.css'; // Import de la feuille de styles liée à App (évite une erreur de build si le fichier est vide mais présent).
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // `BrowserRouter` = routage côté client ; `Routes`/`Route` déclarent les chemins URL → composants.
import Navbar from './composants/navbar.jsx'; // Barre de navigation globale (thème, langue, auth).
import Home from './pages/Home.jsx'; // Page d’accueil.
import Shop from './pages/Shop.jsx'; // Catalogue produits avec filtres via query string.
import Login from './pages/Login.jsx'; // Connexion (auth factice).
import SignUp from './pages/SignUp.jsx'; // Inscription (auth factice).
import Contact from './pages/Contact.jsx'; // Formulaire de contact (démo).
import ResetPassword from './pages/ResetPassword.jsx'; // Réinitialisation mot de passe (démo).
import Nopage from './pages/Nopage.jsx'; // Page 404.
import Footer from './composants/Footer.jsx'; // Pied de page commun.
import AdminDashboard from './admin/pages/AdminDashboard.jsx'; // Panneau admin (données locales).
import AdminRoute from './admin/composants/AdminRoute.jsx'; // Enveloppe : connecté + rôle admin.

export default function App() {
  // Composant racine rendu dans `main.jsx` à l’intérieur des Providers (thème + langue).
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route path="*" element={<Nopage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
