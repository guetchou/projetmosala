import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogIn, Loader2, CheckCircle, User, Briefcase, HelpCircle, Eye, EyeOff, Mail, Lock, Phone } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "",
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (value: string) => /.+@.+\..+/.test(value);
  const validatePassword = (value: string) => value.length >= 8;
  const validatePhone = (value: string) => /^[\+]?[0-9\s\-\(\)]{10,}$/.test(value);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        setError("Veuillez remplir tous les champs obligatoires.");
        return;
      }
      if (!validateEmail(formData.email)) {
        setError("Veuillez entrer un email valide.");
        return;
      }
    }
    if (step === 2) {
      if (!formData.password || !formData.confirmPassword) {
        setError("Veuillez remplir tous les champs obligatoires.");
        return;
      }
      if (!validatePassword(formData.password)) {
        setError("Le mot de passe doit contenir au moins 8 caractères.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Les mots de passe ne correspondent pas.");
        return;
      }
    }
    if (step === 3) {
      if (!formData.userType) {
        setError("Veuillez sélectionner votre type de compte.");
        return;
      }
      if (!formData.acceptTerms) {
        setError("Veuillez accepter les conditions d'utilisation.");
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Simulation d'inscription
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate("/login?registered=1");
    } catch (err) {
      setError("Erreur lors de l'inscription. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: "Informations personnelles", icon: User },
    { title: "Sécurité", icon: Lock },
    { title: "Type de compte", icon: Briefcase },
    { title: "Confirmation", icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-mosala-green-500)]/10 via-[var(--color-mosala-yellow-100)]/10 to-[var(--color-mosala-dark-900)]/10 relative overflow-hidden p-4">
      {/* Retour accueil */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-30 flex items-center gap-2 text-[var(--color-mosala-green-700)] hover:text-[var(--color-mosala-green-900)] bg-[var(--color-mosala-white)]/80 rounded-full px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--color-mosala-green-400)] transition-colors duration-200"
        aria-label="Retour à l'accueil"
      >
        <ArrowLeft className="w-5 h-5" /> Accueil
      </button>

      {/* Branding Mosala */}
      <div className="absolute top-0 left-0 w-full flex flex-col items-center pt-10 z-10">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-[var(--color-mosala-white)]/80 rounded-full shadow-lg p-2 animate-fade-in-down">
            <img src="/lovable-uploads/logo-mosala1.png" alt="Logo Mosala" className="h-16 w-auto drop-shadow-xl transition-transform duration-300 hover:scale-105" />
          </div>
          <span className="text-[var(--color-mosala-green-700)] font-bold text-lg tracking-wide animate-fade-in-up">Rejoignez la communauté Mosala</span>
        </div>
      </div>

      {/* Effet décoratif */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[var(--color-mosala-green-200)] rounded-full opacity-20 blur-3xl animate-blob" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[var(--color-mosala-yellow-200)] rounded-full opacity-20 blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-20 bg-[var(--color-mosala-white)]/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 w-full max-w-2xl border border-[var(--color-mosala-green-200)] animate-fade-in-up">
        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8">
          {steps.map((stepInfo, index) => {
            const Icon = stepInfo.icon;
            const isActive = index + 1 === step;
            const isCompleted = index + 1 < step;
            
            return (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted 
                    ? "bg-[var(--color-mosala-green-500)] text-[var(--color-mosala-white)]" 
                    : isActive 
                    ? "bg-[var(--color-mosala-green-100)] text-[var(--color-mosala-green-700)] border-2 border-[var(--color-mosala-green-500)]" 
                    : "bg-[var(--color-mosala-gray-100)] text-[var(--color-mosala-gray-400)]"
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                </div>
                <span className={`text-xs font-medium text-center ${
                  isActive ? "text-[var(--color-mosala-green-700)]" : "text-[var(--color-mosala-gray-500)]"
                }`}>
                  {stepInfo.title}
                </span>
              </div>
            );
          })}
        </div>

        <h1 className="text-3xl font-extrabold text-[var(--color-mosala-dark-900)] mb-6 text-center tracking-tight">
          Créer votre compte
        </h1>

        {error && (
          <div className="text-[var(--color-mosala-red-600)] text-center bg-[var(--color-mosala-red-50)] border border-[var(--color-mosala-red-200)] rounded-lg p-3 mb-6" role="alert">
            {error}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-[var(--color-mosala-dark-700)] mb-2">
                      Prénom *
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--color-mosala-green-200)] focus:border-[var(--color-mosala-green-500)] focus:ring-2 focus:ring-[var(--color-mosala-green-100)] text-[var(--color-mosala-dark-900)] bg-[var(--color-mosala-white)]/80 shadow-inner transition-colors duration-200"
                      placeholder="Votre prénom"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-[var(--color-mosala-dark-700)] mb-2">
                      Nom *
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--color-mosala-green-200)] focus:border-[var(--color-mosala-green-500)] focus:ring-2 focus:ring-[var(--color-mosala-green-100)] text-[var(--color-mosala-dark-900)] bg-[var(--color-mosala-white)]/80 shadow-inner transition-colors duration-200"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--color-mosala-dark-700)] mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-mosala-green-400)] w-5 h-5" />
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-[var(--color-mosala-green-200)] focus:border-[var(--color-mosala-green-500)] focus:ring-2 focus:ring-[var(--color-mosala-green-100)] text-[var(--color-mosala-dark-900)] bg-[var(--color-mosala-white)]/80 shadow-inner transition-colors duration-200"
                      placeholder="votre.email@exemple.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-mosala-dark-700)] mb-2">
                    Téléphone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-mosala-green-400)] w-5 h-5" />
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-[var(--color-mosala-green-200)] focus:border-[var(--color-mosala-green-500)] focus:ring-2 focus:ring-[var(--color-mosala-green-100)] text-[var(--color-mosala-dark-900)] bg-[var(--color-mosala-white)]/80 shadow-inner transition-colors duration-200"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[var(--color-mosala-dark-700)] mb-2">
                    Mot de passe *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-mosala-green-400)] w-5 h-5" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="w-full pl-10 pr-12 py-3 rounded-lg border border-[var(--color-mosala-green-200)] focus:border-[var(--color-mosala-green-500)] focus:ring-2 focus:ring-[var(--color-mosala-green-100)] text-[var(--color-mosala-dark-900)] bg-[var(--color-mosala-white)]/80 shadow-inner transition-colors duration-200"
                      placeholder="Minimum 8 caractères"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-mosala-green-400)] hover:text-[var(--color-mosala-green-700)] transition-colors duration-200"
                      aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-[var(--color-mosala-dark-700)] mb-2">
                    Confirmer le mot de passe *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-mosala-green-400)] w-5 h-5" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="w-full pl-10 pr-12 py-3 rounded-lg border border-[var(--color-mosala-green-200)] focus:border-[var(--color-mosala-green-500)] focus:ring-2 focus:ring-[var(--color-mosala-green-100)] text-[var(--color-mosala-dark-900)] bg-[var(--color-mosala-white)]/80 shadow-inner transition-colors duration-200"
                      placeholder="Confirmez votre mot de passe"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-mosala-green-400)] hover:text-[var(--color-mosala-green-700)] transition-colors duration-200"
                      aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="bg-[var(--color-mosala-green-50)] border border-[var(--color-mosala-green-200)] rounded-lg p-4">
                  <h4 className="font-semibold text-[var(--color-mosala-green-800)] mb-2">Critères de sécurité</h4>
                  <ul className="text-sm text-[var(--color-mosala-green-700)] space-y-1">
                    <li className={`flex items-center gap-2 ${formData.password.length >= 8 ? "text-[var(--color-mosala-green-600)]" : "text-[var(--color-mosala-gray-500)]"}`}>
                      <CheckCircle className={`w-4 h-4 ${formData.password.length >= 8 ? "text-[var(--color-mosala-green-500)]" : "text-[var(--color-mosala-gray-400)]"}`} />
                      Au moins 8 caractères
                    </li>
                    <li className={`flex items-center gap-2 ${/[A-Z]/.test(formData.password) ? "text-[var(--color-mosala-green-600)]" : "text-[var(--color-mosala-gray-500)]"}`}>
                      <CheckCircle className={`w-4 h-4 ${/[A-Z]/.test(formData.password) ? "text-[var(--color-mosala-green-500)]" : "text-[var(--color-mosala-gray-400)]"}`} />
                      Au moins une majuscule
                    </li>
                    <li className={`flex items-center gap-2 ${/\d/.test(formData.password) ? "text-[var(--color-mosala-green-600)]" : "text-[var(--color-mosala-gray-500)]"}`}>
                      <CheckCircle className={`w-4 h-4 ${/\d/.test(formData.password) ? "text-[var(--color-mosala-green-500)]" : "text-[var(--color-mosala-gray-400)]"}`} />
                      Au moins un chiffre
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-mosala-dark-700)] mb-4">
                    Type de compte *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleInputChange("userType", "candidat")}
                      className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                        formData.userType === "candidat"
                          ? "border-[var(--color-mosala-green-500)] bg-[var(--color-mosala-green-50)]"
                          : "border-[var(--color-mosala-green-200)] hover:border-[var(--color-mosala-green-300)] bg-[var(--color-mosala-white)]"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <User className={`w-6 h-6 ${formData.userType === "candidat" ? "text-[var(--color-mosala-green-600)]" : "text-[var(--color-mosala-green-400)]"}`} />
                        <span className="font-semibold text-[var(--color-mosala-dark-900)]">Candidat</span>
                      </div>
                      <p className="text-sm text-[var(--color-mosala-dark-600)]">
                        Recherchez des emplois, créez votre profil et postulez aux offres
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleInputChange("userType", "recruteur")}
                      className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                        formData.userType === "recruteur"
                          ? "border-[var(--color-mosala-green-500)] bg-[var(--color-mosala-green-50)]"
                          : "border-[var(--color-mosala-green-200)] hover:border-[var(--color-mosala-green-300)] bg-[var(--color-mosala-white)]"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Briefcase className={`w-6 h-6 ${formData.userType === "recruteur" ? "text-[var(--color-mosala-green-600)]" : "text-[var(--color-mosala-green-400)]"}`} />
                        <span className="font-semibold text-[var(--color-mosala-dark-900)]">Recruteur</span>
                      </div>
                      <p className="text-sm text-[var(--color-mosala-dark-600)]">
                        Publiez des offres d'emploi et trouvez les meilleurs candidats
                      </p>
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) => handleInputChange("acceptTerms", e.target.checked)}
                    className="mt-1 accent-[var(--color-mosala-green-500)] h-4 w-4 rounded border-[var(--color-mosala-green-200)] focus:ring-[var(--color-mosala-green-400)]"
                  />
                  <label htmlFor="acceptTerms" className="text-sm text-[var(--color-mosala-dark-600)] cursor-pointer">
                    J'accepte les{" "}
                    <Link to="/terms" className="text-[var(--color-mosala-green-600)] hover:underline">
                      conditions d'utilisation
                    </Link>{" "}
                    et la{" "}
                    <Link to="/privacy" className="text-[var(--color-mosala-green-600)] hover:underline">
                      politique de confidentialité
                    </Link>
                  </label>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="bg-[var(--color-mosala-green-50)] border border-[var(--color-mosala-green-200)] rounded-xl p-6">
                  <h3 className="font-semibold text-[var(--color-mosala-green-800)] mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[var(--color-mosala-green-600)]" />
                    Récapitulatif de votre inscription
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--color-mosala-dark-600)]">Nom complet:</span>
                      <span className="font-medium text-[var(--color-mosala-dark-900)]">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-mosala-dark-600)]">Email:</span>
                      <span className="font-medium text-[var(--color-mosala-dark-900)]">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-mosala-dark-600)]">Type de compte:</span>
                      <span className="font-medium text-[var(--color-mosala-dark-900)] capitalize">{formData.userType}</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-[var(--color-mosala-dark-600)] mb-4">
                    Votre compte sera créé et vous recevrez un email de confirmation.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-[var(--color-mosala-green-100)]">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(prev => prev - 1)}
              className="border-[var(--color-mosala-green-200)] text-[var(--color-mosala-green-700)] hover:bg-[var(--color-mosala-green-50)] transition-colors duration-200"
            >
              Précédent
            </Button>
          )}
          
          <div className="ml-auto">
            {step < 4 ? (
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-[var(--color-mosala-white)] hover:from-[var(--color-mosala-green-600)] hover:to-[var(--color-mosala-yellow-600)] transition-all duration-300"
              >
                Suivant
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-[var(--color-mosala-white)] hover:from-[var(--color-mosala-green-600)] hover:to-[var(--color-mosala-yellow-600)] transition-all duration-300 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    Création en cours...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Créer mon compte
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-[var(--color-mosala-dark-500)]">
            Déjà un compte ?{" "}
            <Link to="/login" className="text-[var(--color-mosala-green-600)] hover:underline font-medium">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;