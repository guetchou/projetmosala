import { useState } from "react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import { ArrowLeft, Mail, Loader2, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShake(false);
    setTimeout(() => {
      setLoading(false);
      if (email.includes("@")) setSent(true);
      else {
        setError("Veuillez entrer un email valide.");
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mosala-green-500 via-mosala-yellow-100 to-mosala-dark-900 relative overflow-hidden">
      <motion.button
        onClick={() => navigate("/login")}
        className="absolute top-6 left-6 z-30 flex items-center gap-2 text-mosala-green-700 hover:text-mosala-green-900 bg-white/80 rounded-full px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-mosala-green-400 transition-transform hover:scale-105"
        aria-label="Retour à la connexion"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-5 h-5" /> Connexion
      </motion.button>
      {/* Branding Mosala */}
      <div className="absolute top-0 left-0 w-full flex flex-col items-center pt-10 z-10">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-white/80 rounded-full shadow-lg p-2 animate-fade-in-down">
            <img src="/lovable-uploads/logo-mosala1.png" alt="Logo Mosala" className="h-20 w-auto drop-shadow-xl transition-transform duration-300 hover:scale-105" />
          </div>
          <span className="text-mosala-green-700 font-bold text-lg tracking-wide animate-fade-in-up">Plateforme d'emploi & d'accompagnement</span>
        </div>
      </div>
      {/* Effet décoratif blobs Mosala */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-mosala-green-200 rounded-full opacity-30 blur-3xl animate-blob" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-mosala-yellow-200 rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000" />
      </div>
      <AnimatePresence>
        <motion.form
          key={sent ? "sent" : "form"}
          onSubmit={handleSubmit}
          className={`relative z-20 bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 flex flex-col gap-6 w-full max-w-md border border-mosala-green-100 animate-fade-in-up ${shake ? "animate-shake" : ""}`}
          aria-label="Mot de passe oublié Mosala"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <h1 className="text-2xl font-extrabold text-mosala-dark-900 mb-2 text-center tracking-tight">Mot de passe oublié ?</h1>
          <p className="text-mosala-dark-400 text-center mb-2">Saisissez votre email pour recevoir un lien de réinitialisation.</p>
          <AnimatePresence>
            {error && (
              <motion.div
                className="text-red-600 text-center"
                role="alert"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          {sent ? (
            <motion.div
              className="flex flex-col items-center gap-2 text-green-600 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <CheckCircle className="w-12 h-12 text-green-500 animate-bounce-in" />
              <span>Un email de réinitialisation a été envoyé si l'adresse existe dans notre base.</span>
            </motion.div>
          ) : (
            <>
              <label htmlFor="email" className="sr-only">Email</label>
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <input
                  id="email"
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="input input-bordered px-4 py-3 rounded-lg border border-mosala-green-200 focus:border-mosala-green-500 focus:ring-2 focus:ring-mosala-green-100 text-mosala-dark-900 bg-white/80 w-full shadow-inner transition-all duration-200 focus:scale-[1.03]"
                  required
                  autoFocus
                  autoComplete="email"
                  aria-invalid={!!error}
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-mosala-green-400" />
              </motion.div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-mosala-green-500 to-mosala-yellow-500 text-white font-bold py-3 rounded-lg shadow-lg hover:from-mosala-green-600 hover:to-mosala-yellow-600 focus:ring-2 focus:ring-mosala-yellow-500 focus:ring-offset-2 transition-all duration-300 text-lg mt-2 flex items-center justify-center gap-2"
                disabled={loading || !email}
                asChild={false}
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Mail className="w-5 h-5" />}
                {loading ? "Envoi en cours..." : "Envoyer le lien"}
              </Button>
            </>
          )}
        </motion.form>
      </AnimatePresence>
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

export default ForgotPassword; 