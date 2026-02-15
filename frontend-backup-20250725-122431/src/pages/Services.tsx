import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Briefcase, Users, Award, Globe, BookOpen, Heart } from "lucide-react";

const services = [
  {
    title: "Accompagnement professionnel",
    description: "Coaching, orientation, et suivi personnalisé pour chaque jeune.",
    icon: <Briefcase className="w-8 h-8" />, color: "#2fdab8", bg: "bg-[#2fdab8]/10"
  },
  {
    title: "Formations certifiantes",
    description: "Des parcours de formation adaptés au marché et aux besoins locaux.",
    icon: <BookOpen className="w-8 h-8" />, color: "#6476f3", bg: "bg-[#6476f3]/10"
  },
  {
    title: "Mise en relation avec les entreprises",
    description: "Un réseau de 500+ entreprises partenaires pour booster l’emploi.",
    icon: <Users className="w-8 h-8" />, color: "#fa496e", bg: "bg-[#fa496e]/10"
  },
  {
    title: "Caravane Mosala",
    description: "Des actions de proximité dans 6 villes du Congo pour sensibiliser et accompagner la jeunesse.",
    icon: <Globe className="w-8 h-8" />, color: "#ff7844", bg: "bg-[#ff7844]/10"
  },
  {
    title: "Valorisation des talents",
    description: "Concours, certifications, et événements pour révéler les potentiels.",
    icon: <Award className="w-8 h-8" />, color: "#1cc7d0", bg: "bg-[#1cc7d0]/10"
  },
  {
    title: "Engagement social",
    description: "Mosala agit pour l’inclusion, la diversité et l’impact social durable.",
    icon: <Heart className="w-8 h-8" />, color: "#6476f3", bg: "bg-[#6476f3]/10"
  }
];

const Services = () => (
  <div className="min-h-screen flex flex-col bg-[#f6f9fc]">
    <Navbar />
    {/* Hero section Argon Material UI */}
    <section className="relative w-full flex flex-col md:flex-row items-center justify-between min-h-[320px] py-12 mb-8 overflow-hidden bg-[#1cc7d0]/10">
      {/* Fond animé glassmorphism */}
      <style>{`
        @keyframes heroWind {
          0% { transform: translateY(0); }
          100% { transform: translateY(24px); }
        }
      `}</style>
      <motion.img
        src="/topcenter-uploads/services/services.png"
        alt="Services Mosala"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'blur(10px) brightness(0.7)', opacity: 87, animation: 'heroWind 18s ease-in-out infinite alternate' }}
      />
      <div className="absolute inset-0 bg-white/60 backdrop-blur-md z-10" />
      {/* Contenu éditorial */}
      <div className="relative z-20 flex-1 flex flex-col items-center md:items-start text-center md:text-left px-4 mt-20">
        <span className="inline-block px-4 py-2 rounded-full bg-[#6476f3]/20 text-[#6476f3] font-bold uppercase tracking-widest mb-4">Services Mosala</span>
        <h1 className="text-4xl md:text-5xl font-black text-[#22304a] drop-shadow mb-4">Nos Services</h1>
        <p className="text-lg md:text-xl text-[#22304a]/80 max-w-2xl leading-relaxed mb-6">
          Découvrez tous les services proposés par le projet Mosala pour accompagner la jeunesse congolaise vers l’emploi et la réussite.
        </p>
      </div>
    </section>
    {/* Grille de services Argon Material UI */}
    <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            className={`bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition hover:scale-105 hover:shadow-2xl ${service.bg}`}
            style={{ color: service.color }}
            initial={{ opacity: 87, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-4 p-4 rounded-full bg-white shadow" style={{ color: service.color }}>
              {service.icon}
            </div>
            <h3 className="font-bold text-lg text-[#22304a] mb-2">{service.title}</h3>
            <p className="text-gray-700">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default Services; 