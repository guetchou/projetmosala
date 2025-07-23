import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, BookOpen, Clock, Users, Star, MapPin, Calendar, ArrowRight, GraduationCap, Briefcase, Globe, Award, ChevronRight, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MapComponent from "@/components/MapComponent";

const images = [
  // Images libres d'accès, jeunes africains, ambiance Mosala
  "/topcenter-uploads/formation/wedeveloppement.jpg", // Jeune homme souriant
  "https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg?auto=compress&w=800&q=80", // Groupe de jeunes
  "/topcenter-uploads/formation/entrepreneuriatdigital.png",  // Jeune femme avec ordi
  "/topcenter-uploads/formation/marketing_digital.jpg",  // Équipe de travail
  "/topcenter-uploads/formation/soft-skills.jpg",  // Réunion d'affaires
  "/topcenter-uploads/formation/Gestionprojet1.png"   // Formation en groupe
];

const formations = [
  {
    id: "F001",
    title: "Développement Web Avancé",
    description: "Programme certifiant de 12 semaines couvrant les technologies modernes du web.",
    category: "Technologie",
    duration: "12 semaines",
    level: "Avancé",
    certification: true,
    image: images[0],
    badgeColor: "bg-[var(--color-mosala-green-100)] text-[var(--color-mosala-green-700)]",
    modalite: "En ligne",
    publicCible: "Développeurs",
    prix: "Gratuit",
    places: 25,
    satisfaction: 4.8
  },
  {
    id: "F002",
    title: "Leadership & Management",
    description: "Formation intensive pour managers et futurs leaders en entreprise.",
    category: "Management",
    duration: "8 semaines",
    level: "Intermédiaire",
    certification: true,
    image: images[1],
    badgeColor: "bg-[var(--color-mosala-yellow-100)] text-[var(--color-mosala-yellow-700)]",
    modalite: "Présentiel",
    publicCible: "Managers",
    prix: "Gratuit",
    places: 20,
    satisfaction: 4.9
  },
  {
    id: "F003",
    title: "Entrepreneuriat Digital",
    description: "Acquérez les compétences clés pour lancer et gérer une entreprise digitale.",
    category: "Entrepreneuriat",
    duration: "10 semaines",
    level: "Débutant",
    certification: true,
    image: images[2],
    badgeColor: "bg-[var(--color-mosala-orange-100)] text-[var(--color-mosala-orange-700)]",
    modalite: "Hybride",
    publicCible: "Entrepreneurs",
    prix: "Gratuit",
    places: 30,
    satisfaction: 4.7
  },
  {
    id: "F004",
    title: "Marketing Digital",
    description: "Maîtrisez les outils et stratégies du marketing digital pour booster votre business.",
    category: "Marketing",
    duration: "6 semaines",
    level: "Tous niveaux",
    certification: true,
    image: images[3],
    badgeColor: "bg-[var(--color-mosala-green-100)] text-[var(--color-mosala-green-700)]",
    modalite: "En ligne",
    publicCible: "Marketers",
    prix: "Gratuit",
    places: 35,
    satisfaction: 4.6
  },
  {
    id: "F005",
    title: "Communication Professionnelle",
    description: "Développez vos compétences en communication écrite et orale en milieu professionnel.",
    category: "Soft Skills",
    duration: "4 semaines",
    level: "Tous niveaux",
    certification: false,
    image: images[4],
    badgeColor: "bg-[var(--color-mosala-yellow-100)] text-[var(--color-mosala-yellow-700)]",
    modalite: "Présentiel",
    publicCible: "Tous publics",
    prix: "Gratuit",
    places: 40,
    satisfaction: 4.5
  },
  {
    id: "F006",
    title: "Gestion de Projet",
    description: "Apprenez à planifier, organiser et gérer efficacement vos projets professionnels.",
    category: "Management",
    duration: "8 semaines",
    level: "Intermédiaire",
    certification: true,
    image: images[5],
    badgeColor: "bg-[var(--color-mosala-orange-100)] text-[var(--color-mosala-orange-700)]",
    modalite: "Hybride",
    publicCible: "Chefs de projet",
    prix: "Gratuit",
    places: 25,
    satisfaction: 4.8
  }
];

const categories = ["Toutes", "Technologie", "Management", "Entrepreneuriat", "Marketing", "Soft Skills"];
const modalites = ["Toutes", "En ligne", "Présentiel", "Hybride"];
const niveaux = ["Tous niveaux", "Débutant", "Intermédiaire", "Avancé"];

