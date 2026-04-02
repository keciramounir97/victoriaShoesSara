import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export default function Contact() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const labels =
    language === "fr"
      ? {
          title: "Contactez-nous",
          subtitle: "Une question ? Notre équipe vous répond rapidement.",
          name: "Nom",
          email: "Email",
          message: "Message",
          send: "Envoyer",
          success: "Message envoyé avec succès (simulation).",
        }
      : {
          title: "Contact us",
          subtitle: "Any question? Our team will answer quickly.",
          name: "Name",
          email: "Email",
          message: "Message",
          send: "Send",
          success: "Message sent successfully (simulation).",
        };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-rose-700 dark:text-rose-300">{labels.title}</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">{labels.subtitle}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-sm font-medium">{labels.name}</label>
              <input
                type="text"
                value={formData.name}
                onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                required
                className="h-11 w-full rounded-xl border border-rose-200 px-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-950"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">{labels.email}</label>
              <input
                type="email"
                value={formData.email}
                onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                required
                className="h-11 w-full rounded-xl border border-rose-200 px-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-950"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">{labels.message}</label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                required
                className="w-full rounded-xl border border-rose-200 p-3 outline-none focus:border-rose-500 dark:border-zinc-700 dark:bg-zinc-950"
              />
            </div>
            <button type="submit" className="h-11 rounded-xl bg-rose-600 px-5 font-semibold text-white hover:bg-rose-700">
              {labels.send}
            </button>
            {submitted && (
              <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                {labels.success}
              </p>
            )}
          </form>
        </div>

        <div className="rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50 to-amber-50 p-6 shadow-sm dark:border-zinc-700 dark:from-zinc-900 dark:to-zinc-800">
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-rose-600" />
              <span>Alger, Algeria</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-rose-600" />
              <span>hello@victoria.com</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 text-rose-600" />
              <span>+213 612 345 67</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}