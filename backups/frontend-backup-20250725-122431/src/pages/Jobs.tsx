/*
  -----------------------------------------------------------------------------
  MOSALA UI PATTERN : UNIFICATION NAVBAR + HERO (PAGE JOBS)
  -----------------------------------------------------------------------------
  Ce fichier applique le modèle Mosala pour unifier l'arrière-plan de la navbar
  et du Hero (bannière en haut de page) :

  - Le background (couleur ou gradient) est appliqué sur le container principal
    (div parent), qui englobe la navbar et le Hero.
  - La Navbar est rendue en bg-transparent, sans bordure ni ombre basse.
  - La section Hero n'a pas de background propre : elle hérite du parent.
  - Résultat : la transition visuelle entre la navbar et le Hero est parfaitement
    fluide, sans coupure ni différence de couleur.

  Pattern recommandé pour toutes les pages Mosala avec Hero visuel.
  -----------------------------------------------------------------------------
*/
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Stats from "@/components/Stats";
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Star, ArrowRight, MapPin, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import 'swiper/css';
import 'swiper/css/pagination';
import MapComponent from "@/components/MapComponent";

const jobs = [
  {
    id: 1,
    title: "Spécialiste Marketing Digital",
    company: "Attest@ovem - Delftie",
    location: "Brazzaville",
    description: "Développez et exécutez des stratégies de marketing digital pour augmenter notre présence en ligne.",
    tags: ["CDI", "Marketing", "Temps plein"],
    salary: "1 000 000 - 2 500 000 FCFA",
    logo: "/topcenter-uploads/logo-mosala1.png",
    featured: true
  },
  {
    id: 2,
    title: "Développeur Full Stack",
    company: "Technologie - Brazzaville",
    location: "Brazzaville",
    description: "Nous recherchons un développeur Full Stack expérimenté pour rejoindre notre équipe dynamique à Brazzaville.",
    tags: ["CDI", "Tech", "Remote"],
    salary: "2 000 000 - 3 000 000 FCFA",
    logo: "/topcenter-uploads/logo-mosala1.png",
    featured: false
  },
  {
    id: 3,
    title: "Ingénieur DevOps",
    company: "Consultants - Patrice Mero",
    location: "Pointe-Noire",
    description: "Améliorez notre infrastructure cloud et nos processus de déploiement continu.",
    tags: ["CDI", "Tech", "Cloud"],
    salary: "3 000 000 - 4 000 000 FCFA",
    logo: "/topcenter-uploads/logo-mosala1.png",
    featured: true
  },
  {
    id: 4,
    title: "Chef de Projet Digital",
    company: "Innovations - Brazzaville",
    location: "Brazzaville",
    description: "Dirigez des projets digitaux innovants du concept à la livraison.",
    tags: ["CDD", "Digital", "Management"],
    salary: "3 500 000 - 4 500 000 FCFA",
    logo: "/topcenter-uploads/logo-mosala1.png",
    featured: false
  }
];

export default function Jobs() {
  const navbarRef = useRef<HTMLElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
    const handleResize = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f9fc]">
      <Navbar ref={navbarRef} className="bg-white/60 backdrop-blur-md border border-white/40 shadow-lg" />
      {/* Hero section Argon Material UI */}
      <section className="relative w-full flex flex-col md:flex-row items-center justify-between min-h-[320px] py-12 mb-8 overflow-hidden bg-[#ff7844]/10">
        {/* Fond animé glassmorphism + image de fond */}
        <style>{`
          @keyframes heroWind {
            0% { transform: translateY(0); }
            100% { transform: translateY(24px); }
          }
        `}</style>
        <motion.img
          src="/topcenter-uploads/avatars/hero/jobs-bg.png"
          alt="Emplois Mosala"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ filter: 'blur(8px) brightness(0.7)', opacity: 0.7, animation: 'heroWind 18s ease-in-out infinite alternate' }}
        />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-md z-10" />
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left px-4 mt-20 z-20">
          <span className="inline-block px-4 py-2 rounded-full bg-[#6476f3]/20 text-[#6476f3] font-bold uppercase tracking-widest mb-4">Emplois</span>
          <h1 className="text-4xl md:text-5xl font-black text-[#22304a] drop-shadow mb-4">Offres d'emploi Mosala</h1>
          <p className="text-lg md:text-xl text-[#22304a]/80 max-w-2xl leading-relaxed mb-6">
            Découvrez les meilleures opportunités professionnelles adaptées à votre profil.
          </p>
        </div>
      </section>
      {/* Barre de recherche et filtres Argon Material UI */}
      <div className="sticky top-0 z-20 bg-white/90 border-b border-[#ff7844]/20 py-4 px-4 shadow-sm">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row gap-4 items-center">
          <input type="text" placeholder="Rechercher un poste, une entreprise..." className="flex-1 px-4 py-3 border border-[#ff7844]/30 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff7844]/20 text-sm bg-white shadow" />
          <select className="px-4 py-3 border border-[#ff7844]/30 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#ff7844]/20 bg-white shadow">
            <option>Ville</option>
            <option>Brazzaville</option>
            <option>Pointe-Noire</option>
          </select>
          <select className="px-4 py-3 border border-[#ff7844]/30 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#ff7844]/20 bg-white shadow">
            <option>Type de contrat</option>
            <option>CDI</option>
            <option>CDD</option>
            <option>Stage</option>
          </select>
          <select className="px-4 py-3 border border-[#ff7844]/30 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#ff7844]/20 bg-white shadow">
            <option>Secteur</option>
            <option>Technologie</option>
            <option>Marketing</option>
            <option>Consulting</option>
          </select>
        </div>
      </div>
      {/* Grille de jobs Argon Material UI */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job, idx) => (
            <motion.div
              key={job.id}
              className="bg-white rounded-2xl shadow-lg border border-[#ff7844]/20 overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300 group backdrop-blur-md"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.05 }}
              tabIndex={0}
              aria-label={job.title}
            >
              <div className="flex items-center gap-4 p-6 pb-0">
                <img src={job.logo} alt="Logo entreprise" className="h-14 w-14 rounded-full border-2 border-[#ff7844]/20 shadow bg-white object-contain" />
                <div>
                  <h3 className="text-lg font-bold text-[#22304a] mb-1">{job.title}</h3>
                  <div className="text-sm text-[#22304a]/70">{job.company}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-6 mb-2 text-xs text-[#ff7844]/70">
                <MapPin className="h-4 w-4" /> {job.location}
              </div>
              <p className="text-[#22304a]/80 px-6 mb-4 text-sm line-clamp-3">{job.description}</p>
              <div className="flex flex-wrap gap-2 px-6 mb-4">
                {job.tags.map((tag, i) => (
                  <span key={i} className="bg-[#ff7844]/10 text-[#ff7844] text-xs px-3 py-1 rounded-full border border-[#ff7844]/20">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center w-full mt-auto pt-4 px-6 border-t border-[#ff7844]/10">
                <span className="font-bold text-[#22304a] text-lg">{job.salary}</span>
                <a href="#" className="flex items-center gap-1 px-5 py-2 rounded-xl font-semibold text-white shadow hover:scale-105 transition glassmorphism-cta"
                  style={{
                    background: 'rgba(255, 120, 68, 0.7)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: '#22304a'
                  }}
                >
                  Voir l'offre <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              {job.featured && (
                <span className="absolute top-4 right-4 bg-[#2fdab8] text-white text-xs font-bold px-3 py-1 rounded-full shadow">En vedette</span>
              )}
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}