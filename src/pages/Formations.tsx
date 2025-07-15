import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Users, Briefcase, Award, ChevronRight, CheckCircle } from "lucide-react";

const formations = [
  {
    id: "F001",
    title: "Développement Web Avancé",
    description: "Programme certifiant de 12 semaines couvrant les technologies modernes du web.",
    category: "Technologie",
    duration: "12 semaines",
    level: "Avancé",
    certification: true,
    color: "bg-[#00A651]"
  },
  {
    id: "F002",
    title: "Leadership & Management",
    description: "Formation intensive pour managers et futurs leaders en entreprise.",
    category: "Management",
    duration: "8 semaines",
    level: "Intermédiaire",
    certification: true,
    color: "bg-[#FFD700]"
  },
  {
    id: "F003",
    title: "Entrepreneuriat Digital",
    description: "Acquérez les compétences clés pour lancer et gérer une entreprise digitale.",
    category: "Entrepreneuriat",
    duration: "10 semaines",
    level: "Débutant",
    certification: true,
    color: "bg-[#FFA500]"
  },
  {
    id: "F004",
    title: "Communication Professionnelle",
    description: "Maîtrisez les techniques de communication écrite et orale en milieu professionnel.",
    category: "Soft Skills",
    duration: "6 semaines",
    level: "Tous niveaux",
    certification: false,
    color: "bg-[#ED1C24]"
  }
];

const partnerInstitutions = [
  {
    name: "Ministère de la Jeunesse",
    logo: "/lovable-uploads/partenaires/ministere.jpeg"
  },
  {
    name: "Agence Française de Développement",
    logo: "/lovable-uploads/partenaires/afd.jpeg"
  },
  {
    name: "Union Européenne",
    logo: "/lovable-uploads/partenaires/ue.jpeg"
  }
];

const Formations = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes");

  const categories = ["Toutes", "Technologie", "Management", "Entrepreneuriat", "Soft Skills"];

  const filteredFormations = formations.filter(f => {
    const matchesSearch = f.title.toLowerCase().includes(search.toLowerCase()) || 
                         f.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "Toutes" || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />
      
      {/* Hero Section avec dégradé Mosala */}
      <section className="relative bg-gradient-to-r from-[#00A651] to-[#ED1C24] text-white py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6 font-[Poppins]"
            >
              Formations Professionnelles Certifiantes
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            >
              Développez vos compétences avec nos programmes élaborés en partenariat avec les institutions nationales et internationales.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="bg-white text-[#00A651] px-8 py-3 font-semibold rounded-full hover:bg-gray-100 transition duration-300 shadow-md">
                Voir le catalogue
              </button>
              <button className="border-2 border-white text-white px-8 py-3 font-semibold rounded-full hover:bg-white hover:text-[#ED1C24] transition duration-300">
                Contactez nos conseillers
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Barre de recherche et filtres */}
      <div className="sticky top-0 z-10 bg-white shadow-sm py-4 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow max-w-2xl">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une formation..."
                className="w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00A651] focus:border-[#00A651]"
              />
              <BookOpen className="absolute right-3 top-3.5 text-gray-400" size={20} />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    selectedCategory === category
                      ? "bg-[#00A651] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contenu Principal */}
      <main className="flex-1 container mx-auto px-6 py-12">
        {filteredFormations.length === 0 ? (
          <div className="text-center py-20">
            <Users className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Aucune formation trouvée</h2>
            <p className="text-gray-500 mb-6">Veuillez modifier vos critères de recherche.</p>
            <button 
              onClick={() => {
                setSearch("");
                setSelectedCategory("Toutes");
              }}
              className="bg-[#00A651] text-white px-6 py-2 rounded-full font-medium hover:bg-[#008744] transition"
            >
              Réinitialiser
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFormations.map((formation, index) => (
                <motion.div
                  key={formation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`h-2 ${formation.color}`}></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{formation.title}</h3>
                      {formation.certification && (
                        <CheckCircle className="h-6 w-6 text-[#00A651]" />
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{formation.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                        {formation.category}
                      </span>
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                        {formation.duration}
                      </span>
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                        {formation.level}
                      </span>
                    </div>
                    
                    <button className={`w-full ${formation.color} hover:opacity-90 text-white py-2 rounded-full font-medium transition flex items-center justify-center gap-2`}>
                      En savoir plus <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Section Partenaires Institutionnels */}
            <section className="mt-20 pt-12 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                En partenariat avec des institutions reconnues
              </h2>
              <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {partnerInstitutions.map((partner, index) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center"
                  >
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <img 
                        src={partner.logo} 
                        alt={partner.name} 
                        className="h-16 object-contain grayscale hover:grayscale-0 transition"
                      />
                    </div>
                    <span className="mt-2 text-sm text-gray-500">{partner.name}</span>
                  </motion.div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Formations;