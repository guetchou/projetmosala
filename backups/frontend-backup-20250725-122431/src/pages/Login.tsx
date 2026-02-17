import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Phone, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // email ou téléphone
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stayConnected, setStayConnected] = useState(false);
  const navigate = useNavigate();

  const isEmail = (val: string) => /.+@.+\..+/.test(val);
  const isPhone = (val: string) => /^\+?\d{7,15}$/.test(val.replace(/\s/g, ""));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (!identifier || !password) setError("Veuillez remplir tous les champs.");
      else if (!isEmail(identifier) && !isPhone(identifier)) setError("Veuillez entrer un email ou un téléphone valide.");
      else if (identifier !== "demo@mosala.org" && identifier !== "+242061234567" || password !== "demo123") setError("Identifiants invalides.");
      else navigate("/profile-creation");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f9fc] relative overflow-hidden">
      {/* Fond animé glassmorphism */}
      <style>{`
        @keyframes heroWind {
          0% { transform: translateY(0); }
          100% { transform: translateY(24px); }
        }
      `}</style>
      <motion.img
        src="/topcenter-uploads/carrousel/mosala-jeunes1.png"
        alt="Login Mosala"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'blur(12px) brightness(0.7)', opacity: 0.7, animation: 'heroWind 18s ease-in-out infinite alternate' }}
      />
      <div className="absolute inset-0 bg-white/70 backdrop-blur-md z-10" />
      {/* Branding */}
      <div className="absolute top-0 left-0 w-full flex flex-col items-center pt-10 z-20">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-white/80 rounded-full shadow-lg p-2 animate-fade-in-down">
            <img src="/topcenter-uploads/logo-mosala1.png" alt="Logo Mosala" className="h-20 w-auto drop-shadow-xl transition-transform duration-300 hover:scale-105" />
          </div>
          <span className="text-[#2fdab8] font-bold text-lg tracking-wide animate-fade-in-up">Projet d'emploi & d'accompagnement</span>
        </div>
      </div>
      {/* Card de login Argon Material UI */}
      <main className="flex-1 flex items-center justify-center z-30 relative">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/90 rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-md flex flex-col gap-6 backdrop-blur-md border border-[#6476f3]/20 z-50"
        >
          <h2 className="text-2xl md:text-3xl font-black text-[#22304a] text-center mb-2">Connexion</h2>
          <p className="text-[#6476f3]/80 text-center mb-4">Accédez à votre espace Mosala</p>
          {error && <div className="bg-[#fa496e]/10 text-[#fa496e] rounded p-2 text-center text-sm font-semibold">{error}</div>}
          {/* Connexion sociale */}
          <div className="flex flex-col gap-3 mb-2">
            <button type="button" className="w-full flex items-center justify-center gap-2 border border-[#2fdab8]/30 bg-white/80 hover:bg-[#2fdab8]/10 text-[#22304a] font-semibold rounded-full py-2 shadow transition" disabled={loading}>
              <img src="/icons/icons8-google-48.svg" className="w-5 h-5" alt="Google" /> Continuer avec Google
            </button>
            <button type="button" className="w-full flex items-center justify-center gap-2 border border-[#6476f3]/30 bg-white/80 hover:bg-[#6476f3]/10 text-[#22304a] font-semibold rounded-full py-2 shadow transition" disabled={loading}>
              <svg className="w-5 h-5" fill="#0077B5" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg> Continuer avec LinkedIn
            </button>
          </div>
          <div className="flex items-center gap-2 my-2">
            <div className="flex-1 h-px bg-[#2fdab8]/20" />
            <span className="text-xs text-[#6476f3]/70">ou avec votre email ou téléphone</span>
            <div className="flex-1 h-px bg-[#2fdab8]/20" />
          </div>
          <div className="flex flex-col gap-4">
            <label className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6476f3]">
                {isEmail(identifier) ? <Mail className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
              </span>
              <input
                type="text"
                placeholder="Email ou téléphone"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-[#6476f3]/30 focus:border-[#6476f3] focus:ring-2 focus:ring-[#6476f3]/20 outline-none text-[#22304a] bg-white/90 shadow"
                required
                autoComplete="username"
              />
            </label>
            <label className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6476f3]">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-full border border-[#6476f3]/30 focus:border-[#6476f3] focus:ring-2 focus:ring-[#6476f3]/20 outline-none text-[#22304a] bg-white/90 shadow"
                required
                autoComplete="current-password"
              />
              <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6476f3] focus:outline-none">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </label>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input
              id="stayConnected"
              type="checkbox"
              checked={stayConnected}
              onChange={e => setStayConnected(e.target.checked)}
              className="accent-[#2fdab8] h-4 w-4 rounded border-[#2fdab8]/30 focus:ring-[#2fdab8]/40"
            />
            <label htmlFor="stayConnected" className="text-sm text-[#22304a]/70 cursor-pointer">Rester connecté</label>
          </div>
          <button
            type="submit"
            className="mt-4 flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold text-white shadow hover:scale-105 transition glassmorphism-cta bg-[#6476f3]/90 hover:bg-[#6476f3]"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
            Se connecter
          </button>
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 mt-2">
            <Link to="/forgot-password" className="text-[#2fdab8] hover:underline text-sm font-semibold">Mot de passe oublié ?</Link>
            <Link to="/register" className="text-[#fa496e] hover:underline text-sm font-semibold">Créer un compte</Link>
          </div>
        </motion.form>
      </main>
    </div>
  );
};

export default Login; 