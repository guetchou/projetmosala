import { useState } from "react";
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[var(--color-mosala-green-50)] via-[var(--color-mosala-yellow-50)] to-[var(--color-mosala-dark-50)] relative">
      <Navbar />
      {/* Hero/Header section */}
      <section className="relative w-full flex flex-col items-center justify-center min-h-[340px] md:min-h-[420px] py-12 mb-8 overflow-hidden">
        <img
          src="/lovable-uploads/carrousel/mosala2.jpeg"
          alt="Formations Mosala"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-40 blur-sm"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-mosala-green-700)]/80 via-[var(--color-mosala-yellow-500)]/40 to-[var(--color-mosala-dark-900)]/80 z-10" />
        <div className="relative z-20 flex flex-col items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[var(--color-mosala-green-400)] to-[var(--color-mosala-yellow-400)] text-transparent bg-clip-text drop-shadow-lg mb-4">Formations</h1>
          <p className="text-lg md:text-xl text-[var(--color-mosala-white)]/90 mb-6 max-w-2xl">Développez vos compétences et réussissez votre avenir professionnel avec nos parcours certifiants et ateliers pratiques.</p>
          <button className="bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-[var(--color-mosala-white)] font-bold px-8 py-3 rounded-full shadow-lg hover:from-[var(--color-mosala-green-600)] hover:to-[var(--color-mosala-yellow-600)] transition-all text-lg">Voir le catalogue complet</button>
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
          <button className="px-4 py-2 rounded-full bg-[var(--color-mosala-green-100)] text-[var(--color-mosala-green-700)] font-medium hover:bg-[var(--color-mosala-green-200)] transition">Toutes</button>
          <button className="px-4 py-2 rounded-full bg-[var(--color-mosala-yellow-100)] text-[var(--color-mosala-yellow-700)] font-medium hover:bg-[var(--color-mosala-yellow-200)] transition">Web</button>
          <button className="px-4 py-2 rounded-full bg-[var(--color-mosala-green-50)] text-[var(--color-mosala-green-700)] font-medium hover:bg-[var(--color-mosala-green-100)] transition">Soft Skills</button>
          <button className="px-4 py-2 rounded-full bg-[var(--color-mosala-yellow-50)] text-[var(--color-mosala-yellow-700)] font-medium hover:bg-[var(--color-mosala-yellow-100)] transition">Entrepreneuriat</button>
          <button className="px-4 py-2 rounded-full bg-[var(--color-mosala-green-50)] text-[var(--color-mosala-green-700)] font-medium hover:bg-[var(--color-mosala-green-100)] transition">Carrière</button>
        </div>
      </div>
      {/* Formations grid or empty state */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {filteredFormations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <img src="/placeholder.svg" alt="Aucune formation" className="h-32 w-32 mb-6 opacity-60" />
            <h2 className="text-2xl font-bold text-[var(--color-mosala-green-700)] mb-2">Aucune formation trouvée</h2>
            <p className="text-[var(--color-mosala-dark-400)] mb-4">Essayez un autre mot-clé ou filtre.</p>
            <button className="bg-[var(--color-mosala-green-500)] text-[var(--color-mosala-white)] px-6 py-2 rounded-full font-semibold shadow hover:bg-[var(--color-mosala-green-600)] transition">Réinitialiser</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFormations.map((f, i) => (
              <motion.div
                key={f.title}
                className="bg-[var(--color-mosala-white)]/90 dark:bg-[var(--color-mosala-dark-900)]/90 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-[var(--color-mosala-green-100)] hover:scale-105 transition-transform duration-300 group"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                tabIndex={0}
                aria-label={f.title}
              >
                <img src={f.icon} alt="" className="h-16 w-16 mb-4 drop-shadow-lg group-hover:scale-110 transition-transform" />
                <h2 className="text-xl font-bold text-[var(--color-mosala-green-700)] mb-2">{f.title}</h2>
                <p className="text-[var(--color-mosala-dark-400)] mb-4">{f.description}</p>
                <button className="mt-auto bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-[var(--color-mosala-white)] font-semibold px-6 py-2 rounded-full shadow hover:from-[var(--color-mosala-green-600)] hover:to-[var(--color-mosala-yellow-600)] transition">Voir plus</button>
              </motion.div>
            ))}
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

export default Formations;