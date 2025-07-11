import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Loader2, CheckCircle, Phone, MessageCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const quickFaq = [
  {
    q: "Comment obtenir une réponse rapide ?",
    a: "Utilisez le formulaire ou le chat en ligne pour une réponse sous 24h."
  },
  {
    q: "Quels sont les horaires du support ?",
    a: "Lundi à vendredi, 9h-18h (heure du Congo)."
  },
  {
    q: "Puis-je joindre Mosala par téléphone ?",
    a: "Oui, au +242 06 123 45 67 (heures ouvrées)."
  }
];

const Support = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShake(false);
    setTimeout(() => {
      setLoading(false);
      if (email.includes("@") && message.length > 5) setSent(true);
      else {
        setError("Veuillez remplir tous les champs correctement.");
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-mosala-green-500 via-mosala-yellow-100 to-mosala-dark-900 relative overflow-hidden">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-3xl">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-mosala-green-500 to-mosala-yellow-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Support & Contact Mosala
        </motion.h1>
        <motion.p
          className="text-lg text-center text-mosala-dark-400 mb-8 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Notre équipe vous accompagne pour toute question, aide technique ou suggestion. Remplissez le formulaire, consultez la FAQ rapide ou contactez-nous directement.
        </motion.p>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            className="bg-white/80 rounded-2xl shadow-xl p-6 border border-mosala-green-100 flex flex-col gap-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <h2 className="text-lg font-bold text-mosala-green-700 mb-2 flex items-center gap-2"><MessageCircle className="w-5 h-5" /> Contact rapide</h2>
            <AnimatePresence>
              <motion.form
                key={sent ? "sent" : "form"}
                onSubmit={handleSubmit}
                className={`flex flex-col gap-4 animate-fade-in-up ${shake ? "animate-shake" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, type: "spring" }}
                aria-label="Formulaire de contact support Mosala"
              >
                {sent ? (
                  <motion.div
                    className="flex flex-col items-center gap-2 text-green-600 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <CheckCircle className="w-10 h-10 text-green-500 animate-bounce-in" />
                    <span>Votre message a bien été envoyé. Nous vous répondrons rapidement !</span>
                  </motion.div>
                ) : (
                  <>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <motion.input
                      id="email"
                      type="email"
                      placeholder="Votre email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="input input-bordered px-4 py-3 rounded-lg border border-mosala-green-200 focus:border-mosala-green-500 focus:ring-2 focus:ring-mosala-green-100 text-mosala-dark-900 bg-white/80 w-full shadow-inner transition-all duration-200 focus:scale-[1.03]"
                      required
                      autoComplete="email"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    />
                    <label htmlFor="message" className="sr-only">Message</label>
                    <motion.textarea
                      id="message"
                      placeholder="Votre message..."
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className="input input-bordered px-4 py-3 rounded-lg border border-mosala-green-200 focus:border-mosala-green-500 focus:ring-2 focus:ring-mosala-green-100 text-mosala-dark-900 bg-white/80 w-full shadow-inner min-h-[100px] transition-all duration-200 focus:scale-[1.03]"
                      required
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-mosala-green-500 to-mosala-yellow-500 text-white font-bold py-3 rounded-lg shadow-lg hover:from-mosala-green-600 hover:to-mosala-yellow-600 focus:ring-2 focus:ring-mosala-yellow-500 focus:ring-offset-2 transition-all duration-300 text-lg mt-2 flex items-center justify-center gap-2"
                      disabled={loading}
                      asChild={false}
                    >
                      {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Mail className="w-5 h-5" />}
                      {loading ? "Envoi en cours..." : "Envoyer"}
                    </Button>
                    {error && <div className="text-red-600 text-center" role="alert">{error}</div>}
                  </>
                )}
              </motion.form>
            </AnimatePresence>
            <div className="mt-4 text-mosala-dark-400 text-sm">
              <p><Mail className="inline w-4 h-4 mr-1" /> support@mosala.org</p>
              <p><Phone className="inline w-4 h-4 mr-1" /> +242 06 123 45 67</p>
              <p><Clock className="inline w-4 h-4 mr-1" /> Lundi-Vendredi, 9h-18h</p>
              <p><MessageCircle className="inline w-4 h-4 mr-1" /> Chat en ligne (en bas à droite)</p>
            </div>
          </motion.div>
          <motion.div
            className="bg-white/80 rounded-2xl shadow-xl p-6 border border-mosala-green-100 flex flex-col gap-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
          >
            <h2 className="text-lg font-bold text-mosala-green-700 mb-2 flex items-center gap-2"><Clock className="w-5 h-5" /> FAQ rapide</h2>
            <ul className="space-y-3">
              {quickFaq.map((item, i) => (
                <li key={i} className="border-l-4 border-mosala-green-400 pl-3">
                  <span className="font-semibold text-mosala-green-700">{item.q}</span>
                  <br />
                  <span className="text-mosala-dark-400">{item.a}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-mosala-dark-400 text-sm">
              <p>Consultez aussi la <Link to="/faq" className="text-mosala-green-600 hover:underline">FAQ complète</Link> ou la <Link to="/contact" className="text-mosala-green-600 hover:underline">page Contact</Link>.</p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <style>{`
        .animate-shake { animation: shake 0.3s; }
        @keyframes shake {
          0% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
          100% { transform: translateX(0); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.7s cubic-bezier(.68,-0.55,.27,1.55);
        }
        @keyframes bounce-in {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          80% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Support; 