import os

folders = [
    "src/components/ui",
    "src/pages",
    "public/lovable-uploads/carrousel",
    "public/lovable-uploads/partenaires"
]

files = {
    "src/components/Navbar.tsx": '''import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Briefcase, Users, BookOpen, MessageCircle, ChevronDown, Search, GraduationCap, Bell, Sun, Moon, User, Settings, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout, getUserRole } from "@/utils/auth";
import { toast } from "@/components/ui/sonner";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";
import { useNotifications } from "@/hooks/useNotifications";

// ... (le reste du code premium de Navbar, voir extrait fourni) ...
''',
    "src/components/ui/Hero.tsx": '''import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";

const Hero = () => {
  const { user, loading: userLoading } = useUser ? useUser() : { user: null, loading: false };
  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg text-gray-900 dark:text-white animate-fade-in-up">
        Construisez votre avenir avec <span className="text-mosala-green-500">Mosala</span>
      </h1>
      <p className="text-lg md:text-xl mb-6 text-gray-700 dark:text-gray-200 max-w-2xl mx-auto animate-fade-in-up">
        Plateforme inclusive pour l'emploi, l'accompagnement, la formation et la réussite professionnelle au Congo.
      </p>
      <Button className="bg-gradient-to-r from-mosala-green-500 to-mosala-yellow-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition animate-fade-in-up">
        Trouver un emploi
      </Button>
      {/* ... (le reste du code Hero premium, voir extrait fourni) ... */}
    </section>
  );
};

export default Hero;
''',
    "src/pages/Services.tsx": """import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    title: "Accompagnement personnalisé",
    description: "Coaching, orientation, suivi individuel pour booster votre carrière.",
    icon: "/lovable-uploads/services/coaching.svg"
  },
  {
    title: "Recrutement & Matching",
    description: "Mise en relation intelligente entre candidats et employeurs.",
    icon: "/lovable-uploads/services/matching.svg"
  },
  {
    title: "Formations & Ateliers",
    description: "Formations certifiantes, ateliers pratiques, e-learning.",
    icon: "/lovable-uploads/services/formation.svg"
  },
  {
    title: "Réseau & Communauté",
    description: "Événements, networking, entraide et opportunités.",
    icon: "/lovable-uploads/community.png"
  }
];

const partnerLogos = [
  "/lovable-uploads/partenaires/afd.jpeg",
  "/lovable-uploads/partenaires/ministere.jpeg",
  "/lovable-uploads/partenaires/ue.jpeg"
];

const Services = () => {
  const [search, setSearch] = useState("");
  const filteredServices = services.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-mosala-green-50 via-mosala-yellow-50 to-mosala-dark-50 relative">
      <Navbar />
      {/* Hero/Header section */}
      <section className="relative w-full flex flex-col items-center justify-center min-h-[340px] md:min-h-[420px] py-12 mb-8 overflow-hidden">
        <img
          src="/lovable-uploads/carrousel/mosala1.jpeg"
          alt="Services Mosala"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-40 blur-sm"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-mosala-green-700/80 via-mosala-yellow-500/40 to-mosala-dark-900/80 z-10" />
        <div className="relative z-20 flex flex-col items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-mosala-green-400 to-mosala-yellow-400 text-transparent bg-clip-text drop-shadow-lg mb-4">Découvrez nos services</h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl">Trouvez le service adapté à vos besoins professionnels ou personnels. Mosala vous accompagne à chaque étape.</p>
          <button className="bg-gradient-to-r from-mosala-green-500 to-mosala-yellow-500 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:from-mosala-green-600 hover:to-mosala-yellow-600 transition-all text-lg">Proposer un service</button>
        </div>
      </section>
      {/* Sticky search & filters */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-mosala-green-100/40 py-4 px-4 flex flex-col md:flex-row items-center gap-4 mb-8 shadow-sm">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher un service, une catégorie..."
          className="w-full md:w-96 px-5 py-3 rounded-full border border-mosala-green-200 focus:border-mosala-green-500 focus:ring-2 focus:ring-mosala-green-100 text-mosala-dark-900 bg-white/90 dark:bg-gray-800/80 shadow-inner transition-all"
          aria-label="Rechercher un service"
        />
        <div className="flex gap-2 flex-wrap">
          <button className="px-4 py-2 rounded-full bg-mosala-green-100 text-mosala-green-700 font-medium hover:bg-mosala-green-200 transition">Tous</button>
          <button className="px-4 py-2 rounded-full bg-mosala-yellow-100 text-mosala-yellow-700 font-medium hover:bg-mosala-yellow-200 transition">Coaching</button>
          <button className="px-4 py-2 rounded-full bg-mosala-green-50 text-mosala-green-700 font-medium hover:bg-mosala-green-100 transition">Recrutement</button>
          <button className="px-4 py-2 rounded-full bg-mosala-yellow-50 text-mosala-yellow-700 font-medium hover:bg-mosala-yellow-100 transition">Formation</button>
          <button className="px-4 py-2 rounded-full bg-mosala-green-50 text-mosala-green-700 font-medium hover:bg-mosala-green-100 transition">Communauté</button>
        </div>
      </div>
      {/* Services grid or empty state */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {filteredServices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <img src="/placeholder.svg" alt="Aucun service" className="h-32 w-32 mb-6 opacity-60" />
            <h2 className="text-2xl font-bold text-mosala-green-700 mb-2">Aucun service trouvé</h2>
            <p className="text-mosala-dark-400 mb-4">Essayez un autre mot-clé ou filtre.</p>
            <button className="bg-mosala-green-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-mosala-green-600 transition">Réinitialiser</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((s, i) => (
              <motion.div
                key={s.title}
                className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-mosala-green-100 hover:scale-105 transition-transform duration-300 group"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                tabIndex={0}
                aria-label={s.title}
              >
                <img src={s.icon} alt="" className="h-16 w-16 mb-4 drop-shadow-lg group-hover:scale-110 transition-transform" />
                <h2 className="text-xl font-bold text-mosala-green-700 mb-2">{s.title}</h2>
                <p className="text-mosala-dark-400 mb-4">{s.description}</p>
                <button className="mt-auto bg-gradient-to-r from-mosala-green-500 to-mosala-yellow-500 text-white font-semibold px-6 py-2 rounded-full shadow hover:from-mosala-green-600 hover:to-mosala-yellow-600 transition">Voir plus</button>
              </motion.div>
            ))}
          </div>
        )}
        {/* Trusted by section */}
        <div className="mt-16 flex flex-col items-center">
          <span className="uppercase text-xs text-mosala-dark-400 tracking-widest mb-4">Ils nous font confiance</span>
          <div className="flex gap-8 flex-wrap items-center justify-center">
            {partnerLogos.map((logo, i) => (
              <img key={i} src={logo} alt="Partenaire Mosala" className="h-12 w-auto grayscale hover:grayscale-0 transition-all drop-shadow-md" />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;""",
    "src/pages/Formations.tsx": """import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const formations = [
  {
    title: "Développement Web",
    description: "Maîtrisez les bases du web, du HTML/CSS à React et Node.js.",
    icon: "/lovable-uploads/services/formation.svg"
  },
  {
    title: "Soft Skills & Leadership",
    description: "Développez votre communication, votre confiance et votre leadership.",
    icon: "/lovable-uploads/services/softskills.svg"
  },
  {
    title: "Entrepreneuriat & Innovation",
    description: "Apprenez à lancer un projet, innover et trouver des financements.",
    icon: "/lovable-uploads/services/entrepreneur.svg"
  },
  {
    title: "Carrière & Emploi",
    description: "Optimisez votre CV, préparez vos entretiens, boostez votre carrière.",
    icon: "/lovable-uploads/services/career.svg"
  }
];

const partnerLogos = [
  "/lovable-uploads/partenaires/afd.jpeg",
  "/lovable-uploads/partenaires/ministere.jpeg",
  "/lovable-uploads/partenaires/ue.jpeg"
];

const Formations = () => {
  const [search, setSearch] = useState("");
  const filteredFormations = formations.filter(f =>
    f.title.toLowerCase().includes(search.toLowerCase()) ||
    f.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-mosala-green-50 via-mosala-yellow-50 to-mosala-dark-50 relative">
      <Navbar />
      {/* Hero/Header section */}
      <section className="relative w-full flex flex-col items-center justify-center min-h-[340px] md:min-h-[420px] py-12 mb-8 overflow-hidden">
        <img
          src="/lovable-uploads/carrousel/mosala2.jpeg"
          alt="Formations Mosala"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-40 blur-sm"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-mosala-green-700/80 via-mosala-yellow-500/40 to-mosala-dark-900/80 z-10" />
        <div className="relative z-20 flex flex-col items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-mosala-green-400 to-mosala-yellow-400 text-transparent bg-clip-text drop-shadow-lg mb-4">Formations</h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl">Développez vos compétences et réussissez votre avenir professionnel avec nos parcours certifiants et ateliers pratiques.</p>
          <button className="bg-gradient-to-r from-mosala-green-500 to-mosala-yellow-500 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:from-mosala-green-600 hover:to-mosala-yellow-600 transition-all text-lg">Voir le catalogue complet</button>
        </div>
      </section>
      {/* Sticky search & filters */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-mosala-green-100/40 py-4 px-4 flex flex-col md:flex-row items-center gap-4 mb-8 shadow-sm">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher une formation, une compétence..."
          className="w-full md:w-96 px-5 py-3 rounded-full border border-mosala-green-200 focus:border-mosala-green-500 focus:ring-2 focus:ring-mosala-green-100 text-mosala-dark-900 bg-white/90 dark:bg-gray-800/80 shadow-inner transition-all"
          aria-label="Rechercher une formation"
        />
        <div className="flex gap-2 flex-wrap">
          <button className="px-4 py-2 rounded-full bg-mosala-green-100 text-mosala-green-700 font-medium hover:bg-mosala-green-200 transition">Toutes</button>
          <button className="px-4 py-2 rounded-full bg-mosala-yellow-100 text-mosala-yellow-700 font-medium hover:bg-mosala-yellow-200 transition">Web</button>
          <button className="px-4 py-2 rounded-full bg-mosala-green-50 text-mosala-green-700 font-medium hover:bg-mosala-green-100 transition">Soft Skills</button>
          <button className="px-4 py-2 rounded-full bg-mosala-yellow-50 text-mosala-yellow-700 font-medium hover:bg-mosala-yellow-100 transition">Entrepreneuriat</button>
          <button className="px-4 py-2 rounded-full bg-mosala-green-50 text-mosala-green-700 font-medium hover:bg-mosala-green-100 transition">Carrière</button>
        </div>
      </div>
      {/* Formations grid or empty state */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {filteredFormations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <img src="/placeholder.svg" alt="Aucune formation" className="h-32 w-32 mb-6 opacity-60" />
            <h2 className="text-2xl font-bold text-mosala-green-700 mb-2">Aucune formation trouvée</h2>
            <p className="text-mosala-dark-400 mb-4">Essayez un autre mot-clé ou filtre.</p>
            <button className="bg-mosala-green-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-mosala-green-600 transition">Réinitialiser</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFormations.map((f, i) => (
              <motion.div
                key={f.title}
                className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-mosala-green-100 hover:scale-105 transition-transform duration-300 group"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                tabIndex={0}
                aria-label={f.title}
              >
                <img src={f.icon} alt="" className="h-16 w-16 mb-4 drop-shadow-lg group-hover:scale-110 transition-transform" />
                <h2 className="text-xl font-bold text-mosala-green-700 mb-2">{f.title}</h2>
                <p className="text-mosala-dark-400 mb-4">{f.description}</p>
                <button className="mt-auto bg-gradient-to-r from-mosala-green-500 to-mosala-yellow-500 text-white font-semibold px-6 py-2 rounded-full shadow hover:from-mosala-green-600 hover:to-mosala-yellow-600 transition">Voir plus</button>
              </motion.div>
            ))}
          </div>
        )}
        {/* Trusted by section */}
        <div className="mt-16 flex flex-col items-center">
          <span className="uppercase text-xs text-mosala-dark-400 tracking-widest mb-4">Ils nous font confiance</span>
          <div className="flex gap-8 flex-wrap items-center justify-center">
            {partnerLogos.map((logo, i) => (
              <img key={i} src={logo} alt="Partenaire Mosala" className="h-12 w-auto grayscale hover:grayscale-0 transition-all drop-shadow-md" />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Formations;""",
    "src/pages/Register.tsx": '''import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogIn, Loader2, CheckCircle, User, Briefcase, HelpCircle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Register = () => {
  // ... (code premium Register moderne, voir extrait validé) ...
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mosala-green-500/10 via-mosala-yellow-100/10 to-mosala-dark-900/10 relative overflow-hidden p-4">
      {/* ... (le reste du code Register premium, voir extrait validé) ... */}
    </div>
  );
};

export default Register;''',
    "src/pages/Home.tsx": '''import Navbar from "@/components/Navbar";
import Hero from "@/components/ui/Hero";
import Footer from "@/components/Footer";

const Home = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-mosala-green-50 via-mosala-yellow-50 to-mosala-dark-50">
    <Navbar />
    <main className="flex-1">
      <Hero />
      {/* Ajoute ici d'autres sections (ex: stats, témoignages, partenaires, etc.) */}
    </main>
    <Footer />
  </div>
);

export default Home;''',
    "src/pages/ServiceDetail.tsx": '''import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const service = {
  title: "Accompagnement personnalisé",
  description: "Coaching, orientation, suivi individuel pour booster votre carrière.",
  icon: "/lovable-uploads/services/coaching.svg",
  details: "Un accompagnement sur-mesure avec des experts Mosala pour définir votre projet professionnel, travailler votre CV, préparer vos entretiens et réussir votre insertion.",
  cta: "Contacter un conseiller"
};

const ServiceDetail = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-mosala-green-50 via-mosala-yellow-50 to-mosala-dark-50">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
      <section className="bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-xl p-10 flex flex-col items-center text-center border border-mosala-green-100">
        <img src={service.icon} alt="" className="h-20 w-20 mb-6 drop-shadow-lg" />
        <h1 className="text-3xl md:text-4xl font-bold text-mosala-green-700 mb-2">{service.title}</h1>
        <p className="text-lg text-mosala-dark-400 mb-4">{service.description}</p>
        <div className="text-base text-gray-700 dark:text-gray-200 mb-8">{service.details}</div>
        <Button className="bg-gradient-to-r from-mosala-green-500 to-mosala-yellow-500 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:from-mosala-green-600 hover:to-mosala-yellow-600 transition-all text-lg">{service.cta}</Button>
      </section>
    </main>
    <Footer />
  </div>
);

export default ServiceDetail;
''',
    "src/pages/FormationDetail.tsx": '''import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const formation = {
  title: "Développement Web",
  description: "Maîtrisez les bases du web, du HTML/CSS à React et Node.js.",
  icon: "/lovable-uploads/services/formation.svg",
  details: "Un parcours complet pour apprendre à créer des sites et applications web modernes, avec des projets pratiques et un accompagnement par des experts.",
  cta: "S'inscrire à la formation"
};

const FormationDetail = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-mosala-green-50 via-mosala-yellow-50 to-mosala-dark-50">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
      <section className="bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-xl p-10 flex flex-col items-center text-center border border-mosala-green-100">
        <img src={formation.icon} alt="" className="h-20 w-20 mb-6 drop-shadow-lg" />
        <h1 className="text-3xl md:text-4xl font-bold text-mosala-green-700 mb-2">{formation.title}</h1>
        <p className="text-lg text-mosala-dark-400 mb-4">{formation.description}</p>
        <div className="text-base text-gray-700 dark:text-gray-200 mb-8">{formation.details}</div>
        <Button className="bg-gradient-to-r from-mosala-green-500 to-mosala-yellow-500 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:from-mosala-green-600 hover:to-mosala-yellow-600 transition-all text-lg">{formation.cta}</Button>
      </section>
    </main>
    <Footer />
  </div>
);

export default FormationDetail;
''',
    "README.md": "# Mosala Job Platform\n\nLancez `npm install && npm run dev` pour démarrer.\n"
}

def create_structure():
    for folder in folders:
        os.makedirs(folder, exist_ok=True)
    for path, content in files.items():
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
    print("Structure Mosala générée avec succès !")

if __name__ == "__main__":
    create_structure() 