import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./composants/navbar.jsx";
import Footer from "./composants/Footer.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Contact from "./pages/Contact.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Nopage from "./pages/Nopage.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import ProtectedRoute from "./admin/composants/protectedRoute.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Nopage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}