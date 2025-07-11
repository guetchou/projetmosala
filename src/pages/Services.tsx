import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, Sparkles } from "lucide-react";
import { useRef } from "react";

const services = [
  {
    id: "1",
    title: "Accompagnement personnalisé",
    description: "Coaching, orientation, suivi individuel pour booster votre carrière.",
    icon: "/lovable-uploads/services/coaching.svg",
    category: "Coaching",
    rating: 4.8
  },
  {
    id: "2",
    title: "Recrutement & Matching",
    description: "Mise en relation intelligente entre candidats et employeurs.",
    icon: "/lovable-uploads/services/matching.svg",
    category: "Recrutement",
    rating: 4.5
  },
  {
    id: "3",
    title: "Formations & Ateliers",
    description: "Formations certifiantes, ateliers pratiques, e-learning.",
    icon: "/lovable-uploads/services/formation.svg",
    category: "Formation",
    rating: 4.7
  },
  {
    id: "4",
    title: "Réseau & Communauté",
    description: "Événements, networking, entraide et opportunités.",
    icon: "/lovable-uploads/community.png",
    category: "Communauté",
    rating: 4.6
  }
];

const categories = ["Tous", "Coaching", "Recrutement", "Formation", "Communauté", "Favoris"];

const partnerLogos = [
  "/lovable-uploads/partenaires/afd.jpeg",
  "/lovable-uploads/partenaires/ministere.jpeg",
  "/lovable-uploads/partenaires/ue.jpeg"
];

const premiumBadges = [
  { id: "1", label: "Nouveau", color: "from-mosala-green-400 to-mosala-yellow-300" },
  { id: "3", label: "Populaire", color: "from-mosala-orange-400 to-mosala-yellow-300" }
];

