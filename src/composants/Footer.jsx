import React from 'react';
import { ArrowRight, Heart,   MapPin, Mail, Phone } from 'lucide-react';
import { FaInstagram , FaFacebook } from 'react-icons/fa';
import Button from '../composants/Button';
import {categories} from "../composants/Categories"
import {Link} from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const setSelectedCategory = (id) => {
    console.log('Selected category:', id);
  };
  
  const setCurrentView = (view) => {
    console.log('Current view:', view);
  };

  const socialLinks = [
    { icon: FaFacebook, href: "https://facebook.com", label: "Facebook", bgHover: "hover:bg-blue-600" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram", bgHover: "hover:bg-pink-600" },
    
   
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white mt-8">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '1.4rem', fontWeight: 600, letterSpacing: '0.12em', color: '#9d174d', textTransform: 'uppercase' }}>
                        Victoria
                    </span>
                    <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.5rem', fontWeight: 700, color: '#d81b60', letterSpacing: '0.02em' }}>
                        Shoes
                    </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Discover elegance in every step. We curate the finest women's shoes from around the world.
            </p>
            
            {/* Social Links - Version corrigée */}
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-slate-700 ${social.bgHover} p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1`}
                  aria-label={social.label}
                >
                  <social.icon size={18} className="text-white" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Shop  */}
          <div className='flex flex-col items-start ' >
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {categories.map(cat => (
                <li key={cat.id}>
                  <button 
                    onClick={() => { 
                      setSelectedCategory(cat.id); 
                      setCurrentView('grid'); 
                    }} 
                    className="hover:text-rose-400 transition-colors flex items-center gap-2 flex-"
                    style={{height:"18px", width:"18px"}}
                  >
                    {cat.icon} {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Help & Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-amber-400">Help</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="hover:text-amber-400 transition-colors cursor-pointer">Size Guide</li>
              <li className="hover:text-amber-400 transition-colors cursor-pointer">Shipping Info</li>
              <li className="hover:text-amber-400 transition-colors cursor-pointer">Returns</li>
              
              
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-amber-400">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <span>Alger, Algeria</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-amber-400 flex-shrink-0" />
                <a href="mailto:hello@victoria.com" className="hover:text-amber-400 transition-colors" style={{textDecoration:"none", color:'inherit'}}>
                  hello@victoria.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-amber-400 flex-shrink-0" />
                <a href="tel:+21361234567" className="hover:text-amber-400 transition-colors" style={{textDecoration:"none", color:'inherit'}}>
                 +213 612 345 67
                </a>
              </li>
            </ul>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2 text-gray-200">Stay Updated</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="bg-slate-700 text-white text-sm px-3 py-2 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-lg transition-colors">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; {currentYear} victoria. All rights reserved.</p>
            
            <div className="flex gap-6">
              <button className="hover:text-amber-400 transition-colors">Privacy Policy</button>
              <button className="hover:text-amber-400 transition-colors">Terms of Service</button>
              <Link className="hover:text-amber-400 transition-colors" to="/contact"  style={{textDecoration:"none", color:'inherit'}}>Contact</Link>
            
            </div>
            
      
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;