const Formations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [selectedModalite, setSelectedModalite] = useState("Toutes");
  const [selectedNiveau, setSelectedNiveau] = useState("Tous niveaux");

  const filteredFormations = formations.filter(formation => {
    const matchesSearch = formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         formation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Toutes" || formation.category === selectedCategory;
    const matchesModalite = selectedModalite === "Toutes" || formation.modalite === selectedModalite;
    const matchesNiveau = selectedNiveau === "Tous niveaux" || formation.level === selectedNiveau;
    
    return matchesSearch && matchesCategory && matchesModalite && matchesNiveau;
  });

  const handleInscription = (formationId) => {
    // TODO: Implémenter la logique d'inscription
    console.log(`Inscription à la formation ${formationId}`);
    // Ici on pourrait ouvrir un modal ou rediriger vers un formulaire
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f9fc] relative">
      <Navbar />
      {/* Hero/Header section Argon Material UI */}
      <section className="relative w-full flex flex-col md:flex-row items-center justify-between min-h-[340px] md:min-h-[420px] py-12 mb-8 overflow-hidden bg-[#6476f3]/10">
        {/* Fond animé glassmorphism */}
        <style>{`
          @keyframes heroWind {
            0% { transform: translateY(0); }
            100% { transform: translateY(24px); }
          }
        `}</style>
        <motion.img
          src="/topcenter-uploads/carrousel/mosala-jeunes1.png"
          alt="Formations Mosala"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ filter: 'blur(10px) brightness(0.7)', opacity: 87, animation: 'heroWind 18s ease-in-out infinite alternate' }}
        />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-md z-10" />
        {/* Contenu éditorial */}
        <div className="relative z-20 flex-1 flex flex-col items-center md:items-start text-center md:text-left px-4 mt-20">
          <span className="inline-block px-4 py-2 rounded-full bg-[#6476f3]/20 text-[#6476f3] font-bold uppercase tracking-widest mb-4">Formations</span>
          <h1 className="text-4xl md:text-5xl font-black text-[#22304a] drop-shadow mb-4">Nos Formations</h1>
          <p className="text-lg md:text-xl text-[#22304a]/80 max-w-2xl leading-relaxed mb-6">
            Découvrez toutes les formations proposées par Mosala pour booster vos compétences et votre employabilité.
          </p>
          <button className="bg-white/70 backdrop-blur-md border border-[#6476f3]/30 text-[#6476f3] font-bold px-8 py-3 rounded-xl shadow-lg hover:bg-[#6476f3]/10 hover:text-[#22304a] transition-all text-lg glassmorphism-cta">
            Voir le catalogue complet
          </button>
        </div>
        
      </section>

      {/* Barre de recherche et filtres Argon Material UI */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#2fdab8]/20 py-4 px-4 shadow-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Barre de recherche */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6476f3]" size={20} />
              <input
                type="text"
                placeholder="Rechercher une formation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-[#6476f3]/30 focus:border-[#6476f3] focus:ring-2 focus:ring-[#6476f3]/20 outline-none text-[#22304a] bg-white/90 shadow"
              />
            </div>
            {/* Filtres */}
            <div className="flex gap-2 flex-wrap">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-full border border-[#2fdab8]/30 bg-white text-[#22304a] focus:border-[#2fdab8] outline-none shadow"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={selectedModalite}
                onChange={(e) => setSelectedModalite(e.target.value)}
                className="px-4 py-2 rounded-full border border-[#2fdab8]/30 bg-white text-[#22304a] focus:border-[#2fdab8] outline-none shadow"
              >
                {modalites.map(mod => (
                  <option key={mod} value={mod}>{mod}</option>
                ))}
              </select>
              <select
                value={selectedNiveau}
                onChange={(e) => setSelectedNiveau(e.target.value)}
                className="px-4 py-2 rounded-full border border-[#2fdab8]/30 bg-white text-[#22304a] focus:border-[#2fdab8] outline-none shadow"
              >
                {niveaux.map(niv => (
                  <option key={niv} value={niv}>{niv}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grille des formations Argon Material UI */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {filteredFormations.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="mx-auto h-16 w-16 text-[#6476f3] mb-4" />
            <h2 className="text-2xl font-bold text-[#22304a] mb-2">Aucune formation trouvée</h2>
            <p className="text-[#6476f3]/70 mb-6">Essayez de modifier vos critères de recherche.</p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("Toutes");
                setSelectedModalite("Toutes");
                setSelectedNiveau("Tous niveaux");
              }}
              className="bg-[#2fdab8] text-white px-6 py-2 rounded-full font-medium hover:bg-[#1cc7d0] transition"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-[#22304a]/80">
                {filteredFormations.length} formation{filteredFormations.length > 1 ? 's' : ''} trouvée{filteredFormations.length > 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFormations.map((formation, index) => (
                <motion.div
                  key={formation.id}
                  className="bg-white rounded-2xl shadow-lg border border-[#2fdab8]/20 overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300 group backdrop-blur-md"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                  tabIndex={0}
                  aria-label={formation.title}
                >
                  <div className="relative">
                    <img src={formation.image} alt="Jeune en formation" className="w-full h-44 object-cover object-center" />
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 rounded-full px-2 py-1">
                      <Star className="w-4 h-4 text-[#fa496e] fill-current" />
                      <span className="text-xs font-semibold text-[#22304a]">{formation.satisfaction}</span>
                    </div>
                    {formation.certification && (
                      <div className="absolute top-3 left-3 bg-[#2fdab8] text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Certifiante
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="inline-block bg-[#6476f3]/10 text-[#6476f3] rounded-full px-3 py-1 text-xs font-semibold mb-2">{formation.category}</span>
                    <h3 className="text-xl font-bold text-[#22304a] mb-2">{formation.title}</h3>
                    <p className="text-[#6476f3]/80 mb-4 flex-1">{formation.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-[#2fdab8]/10 text-[#2fdab8] text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {formation.duration}
                      </span>
                      <span className="bg-[#ff7844]/10 text-[#ff7844] text-xs px-2 py-1 rounded-full">
                        {formation.level}
                      </span>
                      <span className="bg-[#fa496e]/10 text-[#fa496e] text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {formation.modalite}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-[#22304a]/70">
                        {formation.places} places disponibles
                      </span>
                      <span className="text-lg font-bold text-[#2fdab8]">
                        {formation.prix}
                      </span>
                    </div>
                    <button
                      onClick={() => handleInscription(formation.id)}
                      className="mt-auto inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow hover:scale-105 transition glassmorphism-cta"
                      style={{
                        background: 'rgba(100, 118, 243, 0.7)',
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        color: '#22304a'
                      }}
                    >
                      S'inscrire <ArrowRight className="w-5 h-5 ml-1" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Formations;