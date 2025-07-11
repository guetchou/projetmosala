import { useState, useEffect } from "react";
import { setToken, getUserRole } from "@/utils/auth";
import { useNavigate, Link } from "react-router-dom";
import { fetchApi } from "@/api/fetcher";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import { Eye, EyeOff, ArrowLeft, LogIn, Linkedin, Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [stayConnected, setStayConnected] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.search.includes("logout=1")) {
      setError("");
      setTimeout(() => setError(""), 3000);
    }
    if (window.location.search.includes("expired=1")) {
      setError("Votre session a expiré. Veuillez vous reconnecter.");
      setTimeout(() => setError(""), 5000);
    }
  }, []);

  const validateEmail = (value: string) => /.+@.+\..+/.test(value);
  const validatePassword = (value: string) => value.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await fetchApi<{ access_token: string }>("/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      setToken(data.access_token);
      const role = getUserRole();
      if (role === "admin") navigate("/admin-dashboard");
      else if (role === "recruteur") navigate("/recruiter-space");
      else navigate("/profile-creation");
    } catch (err) {
      setError("Identifiants invalides ou erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  // Simuler OAuth (à remplacer par vraie intégration backend)
  const handleSocialLogin = (provider: "google" | "linkedin") => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError("Connexion sociale non encore disponible sur cette démo.");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-mosala-green-500)] via-[var(--color-mosala-yellow-100)] to-[var(--color-mosala-dark-900)] relative overflow-hidden">
      {/* Retour accueil */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-30 flex items-center gap-2 text-[var(--color-mosala-green-700)] hover:text-[var(--color-mosala-green-900)] bg-[var(--color-mosala-white)]/80 rounded-full px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--color-mosala-green-400)] transition-colors duration-200"
        aria-label="Retour à l'accueil"
      >
        <ArrowLeft className="w-5 h-5" /> Accueil
      </button>
      
      {/* Branding Mosala amélioré */}
      <div className="absolute top-0 left-0 w-full flex flex-col items-center pt-10 z-10">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-[var(--color-mosala-white)]/80 rounded-full shadow-lg p-2 animate-fade-in-down">
            <img src="/lovable-uploads/logo-mosala1.png" alt="Logo Mosala" className="h-20 w-auto drop-shadow-xl transition-transform duration-300 hover:scale-105" />
          </div>
          <span className="text-[var(--color-mosala-green-700)] font-bold text-lg tracking-wide animate-fade-in-up">Plateforme d'emploi & d'accompagnement</span>
        </div>
      </div>
      
      {/* Effet décoratif */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[var(--color-mosala-green-200)] rounded-full opacity-30 blur-3xl animate-blob" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[var(--color-mosala-yellow-200)] rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000" />
      </div>
      
      <form
        onSubmit={handleSubmit}
        className="relative z-20 bg-[var(--color-mosala-white)]/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 flex flex-col gap-6 w-full max-w-md border border-[var(--color-mosala-green-200)] animate-fade-in-up"
        aria-label="Connexion à Mosala"
      >
        <h1 className="text-3xl font-extrabold text-[var(--color-mosala-dark-900)] mb-2 text-center tracking-tight">Connexion</h1>
        <p className="text-[var(--color-mosala-dark-400)] text-center mb-2">Bienvenue sur la plateforme Mosala. Connectez-vous pour accéder à votre espace personnalisé.</p>
        
        {error && (
          <div className="text-[var(--color-mosala-red-600)] text-center bg-[var(--color-mosala-red-50)] border border-[var(--color-mosala-red-200)] rounded-lg p-3" role="alert">
            {error}
          </div>
        )}
        
        {window.location.search.includes("logout=1") && (
          <div className="text-[var(--color-mosala-green-600)] mb-2 text-center bg-[var(--color-mosala-green-50)] border border-[var(--color-mosala-green-200)] rounded-lg p-3">
            Vous avez été déconnecté.
          </div>
        )}
        
        {window.location.search.includes("expired=1") && (
          <div className="text-[var(--color-mosala-red-600)] mb-2 text-center bg-[var(--color-mosala-red-50)] border border-[var(--color-mosala-red-200)] rounded-lg p-3">
            Votre session a expiré. Veuillez vous reconnecter.
          </div>
        )}
        
        {/* Social login */}
        <div className="flex flex-col gap-3 mb-2">
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-[var(--color-mosala-green-200)] hover:bg-[var(--color-mosala-green-50)] text-[var(--color-mosala-dark-900)] font-semibold transition-colors duration-200"
            onClick={() => handleSocialLogin("google")}
            disabled={loading}
            aria-label="Connexion avec Google"
          >
            <img src="public/icons/icons8-google-48.svg" className="w-5 h-5" />
            Continuer avec Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-[var(--color-mosala-green-200)] hover:bg-[var(--color-mosala-green-50)] text-[var(--color-mosala-dark-900)] font-semibold transition-colors duration-200"
            onClick={() => handleSocialLogin("linkedin")}
            disabled={loading}
            aria-label="Connexion avec LinkedIn"
          >
            <Linkedin className="w-5 h-5 text-[#0077B5]" />
            Continuer avec LinkedIn
          </Button>
        </div>
        
        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-[var(--color-mosala-green-100)]" />
          <span className="text-xs text-[var(--color-mosala-dark-300)]">ou avec votre email</span>
          <div className="flex-1 h-px bg-[var(--color-mosala-green-100)]" />
        </div>
        
        <label htmlFor="email" className="sr-only">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => { setEmail(e.target.value); setEmailTouched(true); }}
          className={`input input-bordered px-4 py-3 rounded-lg border ${emailTouched && !validateEmail(email) ? "border-[var(--color-mosala-red-400)]" : "border-[var(--color-mosala-green-200)]"} focus:border-[var(--color-mosala-green-500)] focus:ring-2 focus:ring-[var(--color-mosala-green-100)] text-[var(--color-mosala-dark-900)] bg-[var(--color-mosala-white)]/80 shadow-inner transition-colors duration-200`}
          required
          autoFocus
          autoComplete="email"
          aria-invalid={emailTouched && !validateEmail(email)}
        />
        {emailTouched && !validateEmail(email) && (
          <div className="text-xs text-[var(--color-mosala-red-500)] -mt-3 mb-2">Veuillez entrer un email valide.</div>
        )}
        
        <label htmlFor="password" className="sr-only">Mot de passe</label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={e => { setPassword(e.target.value); setPasswordTouched(true); }}
            className={`input input-bordered px-4 py-3 rounded-lg border ${passwordTouched && !validatePassword(password) ? "border-[var(--color-mosala-red-400)]" : "border-[var(--color-mosala-green-200)]"} focus:border-[var(--color-mosala-green-500)] focus:ring-2 focus:ring-[var(--color-mosala-green-100)] text-[var(--color-mosala-dark-900)] bg-[var(--color-mosala-white)]/80 w-full shadow-inner transition-colors duration-200`}
            required
            autoComplete="current-password"
            aria-invalid={passwordTouched && !validatePassword(password)}
          />
          <button
            type="button"
            tabIndex={0}
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-mosala-green-400)] hover:text-[var(--color-mosala-green-700)] focus:outline-none transition-colors duration-200"
            onClick={() => setShowPassword(v => !v)}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {passwordTouched && !validatePassword(password) && (
          <div className="text-xs text-[var(--color-mosala-red-500)] -mt-3 mb-2">Le mot de passe doit contenir au moins 6 caractères.</div>
        )}
        
        <div className="flex items-center gap-2">
          <input
            id="stayConnected"
            type="checkbox"
            checked={stayConnected}
            onChange={e => setStayConnected(e.target.checked)}
            className="accent-[var(--color-mosala-green-500)] h-4 w-4 rounded border-[var(--color-mosala-green-200)] focus:ring-[var(--color-mosala-green-400)]"
          />
          <label htmlFor="stayConnected" className="text-sm text-[var(--color-mosala-dark-400)] cursor-pointer">Rester connecté</label>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <Link to="/forgot-password" className="text-[var(--color-mosala-green-600)] hover:underline transition-colors duration-200">Mot de passe oublié ?</Link>
          <Link to="/register" className="text-[var(--color-mosala-yellow-600)] hover:underline transition-colors duration-200">Créer un compte</Link>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-[var(--color-mosala-white)] font-bold py-3 rounded-lg shadow-lg hover:from-[var(--color-mosala-green-600)] hover:to-[var(--color-mosala-yellow-600)] focus:ring-2 focus:ring-[var(--color-mosala-yellow-500)] focus:ring-offset-2 transition-all duration-300 text-lg mt-2 flex items-center justify-center gap-2"
          disabled={loading || !validateEmail(email) || !validatePassword(password)}
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <LogIn className="w-5 h-5" />}
          {loading ? "Connexion en cours..." : "Se connecter"}
        </Button>
      </form>
    </div>
  );
};

export default Login; 