const Services = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("mosala-favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("mosala-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = id => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const filteredServices = services.filter(s => {
    const matchCategory =
      selectedCategory === "Tous" ||
      (selectedCategory === "Favoris" && favorites.includes(s.id)) ||
      s.category === selectedCategory;
    const matchSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[var(--color-mosala-green-50)] via-[var(--color-mosala-yellow-50)] to-[var(--color-mosala-dark-50)] relative">
      <Navbar />
      {/* Hero/Header section */}
      <section className="relative w-full flex flex-col items-center justify-center min-h-[340px] md:min-h-[420px] py-12 mb-8 overflow-hidden">
        <img
          src="/lovable-uploads/carrousel/mosala1.jpeg"
          alt="Services Mosala"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-40 blur-sm"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-mosala-green-700)]/80 via-[var(--color-mosala-yellow-500)]/40 to-[var(--color-mosala-dark-900)]/80 z-10" />
        <div className="relative z-20 flex flex-col items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[var(--color-mosala-green-400)] to-[var(--color-mosala-yellow-400)] text-transparent bg-clip-text drop-shadow-lg mb-4">Découvrez nos services</h1>
          <p className="text-lg md:text-xl text-[var(--color-mosala-white)]/90 mb-6 max-w-2xl">Trouvez le service adapté à vos besoins professionnels ou personnels. Mosala vous accompagne à chaque étape.</p>
          <button className="bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-[var(--color-mosala-white)] font-bold px-8 py-3 rounded-full shadow-lg hover:from-[var(--color-mosala-green-600)] hover:to-[var(--color-mosala-yellow-600)] transition-all text-lg">Proposer un service</button>
        </div>
      </section>
      {/* Sticky search & filters */}
      <div className="sticky top-0 z-30 bg-[var(--color-mosala-white)]/80 dark:bg-[var(--color-mosala-dark-900)]/80 backdrop-blur-md border-b border-[var(--color-mosala-green-100)]/40 py-4 px-4 flex flex-col md:flex-row items-center gap-4 mb-8 shadow-sm">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher un service, une catégorie..."
          className="w-full md:w-96 px-5 py-3 rounded-full border border-[var(--color-mosala-green-200)] focus:border-[var(--color-mosala-green-500)] focus:ring-2 focus:ring-[var(--color-mosala-green-100)] text-[var(--color-mosala-dark-900)] bg-[var(--color-mosala-white)]/90 dark:bg-[var(--color-mosala-dark-900)]/80 shadow-inner transition-all"
          aria-label="Rechercher un service"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                selectedCategory === cat
                  ? "bg-[var(--color-mosala-green-500)] text-[var(--color-mosala-white)]"
                  : "bg-[var(--color-mosala-green-100)] text-[var(--color-mosala-green-700)] hover:bg-[var(--color-mosala-green-200)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      {/* Services grid or empty state */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl relative">
        {/* Blobs SVG animés en fond */}
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] z-0 pointer-events-none animate-blob-move">
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="blobGradient1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#fde68a" />
              </linearGradient>
            </defs>
            <path fill="url(#blobGradient1)" fillOpacity=".4" d="M320,320Q320,400,240,400Q160,400,80,400Q0,400,0,320Q0,240,0,160Q0,80,80,80Q160,80,240,80Q320,80,320,160Q320,240,320,320Z" />
          </svg>
        </div>
        <div className="absolute -bottom-32 -right-32 w-[340px] h-[340px] z-0 pointer-events-none animate-blob-move2">
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="blobGradient2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e42" />
              </linearGradient>
            </defs>
            <path fill="url(#blobGradient2)" fillOpacity=".3" d="M320,320Q400,240,320,160Q240,80,160,80Q80,80,80,160Q80,240,160,320Q240,400,320,320Z" />
          </svg>
        </div>
        {filteredServices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <img src="/placeholder.svg" alt="Aucun service" className="h-32 w-32 mb-6 opacity-60" />
            <h2 className="text-2xl font-bold text-[var(--color-mosala-green-700)] mb-2">Aucun service trouvé</h2>
            <p className="text-[var(--color-mosala-dark-400)] mb-4">Essayez un autre mot-clé ou filtre.</p>
            <button className="bg-[var(--color-mosala-green-500)] text-[var(--color-mosala-white)] px-6 py-2 rounded-full font-semibold shadow hover:bg-[var(--color-mosala-green-600)] transition" onClick={() => { setSearch(""); setSelectedCategory("Tous"); }}>Réinitialiser</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {filteredServices.map((s, i) => {
              const badge = premiumBadges.find(b => b.id === s.id);
              const isFormation = s.category === "Formation";
              return (
                <motion.div
                  key={s.id}
                  className="relative group bg-[var(--color-mosala-white)]/30 dark:bg-[var(--color-mosala-dark-900)]/40 rounded-3xl p-8 flex flex-col items-center text-center border-2 border-transparent shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--color-mosala-green-500)] hover:rotate-1 hover:border-gradient-mosala focus-within:ring-4 focus-within:ring-[var(--color-mosala-green-200)]/60"
                  style={{ borderImage: "linear-gradient(135deg, #34d399, #fde68a, #fbbf24) 1" }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                  tabIndex={0}
                  aria-label={s.title}
                >
                  {/* Badge animé */}
                  {badge && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.5, type: "spring" }}
                      className={`absolute left-4 top-4 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${badge.color} text-[var(--color-mosala-white)] shadow-lg animate-pop`}
                    >
                      <Sparkles className="inline w-4 h-4 mr-1 animate-spin-slow" />{badge.label}
                    </motion.div>
                  )}
                  {/* Bouton favori animé */}
                  <motion.button
                    onClick={() => toggleFavorite(s.id)}
                    aria-label={favorites.includes(s.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                    className={`absolute top-4 right-4 p-2 rounded-full shadow transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-mosala-yellow-400)]/60 ${favorites.includes(s.id) ? "bg-[var(--color-mosala-yellow-400)]" : "bg-[var(--color-mosala-white)]/80"}`}
                    whileTap={{ scale: 1.2, rotate: 20 }}
                    animate={favorites.includes(s.id) ? { scale: [1, 1.2, 1], rotate: [0, 20, 0] } : {}}
                  >
                    <Star className={`w-5 h-5 ${favorites.includes(s.id) ? "fill-current text-[var(--color-mosala-yellow-600)] animate-pulse" : "text-[var(--color-mosala-dark-300)]"}`} fill={favorites.includes(s.id) ? "currentColor" : "none"} />
                  </motion.button>
                  <img src={s.icon} alt="" className="h-16 w-16 mb-4 drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
                  <h2 className="text-xl md:text-2xl font-extrabold text-[var(--color-mosala-green-700)] mb-2 font-manrope tracking-tight animate-fade-in-up bg-gradient-to-r from-[var(--color-mosala-green-400)] to-[var(--color-mosala-yellow-400)] text-transparent bg-clip-text">
                    {s.title}
                  </h2>
                  <p className="text-[var(--color-mosala-dark-400)] mb-4 text-base md:text-lg leading-relaxed tracking-wide text-opacity-80 animate-fade-in-up">
                    {s.description}
                  </p>
                  {/* Progress bar formations */}
                  {isFormation && (
                    <div className="w-full mb-3">
                      <div className="flex justify-between text-xs text-[var(--color-mosala-green-700)] mb-1">
                        <span>80% des places prises</span>
                        <span>Restent 5</span>
                      </div>
                      <div className="w-full h-2 bg-[var(--color-mosala-green-100)] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[var(--color-mosala-green-400)] to-[var(--color-mosala-yellow-400)]" style={{ width: "80%" }} />
                      </div>
                    </div>
                  )}
                  {/* Affichage des étoiles */}
                  <div className="flex items-center justify-center gap-1 mb-2 animate-fade-in-up">
                    {[1,2,3,4,5].map(n => (
                      <Star
                        key={n}
                        className={`w-5 h-5 ${s.rating >= n - 0.5 ? "text-[var(--color-mosala-yellow-400)]" : "text-[var(--color-mosala-dark-300)]"}`}
                        fill={s.rating >= n - 0.5 ? "currentColor" : "none"}
                      />
                    ))}
                    <span className="ml-2 text-sm text-[var(--color-mosala-dark-500)]">{s.rating.toFixed(1)}</span>
                  </div>
                  {/* Bouton avec effet ripple */}
                  <button className="mt-auto bg-gradient-to-r from-[var(--color-mosala-green-500)] via-[var(--color-mosala-yellow-400)] to-[var(--color-mosala-orange-300)] text-[var(--color-mosala-white)] font-semibold px-6 py-2 rounded-full shadow-lg hover:from-[var(--color-mosala-green-600)] hover:to-[var(--color-mosala-yellow-600)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mosala-green-300)]/60 transition-all relative overflow-hidden ripple">
                    <span className="relative z-10">Voir plus</span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
        {/* Trusted by section */}
        <div className="mt-16 flex flex-col items-center">
          <span className="uppercase text-xs text-[var(--color-mosala-dark-400)] tracking-widest mb-4">Ils nous font confiance</span>
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

export default Services;