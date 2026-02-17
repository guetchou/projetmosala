import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Phone, ArrowRight, Loader2, User } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [identifier, setIdentifier] = useState(""); // email ou téléphone
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [acceptCGU, setAcceptCGU] = useState(false);
  const navigate = useNavigate();

  const isEmail = (val: string) => /.+@.+\..+/.test(val);
  const isPhone = (val: string) => /^\+?\d{7,15}$/.test(val.replace(/\s/g, ""));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (!prenom || !nom || !identifier || !password || !confirmPassword) setError("Veuillez remplir tous les champs.");
      else if (!isEmail(identifier) && !isPhone(identifier)) setError("Veuillez entrer un email ou un téléphone valide.");
      else if (password.length < 6) setError("Le mot de passe doit contenir au moins 6 caractères.");
      else if (password !== confirmPassword) setError("Les mots de passe ne correspondent pas.");
      else if (!acceptCGU) setError("Vous devez accepter les conditions d'utilisation.");
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
        alt="Register Mosala"
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
      {/* Card d'inscription Argon Material UI */}
      <main className="flex-1 flex items-center justify-center z-30 relative">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/90 rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-md flex flex-col gap-6 backdrop-blur-md border border-[#6476f3]/20 z-50"
        >
          <h2 className="text-2xl md:text-3xl font-black text-[#22304a] text-center mb-2">Créer un compte</h2>
          <p className="text-[#6476f3]/80 text-center mb-4">Rejoignez la communauté Mosala</p>
          {error && <div className="bg-[#fa496e]/10 text-[#fa496e] rounded p-2 text-center text-sm font-semibold">{error}</div>}
          {/* Inscription sociale (désactivée) */}
          <div className="flex flex-col gap-3 mb-2">
            <p className="text-center text-sm text-[#6476f3]/60">Les inscriptions via Google et LinkedIn ont été désactivées. Utilisez les pages d'administration.</p>
          </div>
          <div className="flex items-center gap-2 my-2">
            <div className="flex-1 h-px bg-[#2fdab8]/20" />
            <span className="text-xs text-[#6476f3]/70">ou avec votre email ou téléphone</span>
            <div className="flex-1 h-px bg-[#2fdab8]/20" />
          </div>
          <div className="flex flex-col gap-4">
            <label className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6476f3]">
                <User className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="Prénom"
                value={prenom}
                onChange={e => setPrenom(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-[#6476f3]/30 focus:border-[#6476f3] focus:ring-2 focus:ring-[#6476f3]/20 outline-none text-[#22304a] bg-white/90 shadow"
                required
                autoComplete="given-name"
              />
            </label>
            <label className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6476f3]">
                <User className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="Nom"
                value={nom}
                onChange={e => setNom(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-[#6476f3]/30 focus:border-[#6476f3] focus:ring-2 focus:ring-[#6476f3]/20 outline-none text-[#22304a] bg-white/90 shadow"
                required
                autoComplete="family-name"
              />
            </label>
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
                autoComplete="new-password"
              />
              <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6476f3] focus:outline-none">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </label>
            <label className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6476f3]">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-full border border-[#6476f3]/30 focus:border-[#6476f3] focus:ring-2 focus:ring-[#6476f3]/20 outline-none text-[#22304a] bg-white/90 shadow"
                required
                autoComplete="new-password"
              />
              <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6476f3] focus:outline-none">
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </label>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input
              id="acceptCGU"
              type="checkbox"
              checked={acceptCGU}
              onChange={e => setAcceptCGU(e.target.checked)}
              className="accent-[#2fdab8] h-4 w-4 rounded border-[#2fdab8]/30 focus:ring-[#2fdab8]/40"
              required
            />
            <label htmlFor="acceptCGU" className="text-sm text-[#22304a]/70 cursor-pointer">J’accepte les <a href="/legal" className="underline text-[#6476f3]">conditions d’utilisation</a></label>
          </div>
          <button
            type="submit"
            className="mt-4 flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold text-white shadow hover:scale-105 transition glassmorphism-cta bg-[#6476f3]/90 hover:bg-[#6476f3]"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
            Créer un compte
          </button>
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 mt-2">
            <div className="flex gap-2 w-full justify-center">
              <Link to="/superadmin/register" className="text-[#fa496e] hover:underline text-sm font-semibold">S'inscrire Superadmin</Link>
              <span className="text-sm text-[#6476f3]/60">|</span>
              <Link to="/admin-content/register" className="text-[#fa496e] hover:underline text-sm font-semibold">S'inscrire Admin contenu</Link>
            </div>
          </div>
        </motion.form>
      </main>
    </div>
  );
};

export default Register;