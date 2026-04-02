import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './composants/navbar.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Contact from './pages/Contact.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Nopage from './pages/Nopage.jsx';
import Footer from './composants/Footer.jsx';
import { useThemeStore } from './Stores/themeStore.jsx';
import { useEffect } from 'react';






export default function App() {

  const { theme } = useThemeStore();

  useEffect(() => {
     document.body.classList.remove("light","dark")
     document.body.classList.add(theme)
   },[theme])


  return <>
  
    <BrowserRouter>
      <Navbar />
      <Routes>
        
     <Route path="/" element={<Home />} />
     <Route path="/shop" element={<Shop />} />
     <Route path="/login" element={<Login />} />
     <Route path="/signup" element={<SignUp />} />
     <Route path="/contact" element={<Contact />} />
     <Route path="/reset-password" element={<ResetPassword />} />
     <Route path="*" element={<Nopage />} />
     
    


    </Routes>
    <Footer />
    
    </BrowserRouter>
  
  
  
  </>
}