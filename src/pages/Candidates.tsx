import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Search, Filter, X, User, ChevronRight, Briefcase, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCandidates } from "@/hooks/useCandidates";
import Loader from "@/components/ui/Loader";
import { Candidate } from "@/types/entities";

const PARTNER_INSTITUTIONS = [
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

const PROFESSIONS = ["Toutes", "Développeur", "Designer", "Chef de projet", "Marketing", "RH"];
const CITIES = ["Toutes", "Brazzaville", "Pointe-Noire", "Dolisie", "Franceville"];

const Candidates = () => {
  const { data: candidates = [], isLoading, isError } = useCandidates();
  const [search, setSearch] = useState("");
  const [profession, setProfession] = useState("Toutes");
  const [city, setCity] = useState("Toutes");
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("mosala-candidates-favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    localStorage.setItem("mosala-candidates-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const resetFilters = () => {
    setProfession("Toutes");
    setCity("Toutes");
    setSearch("");
    setShowFilters(false);
  };

  const filteredCandidates = candidates.filter((c: Candidate) => {
    const matchProfession = profession === "Toutes" || c.profession === profession;
    const matchCity = city === "Toutes" || c.city === city;
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.profession.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase());
    return matchProfession && matchCity && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[var(--color-mosala-green-50)] via-[var(--color-mosala-yellow-50)] to-[var(--color-mosala-dark-50)] font-sans">
      <Navbar />
      {/* Hero Section Institutionnelle Mosala douce */}
      <section className="relative bg-gradient-to-r from-[var(--color-mosala-green-50)] via-[var(--color-mosala-yellow-50)] to-[var(--color-mosala-dark-50)] text-[var(--color-mosala-dark-900)] py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[var(--color-mosala-green-700)] to-[var(--color-mosala-yellow-700)] text-transparent bg-clip-text drop-shadow-lg"
            >
              Annuaire des Talents Professionnels
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-[var(--color-mosala-dark-700)]"
            >
              Découvrez notre base de données de candidats qualifiés, prêts à contribuer à votre entreprise.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Barre de recherche et filtres */}
      <div className="sticky top-0 z-10 bg-white/90 shadow-sm py-4 border-b border-[var(--color-mosala-green-100)] backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow max-w-2xl">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un candidat..."
                className="w-full px-5 py-3 border border-[var(--color-mosala-green-200)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-mosala-green-100)] focus:border-[var(--color-mosala-green-500)] bg-white/90 text-[var(--color-mosala-dark-900)] shadow-inner transition-all"
              />
              <Search className="absolute right-3 top-3.5 text-[var(--color-mosala-green-300)]" size={20} />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-mosala-green-200)] bg-[var(--color-mosala-green-50)] text-[var(--color-mosala-green-700)] hover:bg-[var(--color-mosala-green-100)] transition font-medium"
              >
                <Filter className="w-4 h-4" />
                <span>Filtres</span>
              </button>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-full bg-[var(--color-mosala-yellow-50)] text-[var(--color-mosala-yellow-700)] hover:bg-[var(--color-mosala-yellow-100)] transition flex items-center gap-2 font-medium border border-[var(--color-mosala-yellow-100)]"
              >
                <X className="w-4 h-4" />
                <span>Réinitialiser</span>
              </button>
            </div>
          </div>
          {/* Filtres avancés */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
                  <div>
                    <label htmlFor="profession-filter" className="block text-sm font-medium text-[var(--color-mosala-dark-700)] mb-1">
                      Profession
                    </label>
                    <select
                      id="profession-filter"
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      className="w-full px-4 py-2 border border-[var(--color-mosala-green-200)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-mosala-green-100)] focus:border-[var(--color-mosala-green-500)] bg-white/90 text-[var(--color-mosala-dark-900)] shadow-inner transition-all"
                    >
                      {PROFESSIONS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="city-filter" className="block text-sm font-medium text-[var(--color-mosala-dark-700)] mb-1">
                      Ville
                    </label>
                    <select
                      id="city-filter"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2 border border-[var(--color-mosala-green-200)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-mosala-green-100)] focus:border-[var(--color-mosala-green-500)] bg-white/90 text-[var(--color-mosala-dark-900)] shadow-inner transition-all"
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Contenu Principal */}
      <main className="flex-1 container mx-auto px-6 py-12">
        {isLoading && <Loader label="Chargement des candidats..." className="my-24" />}

        {isError && (
          <div className="text-center py-24">
            <div className="bg-red-50 text-red-600 inline-flex px-6 py-3 rounded-sm">
              Erreur lors du chargement des candidats. Veuillez réessayer.
            </div>
          </div>
        )}

        {filteredCandidates.length === 0 && !isLoading && !isError ? (
          <div className="text-center py-20">
            <Search className="mx-auto h-12 w-12 text-[var(--color-mosala-green-300)] mb-4" />
            <h2 className="text-2xl font-bold text-[var(--color-mosala-dark-700)] mb-2">Aucun candidat trouvé</h2>
            <p className="text-[var(--color-mosala-dark-400)] mb-6">Veuillez modifier vos critères de recherche.</p>
            <button 
              onClick={resetFilters}
              className="bg-[var(--color-mosala-green-500)] text-[var(--color-mosala-white)] px-6 py-2 rounded-full font-medium hover:bg-[var(--color-mosala-green-600)] transition"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCandidates.map((candidate, index) => (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-[var(--color-mosala-green-100)] rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className="bg-[var(--color-mosala-green-50)] p-3 rounded-full mr-4 border border-[var(--color-mosala-green-100)]">
                          <User className="h-6 w-6 text-[var(--color-mosala-green-400)]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[var(--color-mosala-green-700)]">{candidate.name}</h3>
                          <div className="flex items-center text-[var(--color-mosala-dark-400)] text-sm">
                            <Briefcase className="h-4 w-4 mr-1" />
                            {candidate.profession}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFavorite(candidate.id)}
                        className={`p-2 rounded-full ${favorites.includes(candidate.id) ? 'text-[var(--color-mosala-yellow-500)]' : 'text-[var(--color-mosala-green-200)] hover:text-[var(--color-mosala-green-400)]'} transition`}
                        aria-label={favorites.includes(candidate.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                      >
                        <Star className={`h-5 w-5 ${favorites.includes(candidate.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="flex items-center text-[var(--color-mosala-dark-400)] text-sm mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      {candidate.city}
                    </div>

                    <div className="border-t border-[var(--color-mosala-green-100)] pt-4">
                      <button className="w-full bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] hover:from-[var(--color-mosala-green-600)] hover:to-[var(--color-mosala-yellow-600)] text-[var(--color-mosala-white)] py-2 rounded-full font-medium transition flex items-center justify-center gap-2">
                        Voir le profil <ChevronRight size={18} />
                      </button>
                    </div>
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
                {PARTNER_INSTITUTIONS.map((partner, index) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center"
                  >
                    <div className="bg-white p-4 rounded-sm shadow-sm border border-gray-200">
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

export default Candidates;