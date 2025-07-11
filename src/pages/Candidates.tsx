import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles, User, Search, Filter, X, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCandidates } from "@/hooks/useCandidates";
import Loader from "@/components/ui/Loader";
import { Candidate } from "@/types/entities";
import { cn } from "@/lib/utils";

const PARTNER_LOGOS = [
  "/lovable-uploads/partenaires/afd.jpeg",
  "/lovable-uploads/partenaires/ministere.jpeg",
  "/lovable-uploads/partenaires/ue.jpeg"
];

const PREMIUM_BADGES = [
  { id: "1", label: "Nouveau", color: "bg-gradient-to-r from-mosala-green-400 to-mosala-yellow-300" },
  { id: "3", label: "Populaire", color: "bg-gradient-to-r from-mosala-orange-400 to-mosala-yellow-300" }
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

  // Persist favorites to localStorage
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-mosala-green-50/50 via-mosala-yellow-50/30 to-mosala-dark-50/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] opacity-40 animate-blob-move-slow">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-mosala-green-400 to-mosala-yellow-300 blur-3xl" />
        </div>
        <div className="absolute -bottom-32 -right-32 w-[340px] h-[340px] opacity-30 animate-blob-move-slow-reverse">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-mosala-yellow-400 to-mosala-orange-300 blur-3xl" />
        </div>
      </div>

      <Navbar />

      {/* Hero section */}
      <section className="relative w-full py-16 md:py-24 mb-8 z-10">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-mosala-green-600 to-mosala-yellow-500 text-transparent bg-clip-text mb-6"
          >
            Trouvez les meilleurs talents
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-mosala-dark-600 dark:text-mosala-dark-300 mb-8 max-w-2xl mx-auto"
          >
            Découvrez notre annuaire de candidats qualifiés et trouvez le profil idéal pour vos besoins.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-mosala-green-500 to-mosala-yellow-400 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-lg relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Publier mon profil
            </span>
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </div>
      </section>

      {/* Search & filters */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-mosala-green-100/40 py-4 px-4 shadow-sm">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mosala-dark-300" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un candidat, un métier, une ville..."
              className="w-full pl-12 pr-5 py-3 rounded-full border border-mosala-green-200 focus:border-mosala-green-500 focus:ring-2 focus:ring-mosala-green-100 text-mosala-dark-900 dark:text-white bg-white/90 dark:bg-gray-800/80 shadow-inner transition-all"
              aria-label="Rechercher un candidat"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-mosala-green-200 bg-white/90 dark:bg-gray-800/80 text-mosala-green-700 dark:text-mosala-green-300 hover:bg-mosala-green-50 dark:hover:bg-gray-700 transition"
            >
              <Filter className="w-4 h-4" />
              <span>Filtres</span>
            </button>

            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-full bg-mosala-green-100 dark:bg-gray-700 text-mosala-green-700 dark:text-mosala-green-300 font-medium hover:bg-mosala-green-200 dark:hover:bg-gray-600 transition flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              <span>Réinitialiser</span>
            </button>
          </div>
        </div>

        {/* Mobile filters dropdown */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4"
            >
              <div className="grid grid-cols-2 gap-4 pb-2">
                <div>
                  <label htmlFor="profession-filter" className="block text-sm font-medium text-mosala-dark-500 mb-1">
                    Métier
                  </label>
                  <select
                    id="profession-filter"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="w-full px-4 py-2 rounded-full border border-mosala-green-200 bg-white/90 dark:bg-gray-800/80 text-mosala-green-700 dark:text-mosala-green-300 focus:border-mosala-green-500 focus:ring-2 focus:ring-mosala-green-100"
                  >
                    {PROFESSIONS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="city-filter" className="block text-sm font-medium text-mosala-dark-500 mb-1">
                    Ville
                  </label>
                  <select
                    id="city-filter"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2 rounded-full border border-mosala-green-200 bg-white/90 dark:bg-gray-800/80 text-mosala-green-700 dark:text-mosala-green-300 focus:border-mosala-green-500 focus:ring-2 focus:ring-mosala-green-100"
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

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {isLoading && <Loader label="Chargement des candidats..." className="my-24" />}

        {isError && (
          <div className="text-center py-24">
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 inline-flex px-6 py-3 rounded-lg">
              Erreur lors du chargement des candidats. Veuillez réessayer.
            </div>
          </div>
        )}

        {filteredCandidates.length === 0 && !isLoading && !isError ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-24"
          >
            <div className="bg-mosala-green-100 dark:bg-gray-800 rounded-full p-6 mb-6">
              <Search className="h-12 w-12 text-mosala-green-600 dark:text-mosala-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-mosala-green-700 dark:text-mosala-green-400 mb-2">
              Aucun candidat trouvé
            </h2>
            <p className="text-mosala-dark-400 dark:text-mosala-dark-300 mb-6">
              Essayez de modifier vos critères de recherche
            </p>
            <button
              onClick={resetFilters}
              className="bg-mosala-green-500 hover:bg-mosala-green-600 text-white px-6 py-2 rounded-full font-semibold shadow transition flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Réinitialiser les filtres
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredCandidates.map((c: Candidate, i: number) => {
                const badge = PREMIUM_BADGES.find((b) => b.id === c.id);
                return (
                  <motion.div
                    key={c.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 flex flex-col items-center text-center border border-mosala-green-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    {/* Premium badge */}
                    {badge && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className={cn(
                          "absolute left-4 top-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg",
                          badge.color
                        )}
                      >
                        <Sparkles className="inline w-3 h-3 mr-1" />
                        {badge.label}
                      </motion.div>
                    )}

                    {/* Favorite button */}
                    <motion.button
                      onClick={() => toggleFavorite(c.id)}
                      aria-label={favorites.includes(c.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-700 shadow hover:bg-mosala-green-50 dark:hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-mosala-yellow-400/60"
                      whileTap={{ scale: 1.2 }}
                    >
                      <Star
                        className={cn(
                          "w-5 h-5",
                          favorites.includes(c.id)
                            ? "fill-mosala-yellow-400 text-mosala-yellow-500"
                            : "text-mosala-dark-300 dark:text-gray-500"
                        )}
                      />
                    </motion.button>

                    {/* Avatar */}
                    <div className="h-20 w-20 mb-4 rounded-full bg-gradient-to-br from-mosala-green-100 to-mosala-yellow-50 flex items-center justify-center shadow-inner overflow-hidden border-2 border-mosala-green-200 dark:border-gray-600">
                      <User className="h-10 w-10 text-mosala-green-600 dark:text-mosala-green-400" />
                    </div>

                    {/* Candidate info */}
                    <h3 className="text-xl font-bold text-mosala-green-700 dark:text-mosala-green-400 mb-1">
                      {c.name}
                    </h3>
                    <p className="text-mosala-dark-600 dark:text-mosala-dark-300 mb-2">{c.profession}</p>
                    <p className="text-sm text-mosala-dark-400 dark:text-mosala-dark-400 mb-4">{c.city}</p>

                    {/* View profile button */}
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-auto w-full bg-gradient-to-r from-mosala-green-500 to-mosala-yellow-400 text-white font-medium px-4 py-2 rounded-lg shadow hover:shadow-md transition-all relative overflow-hidden group"
                    >
                      <span className="relative z-10">Voir le profil</span>
                      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Partners section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 flex flex-col items-center"
        >
          <span className="uppercase text-xs text-mosala-dark-400 dark:text-mosala-dark-500 tracking-widest mb-4">
            Partenaires officiels
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 bg-mosala-green-50 dark:bg-gray-800/50 px-8 py-6 rounded-2xl shadow-inner w-full">
            {PARTNER_LOGOS.map((logo, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="h-12 w-auto grayscale hover:grayscale-0 transition-all"
              >
                <img src={logo} alt="Partenaire Mosala" className="h-full w-auto max-w-[120px] object-contain" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Candidates;