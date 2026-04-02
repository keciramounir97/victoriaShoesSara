import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { categories } from "../data/categories.js";
import { useLanguage } from "../contexts/LanguageContext.jsx";

const socialLinks = [
  { icon: FaFacebook, href: "https://facebook.com", label: "Facebook", bgHover: "hover:bg-blue-600" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram", bgHover: "hover:bg-pink-600" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const labels =
    language === "fr"
      ? {
          tagline: "L'élégance commence par le bon pas.",
          shop: "Boutique",
          help: "Aide",
          contact: "Contact",
          size: "Guide des tailles",
          shipping: "Livraison",
          returns: "Retours",
          stayUpdated: "Restez informée",
          emailPlaceholder: "Votre email",
          rights: "Tous droits réservés.",
          privacy: "Confidentialité",
          terms: "Conditions",
        }
      : {
          tagline: "Elegance starts with the right step.",
          shop: "Shop",
          help: "Help",
          contact: "Contact",
          size: "Size guide",
          shipping: "Shipping info",
          returns: "Returns",
          stayUpdated: "Stay updated",
          emailPlaceholder: "Your email",
          rights: "All rights reserved.",
          privacy: "Privacy",
          terms: "Terms",
        };

  return (
    <footer className="mt-10 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-300">Victoria</span>
              <span className="text-2xl font-bold text-rose-400">Shoes</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-300">{labels.tagline}</p>
            <div className="flex space-x-3 pt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full bg-slate-700 p-2 transition-all duration-300 hover:-translate-y-1 hover:scale-110 ${social.bgHover}`}
                  aria-label={social.label}
                >
                  <social.icon size={18} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">{labels.shop}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to="/shop" className="text-gray-300 no-underline transition-colors hover:text-rose-300">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-amber-400">{labels.help}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="transition-colors hover:text-amber-300">{labels.size}</li>
              <li className="transition-colors hover:text-amber-300">{labels.shipping}</li>
              <li className="transition-colors hover:text-amber-300">{labels.returns}</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-amber-400">{labels.contact}</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 shrink-0 text-amber-300" />
                <span>Alger, Algeria</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="shrink-0 text-amber-300" />
                <a href="mailto:hello@victoria.com" className="text-gray-300 no-underline hover:text-amber-300">
                  hello@victoria.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="shrink-0 text-amber-300" />
                <a href="tel:+21361234567" className="text-gray-300 no-underline hover:text-amber-300">
                  +213 612 345 67
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="mb-2 text-sm font-semibold text-gray-200">{labels.stayUpdated}</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={labels.emailPlaceholder}
                  className="h-10 flex-1 rounded-lg bg-slate-700 px-3 text-sm text-white outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button type="button" className="rounded-lg bg-amber-500 px-3 text-white transition-colors hover:bg-amber-600">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-gray-400 md:flex-row">
            <p className="m-0">
              &copy; {currentYear} Victoria. {labels.rights}
            </p>
            <div className="flex items-center gap-5">
              <button type="button" className="border-none bg-transparent p-0 text-gray-400 transition-colors hover:text-amber-300">
                {labels.privacy}
              </button>
              <button type="button" className="border-none bg-transparent p-0 text-gray-400 transition-colors hover:text-amber-300">
                {labels.terms}
              </button>
              <Link to="/contact" className="text-gray-400 no-underline transition-colors hover:text-amber-300">
                {labels.contact}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}