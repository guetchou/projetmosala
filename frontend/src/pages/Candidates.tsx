import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Briefcase, Award, Users } from "lucide-react";

const candidates = [
  {
    name: "Bertille NGUIE",
    job: "Développeuse Web",
    skills: ["React", "Node.js", "UI/UX"],
    avatar: "/topcenter-uploads/avatars/bertille.png",
    color: "#6476f3",
    bg: "bg-[#6476f3]/10"
  },
  {
    name: "Jean-Pierre KIBANGOU",
    job: "Chef de projet",
    skills: ["Gestion d'équipe", "Agile", "Scrum"],
    avatar: "/topcenter-uploads/avatars/jeanpierre.png",
    color: "#2fdab8",
    bg: "bg-[#2fdab8]/10"
  },
  {
    name: "Béatrice YAMBA",
    job: "Formatrice Digital",
    skills: ["Marketing", "Pédagogie", "SEO"],
    avatar: "/topcenter-uploads/avatars/beatrice.png",
    color: "#fa496e",
    bg: "bg-[#fa496e]/10"
  },
  {
    name: "David ITOBA",
    job: "Designer UI/UX",
    skills: ["Figma", "Design system", "Accessibilité"],
    avatar: "/topcenter-uploads/avatars/david.png",
    color: "#ff7844",
    bg: "bg-[#ff7844]/10"
  },
  {
    name: "Marie-Claire ANGALA",
    job: "Consultante RH",
    skills: ["Recrutement", "Coaching", "Soft skills"],
    avatar: "/topcenter-uploads/avatars/marieclaire.png",
    color: "#1cc7d0",
    bg: "bg-[#1cc7d0]/10"
  }
];

const Candidates = () => (
  <div className="min-h-screen flex flex-col bg-[#f6f9fc]">
    <Navbar />
    {/* Hero section Argon Material UI */}
    <section className="relative w-full flex flex-col md:flex-row items-center justify-between min-h-[320px] py-12 mb-8 overflow-hidden bg-[#fa496e]/10">
      {/* Fond animé glassmorphism + image de fond */}
      <style>{`
        @keyframes heroWind {
          0% { transform: translateY(0); }
          100% { transform: translateY(24px); }
        }
      `}</style>
      <motion.img
        src="/topcenter-uploads/avatars/hero/candidates-bg.png"
        alt="Candidats Mosala"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'blur(8px) brightness(0.7)', opacity: 0.7, animation: 'heroWind 18s ease-in-out infinite alternate' }}
      />
      <div className="absolute inset-0 bg-white/60 backdrop-blur-md z-10" />
      {/* Contenu éditorial */}
      <div className="relative z-20 flex-1 flex flex-col items-center md:items-start text-center md:text-left px-4 mt-20">
        <span className="inline-block px-4 py-2 rounded-full bg-[#6476f3]/20 text-[#6476f3] font-bold uppercase tracking-widest mb-4">Annuaire</span>
        <h1 className="text-4xl md:text-5xl font-black text-[#22304a] drop-shadow mb-4">Annuaire des candidats</h1>
        <p className="text-lg md:text-xl text-[#22304a]/80 max-w-2xl leading-relaxed mb-6">
          Découvrez les profils des candidats inscrits sur Mosala, leurs compétences et leurs parcours professionnels.
        </p>
      </div>
    </section>
    {/* Grille de candidats Argon Material UI */}
    <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {candidates.map((c, idx) => (
          <motion.div
            key={idx}
            className={`bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition hover:scale-105 hover:shadow-2xl ${c.bg}`}
            style={{ color: c.color }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <img src={c.avatar} alt={c.name} className="w-20 h-20 rounded-full mb-4 border-4 border-white shadow" />
            <h3 className="font-bold text-lg text-[#22304a] mb-1">{c.name}</h3>
            <div className="text-sm text-[#22304a]/70 mb-2 flex items-center justify-center gap-2"><Briefcase className="w-4 h-4" />{c.job}</div>
            <div className="flex flex-wrap gap-2 justify-center mb-2">
              {c.skills.map((skill, i) => (
                <span key={i} className="bg-[#6476f3]/10 text-[#6476f3] px-3 py-1 rounded-full text-xs font-semibold">{skill}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default Candidates; 