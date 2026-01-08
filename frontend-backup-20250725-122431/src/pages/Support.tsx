import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Send, HelpCircle, Mail, Phone, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DemoBadge from "@/components/DemoBadge";

// Photo large, ambiance entraide/collaboration (Unsplash)
const supportPhoto = "/topcenter-uploads/support/support.jpeg?auto=format&fit=crop&w=900&q=80";

const faqTeaser = [
  {
    q: "Comment obtenir une réponse rapide ?",
    a: "Utilisez le formulaire ou le chat en ligne, notre équipe répond sous 24h."
  },
  {
    q: "Puis-je joindre Mosala par téléphone ?",
    a: "Oui, au +242 06 123 45 67 (heures ouvrées)."
  }
];

// Ajout d'une fonction pour ouvrir le chatbot
function openChatbot() {
  const event = new CustomEvent("open-mosala-chatbot");
  window.dispatchEvent(event);
}

const Support = () => {
  const [form, setForm] = useState({ name: "", email: "", type: "Assistance technique", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="mt-12" aria-hidden="true"></div>
      <main className="flex-1 w-full flex flex-col items-center justify-center px-0 py-0">
        {/* Section principale split */}
        <section className="w-full flex flex-col md:flex-row min-h-[600px]">
          {/* Visuel large à gauche */}
          <motion.div
            className="md:w-1/2 w-full flex items-center justify-center bg-gray-50 md:rounded-tr-[3rem] md:rounded-br-[3rem] overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            style={{ minHeight: 340 }}
          >
            <img
              src={supportPhoto}
              alt="Support Mosala, entraide humaine"
              className="object-cover w-full h-full min-h-[340px] md:min-h-[600px] md:rounded-tr-[3rem] md:rounded-br-[3rem]"
              style={{ maxHeight: 600 }}
            />
          </motion.div>
          {/* Contenu à droite */}
          <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-gray-50 py-16 px-6 md:px-12">
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-left mb-6 bg-gradient-to-r from-[#7ED9A7] to-[#00824B] text-transparent bg-clip-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Support Mosala
            </motion.h1>
            <motion.p
              className="text-lg text-left text-gray-800 mb-10 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Notre équipe est là pour vous, n’hésitez pas à nous écrire ou à discuter en direct. Nous mettons l’humain au cœur de notre accompagnement.
            </motion.p>
            {/* Formulaire moderne */}
            <motion.section
              className="w-full max-w-lg bg-gray-50 rounded-2xl shadow-xl p-8 border border-gray-200 flex flex-col gap-4 mb-8"
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
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-600/10 text-gray-800 bg-white w-full shadow-inner transition-all duration-200"
                    required
                    aria-required="true"
                    aria-label="Nom"
                    placeholder="Votre nom complet"
                  />
                  <label className="text-sm font-semibold text-gray-800" htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-600/10 text-gray-800 bg-white w-full shadow-inner transition-all duration-200"
                    required
                    aria-required="true"
                    aria-label="Email"
                    placeholder="Votre adresse email"
                  />
                  <label className="text-sm font-semibold text-gray-800" htmlFor="type">Type de demande</label>
                  <select
                    id="type"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-600/10 text-gray-800 bg-white w-full shadow-inner transition-all duration-200"
                    aria-label="Type de demande"
                  >
                    <option>Assistance technique</option>
                    <option>Demande de documentation</option>
                    <option>Suggestion</option>
                    <option>Autre</option>
                  </select>
                  <label className="text-sm font-semibold text-gray-800" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-600/10 text-gray-800 bg-white w-full shadow-inner min-h-[100px] transition-all duration-200"
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
            {/* FAQ teaser */}
            <section className="w-full max-w-lg mx-auto mb-8">
              <div className="bg-gray-50 rounded-2xl shadow p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2"><HelpCircle className="w-5 h-5" /> Questions fréquentes</h3>
                <ul className="space-y-3">
                  {faqTeaser.map((item, i) => (
                    <li key={i} className="border-l-4 border-[#00824B] pl-3">
                      <span className="font-semibold text-gray-800">{item.q}</span>
                      <br />
                      <span className="text-gray-600">{item.a}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-right">
                  <Link to="/faq" className="text-gray-600 hover:underline font-semibold">Voir toutes les questions</Link>
                </div>
              </div>
            </section>
            {/* Accès Chatbot & Contact direct */}
            <section className="w-full flex flex-col md:flex-row gap-6 items-center justify-start mb-4">
              <a
                href="#chatbot"
                className="flex items-center gap-3 bg-gradient-to-r from-[#7ED9A7] to-[#00824B] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:from-[#00824B] hover:to-[#7ED9A7] transition-all text-lg focus-visible:ring-4 focus-visible:ring-[#00824B]"
                aria-label="Accéder au Chatbot Mosala"
                style={{ cursor: 'pointer' }}
                onClick={e => { e.preventDefault(); openChatbot(); }}
              >
                <HelpCircle className="w-6 h-6" /> Discuter avec un agent (Chatbot)
              </a>
              <div className="flex flex-col gap-2 text-gray-800 text-base">
                <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@mosala.org</span>
                <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> +242 06 123 45 67</span>
                <span className="flex items-center gap-2"><Users className="w-4 h-4" /> Chat en ligne (en bas à droite)</span>
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Support; 