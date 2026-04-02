import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export default function Contact() {
  const { t } = useLanguage();
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    subject: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousValue) => ({ ...previousValue, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSent(true);
    setFormData({
      firstname: "",
      lastname: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
        <div className="rounded-3xl border border-pink-100 bg-white p-5 sm:p-8 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-bold text-pink-700">{t("contact.title")}</h1>
          <p className="text-gray-600 mt-2 mb-6">{t("contact.subtitle")}</p>

          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-pink-700">
                <Mail size={16} />
              </span>
              hello@victoria.com
            </div>
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-pink-700">
                <Phone size={16} />
              </span>
              +213 612 345 67
            </div>
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-pink-700">
                <MapPin size={16} />
              </span>
              Alger, Algeria
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-pink-100 bg-white p-5 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
                placeholder={t("contact.firstname")}
                className="px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-500 outline-none"
              />
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
                placeholder={t("contact.lastname")}
                className="px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-500 outline-none"
              />
            </div>

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder={t("contact.subject")}
              className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-500 outline-none"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder={t("contact.message")}
              className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-500 outline-none resize-none"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold transition"
            >
              {t("contact.send")}
            </button>
          </form>

          {isSent && <p className="mt-4 text-sm text-green-700 bg-green-50 p-3 rounded-xl">{t("contact.sent")}</p>}
        </div>
      </div>
    </section>
  );
}