
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, Clock, Users, Award, Target } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import DemoBadge from "@/components/DemoBadge";

const contactPhoto = "/topcenter-uploads/pexel/contact.jpg";

export default function Contact() {
  const navbarRef = useRef<HTMLElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
    const handleResize = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email.includes("@") || form.message.length < 5) {
      setError("Merci de remplir tous les champs correctement.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ paddingTop: navbarHeight }}>
      <Navbar ref={navbarRef} />
      <main className="flex-1 w-full flex flex-col items-center justify-center px-0 py-0">
        {/* Split section */}
        <section className="w-full flex flex-col md:flex-row min-h-[600px]">
          {/* Left: Photo */}
          <motion.div
            className="md:w-1/2 w-full flex items-center justify-center bg-gray-50 md:rounded-tr-[3rem] md:rounded-br-[3rem] overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            style={{ minHeight: 340 }}
          >
            <img
              src={contactPhoto}
              alt="Contact Mosala, équipe à l'écoute"
              className="object-cover w-full h-full min-h-[340px] md:min-h-[600px] md:rounded-tr-[3rem] md:rounded-br-[3rem]"
              style={{ maxHeight: 600 }}
            />
          </motion.div>
          {/* Right: Content */}
          <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-gray-50 py-16 px-6 md:px-12">
            {/* Avatar conseiller LinkedIn-style */}
            <div className="flex flex-col items-center mb-8">
              <img src="/topcenter-uploads/pexel/avatar-conseille.jpg" alt="Marie, Conseillère Mosala" className="h-28 w-28 rounded-full border-4 border-[#7ED9A7] shadow-lg mb-2 object-cover" />
              <div className="font-bold text-lg text-gray-700">Marie</div>
              <div className="text-sm text-gray-600">Conseillère Mosala</div>
            </div>
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-left mb-6 bg-gradient-to-r from-[#7ED9A7] to-[#00824B] text-transparent bg-clip-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Contactez Mosala
            </motion.h1>
            <motion.p
              className="text-lg text-left text-gray-800 mb-10 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Notre équipe est à votre écoute pour toute question, demande d'information ou suggestion. Remplissez le formulaire ou contactez-nous directement.
            </motion.p>
            {/* Bloc horaires d'ouverture */}
            <div className="w-full max-w-lg flex items-center gap-3 bg-[#E6F9F0] border border-[#7ED9A7]/40 rounded-xl px-4 py-3 mb-6">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-gray-600 font-medium">Horaires : </span>
              <span className="text-gray-500">Lundi - Vendredi 9h-18h (UTC+1)</span>
            </div>
            {/* Formulaire moderne */}
            <motion.section
              className="w-full max-w-lg bg-[#FAFAFA] rounded-2xl shadow-xl p-8 border border-[#E5E7EB] flex flex-col gap-4 mb-8"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-gray-700"> <Send className="w-6 h-6" /> Écrivez-nous</h2>
              {sent ? (
                <div className="text-center text-gray-600 font-semibold text-lg py-8">Merci, votre message a bien été envoyé !<br />Notre équipe vous répondra rapidement.</div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4" aria-label="Formulaire de contact Mosala">
                  <label className="text-sm font-semibold text-gray-800" htmlFor="name">Nom</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="input input-bordered px-4 py-3 rounded-lg border border-[#7ED9A7]/30 focus:border-[#7ED9A7] focus:ring-2 focus:ring-[#7ED9A7]/10 text-[#18182f] bg-white w-full shadow-inner transition-all duration-200"
                    required
                    aria-required="true"
                    aria-label="Nom"
                    placeholder="Votre nom complet"
                  />
                  <label className="text-sm font-semibold text-[#18182f]" htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="input input-bordered px-4 py-3 rounded-lg border border-[#7ED9A7]/30 focus:border-[#7ED9A7] focus:ring-2 focus:ring-[#7ED9A7]/10 text-[#18182f] bg-white w-full shadow-inner transition-all duration-200"
                    required
                    aria-required="true"
                    aria-label="Email"
                    placeholder="Votre adresse email"
                  />
                  <label className="text-sm font-semibold text-[#18182f]" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="input input-bordered px-4 py-3 rounded-lg border border-[#7ED9A7]/30 focus:border-[#7ED9A7] focus:ring-2 focus:ring-[#7ED9A7]/10 text-[#18182f] bg-white w-full shadow-inner min-h-[100px] transition-all duration-200"
                    required
                    aria-required="true"
                    aria-label="Message"
                    placeholder="Expliquez-nous votre besoin, nous sommes là pour vous aider !"
                  />
                  {error && <div className="text-red-600 text-center" role="alert">{error}</div>}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#7ED9A7] to-[#00824B] text-white font-bold py-3 rounded-lg shadow-lg hover:from-[#00824B] hover:to-[#7ED9A7] focus:ring-2 focus:ring-[#00824B] focus:ring-offset-2 transition-all duration-300 text-lg mt-2 flex items-center justify-center gap-2"
                    disabled={loading}
                    aria-busy={loading}
                  >
                    {loading ? <span className="animate-spin"><Send className="w-5 h-5" /></span> : <Send className="w-5 h-5" />}
                    {loading ? "Envoi en cours..." : "Envoyer ma demande"}
                    <DemoBadge />
                  </button>
                </form>
              )}
            </motion.section>
            {/* Infos de contact direct */}
            <div className="w-full max-w-lg flex flex-col gap-3 text-[#18182f] text-base mt-4">
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#00824B]" /> contact@mosala.org</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#00824B]" /> +242 06 802 00 06</div>
              <div className="flex items-center gap-2"><Users className="w-4 h-4 text-[#00824B]" /> Brazzaville, République du Congo</div>
            </div>
            {/* Réseaux sociaux LinkedIn-style */}
            <div className="w-full max-w-lg flex flex-col gap-2 mt-6">
              <div className="text-[#00824B] font-semibold mb-1">Retrouvez-nous aussi sur :</div>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/company/mosala" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Mosala" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0077B5]/10 hover:bg-[#0077B5]/20 text-[#0077B5] font-medium transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
                  LinkedIn
                </a>
                <a href="https://wa.me/242068020006" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Mosala" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] font-medium transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.25-1.44l-.38-.22-3.69.97.99-3.59-.25-.37A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.43s1.02 2.82 1.16 3.02c.14.2 2.01 3.08 4.88 4.2.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/></svg>
                  WhatsApp
                </a>
                <a href="https://m.me/mosala" target="_blank" rel="noopener noreferrer" aria-label="Messenger Mosala" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#006AFF]/10 hover:bg-[#006AFF]/20 text-[#006AFF] font-medium transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.02 2 11.2c0 2.87 1.23 5.47 3.29 7.29V22l3.02-1.66c.54.15 1.1.23 1.69.23 5.52 0 10-4.02 10-9.2S17.52 2 12 2zm.01 16.2c-.49 0-.97-.07-1.42-.2l-.99.55.07-1.02c-2.01-1.47-3.18-3.6-3.18-5.93 0-3.87 3.58-7 8-7s8 3.13 8 7-3.58 7-8 7z"/></svg>
                  Messenger
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
