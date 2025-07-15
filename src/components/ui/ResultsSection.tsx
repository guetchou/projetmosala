import { Users, Briefcase, CheckCircle, TrendingUp, Users as Community, ArrowRight, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Compteur animé pour les chiffres
const AnimatedCounter = ({ value, duration = 1.2, className = "" }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = value / (duration * 60);
    let frame: number;
    const animate = () => {
      start += increment;
      if (start < value) {
        setDisplay(Math.floor(start));
        frame = requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);
  return <motion.span className={className} initial={{ scale: 0.8 }} animate={{ scale: 1 }}>{display}</motion.span>;
};

// Ajout d'un composant pour effet shimmer
const Shimmer = () => (
  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
    <div className="animate-shimmer w-full h-full bg-gradient-to-r from-transparent via-[var(--color-mosala-yellow-50)]/60 to-transparent opacity-60" style={{backgroundSize: '200% 100%'}} />
  </div>
);

// Carte d'impact animée
const ImpactCard = ({ icon: Icon, value, label, desc, color, delay = 0, compact = false }: { icon: any, value?: number, label: any, desc?: any, color: any, delay?: number, compact?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.08, boxShadow: "0 0 0 6px hsl(var(--color-mosala-yellow-100)/0.25)", filter: "drop-shadow(0 0 12px hsl(var(--color-mosala-yellow-300)/0.4))" }}
    whileTap={{ scale: 0.97 }}
    className={`relative flex flex-col items-center text-center bg-[var(--color-mosala-white)]/70 backdrop-blur-lg rounded-2xl shadow-mosala border border-[var(--color-mosala-green-100)] ${compact ? 'w-36 h-32 md:w-40 md:h-36 p-3' : 'p-8'} transition-all duration-300 hover:shadow-glow focus-within:ring-2 focus-within:ring-[var(--color-mosala-yellow-200)] snap-center group`}
    tabIndex={0}
    aria-label={typeof label === 'string' ? label : ''}
  >
    {/* Shimmer animé sur le fond à l'apparition */}
    <Shimmer />
    {/* Icône custom Mosala avec halo animé */}
    <motion.div
      className="relative p-2 rounded-full mb-2 bg-gradient-to-br from-[var(--color-mosala-green-50)] to-[var(--color-mosala-yellow-50)] shadow flex items-center justify-center"
      whileHover={{ rotate: 8, scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
    >
      {/* Halo animé autour de l'icône */}
      <span className="absolute inset-0 rounded-full bg-[var(--color-mosala-yellow-100)] opacity-30 blur-md animate-pulse" />
      <Icon className="h-7 w-7 text-[var(--color-mosala-green-600)] drop-shadow-lg group-hover:animate-bounce-slow" />
    </motion.div>
    {/* Chiffre animé avec effet rebond */}
    {value !== undefined ? (
      <motion.span
        className="text-2xl font-bold text-[var(--color-mosala-green-700)] mb-1"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 12, delay: delay + 0.2 }}
      >
        <AnimatedCounter value={value} />
      </motion.span>
    ) : null}
    <div className="font-semibold text-[var(--color-mosala-dark-700)] text-base mb-0.5">{label}</div>
    {desc && <div className="text-[var(--color-mosala-dark-300)] text-xs">{desc}</div>}
  </motion.div>
);

// Carte CTA animée
const AnimatedCtaCard = ({ title, cta, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05, boxShadow: "0 8px 32px 0 rgba(106, 68, 226, 0.15)" }}
    className="bg-gradient-to-br from-[#6E45E2]/90 to-[#F9D923]/90 rounded-2xl shadow-2xl px-10 py-8 flex flex-col items-center text-center cursor-pointer transition group hover:ring-4 hover:ring-[#F9D923]/30 relative"
    onClick={onClick}
    tabIndex={0}
    role="button"
    aria-label={title}
  >
    <CheckCircle className="h-10 w-10 text-white mb-2 drop-shadow-lg animate-bounce-slow" />
    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg font-display tracking-tight">{title}</h3>
    <p className="text-white/80 mb-4 text-sm">Découvrez pourquoi les leaders du secteur nous font confiance</p>
    <motion.button
      whileHover={{ scale: 1.08 }}
      className="mt-2 px-6 py-3 bg-white/90 text-[#6E45E2] font-semibold rounded-full shadow hover:bg-white transition flex items-center gap-2"
    >
      {cta} <ArrowRight className="h-5 w-5" />
    </motion.button>
  </motion.div>
);

// Carte partenaire animée
const PartnerCard = ({ name }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white/80 backdrop-blur rounded-xl px-8 py-4 border border-gray-100 shadow-md flex items-center justify-center min-h-[80px] text-center font-medium text-gray-800 hover:shadow-xl hover:scale-105 transition"
  >
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold mr-3">
      {name.split(' ').map(w => w[0]).join('')}
    </span>
    {name}
  </motion.div>
);

const partners = [
  "Tech Congo",
  "Innovation Hub",
  "Digital Academy",
  "Green Tech",
  "Social Impact",
];

const ResultsSection = () => {
  const [showDetails, setShowDetails] = useState(false);
  const detailsButtonRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const bg = document.querySelector('.parallax-bg');
      if (bg && bg instanceof HTMLElement) {
        const scrolled = window.scrollY;
        bg.style.transform = `translateY(${scrolled * 0.10}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Focus trap pour le modal
  useEffect(() => {
    if (showDetails && detailsButtonRef.current) {
      (detailsButtonRef.current as HTMLElement).focus();
    }
  }, [showDetails]);
  return (
    <section className="relative py-10 bg-[var(--color-mosala-green-50)] overflow-hidden">
      <div className="container mx-auto px-2 md:px-4 relative z-20">
        <div className="text-center mb-8 flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[var(--color-mosala-green-600)] to-[var(--color-mosala-yellow-600)] text-transparent bg-clip-text mb-2 drop-shadow-lg">
            Nos résultats
          </h2>
          <p className="text-base text-[var(--color-mosala-dark-300)] max-w-xl mx-auto mb-4">
            L'impact Mosala en un clin d'œil.
          </p>
        </div>
        {/* Chiffres clés compacts, scroll horizontal mobile */}
        <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-4 md:gap-8 mb-6 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[var(--color-mosala-green-100)] scrollbar-track-transparent">
          <ImpactCard icon={Users} value={1200} label="Candidats" color="mosala-green" compact />
          <ImpactCard icon={Briefcase} value={50} label="Entreprises" color="mosala-yellow" compact />
          <ImpactCard icon={CheckCircle} label="Accompagnement personnalisé" desc="Programmes adaptés" color="mosala-orange" compact />
          <ImpactCard icon={TrendingUp} label="92% réussite" desc="Intégration réussie" color="mosala-green" compact />
        </div>
        <div className="flex justify-center">
          <button
            ref={detailsButtonRef}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-[var(--color-mosala-green-300)] to-[var(--color-mosala-yellow-300)] text-[var(--color-mosala-dark-900)] font-semibold shadow-mosala hover:shadow-glow focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-mosala-yellow-200)] transition border-2 border-transparent"
            onClick={() => setShowDetails(true)}
            aria-label="Voir les partenaires et témoignages"
          >
            Voir les partenaires & témoignages
          </button>
        </div>
        {/* Modal ou bloc déroulant pour partenaires & témoignages */}
        {showDetails && (
          <div
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center animate-fade-in"
            onClick={() => setShowDetails(false)}
            aria-modal="true"
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
          >
            <motion.div
              className="relative max-w-3xl w-full p-0 md:p-0 rounded-3xl overflow-hidden shadow-2xl shadow-[var(--color-mosala-green-100)/0.18] border-2 border-[var(--color-mosala-green-100)]"
              onClick={e => e.stopPropagation()}
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 40 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
            >
              {/* Fond Unsplash flouté + overlay pastel */}
              <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="Fond professionnel" className="w-full h-full object-cover object-center blur-md scale-105 opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-mosala-green-50)]/80 via-[var(--color-mosala-yellow-50)]/60 to-[var(--color-mosala-white)]/90" />
              </div>
              {/* Contenu glassmorphism sur le fond */}
              <div className="relative z-10 p-4 md:p-12 flex flex-col">
                <button
                  className="absolute top-4 right-4 text-[var(--color-mosala-green-700)] bg-[var(--color-mosala-yellow-50)]/80 rounded-full p-2 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-mosala-green-300)] hover:bg-[var(--color-mosala-yellow-100)] transition-all duration-150"
                  onClick={() => setShowDetails(false)}
                  aria-label="Fermer le modal"
                >
                  <X className="w-7 h-7" />
                </button>
                {/* Header avec effet shimmer/glow */}
                <div className="flex flex-col items-center mb-6 relative">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-mosala-green-50)] text-[var(--color-mosala-green-700)] rounded-full text-base font-semibold shadow mb-2 relative overflow-hidden">
                    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="9" fill="#B3F3E1"/><path d="M6 9l2 2 4-4" stroke="#009640" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Mosala Network
                    <span className="absolute left-0 top-0 w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-[var(--color-mosala-yellow-100)]/60 to-transparent opacity-60" style={{backgroundSize: '200% 100%'}} />
                  </span>
                  <h4 id="modal-title" className="text-2xl font-extrabold text-[var(--color-mosala-dark-700)] text-center drop-shadow-lg">Nos partenaires</h4>
                </div>
                {/* Slider horizontal partenaires */}
                <div className="flex gap-6 overflow-x-auto pb-4 mb-8 snap-x snap-mandatory">
                  {partners.map((partner) => (
                    <motion.div
                      key={partner}
                      whileHover={{ scale: 1.09, boxShadow: "0 0 0 6px hsl(var(--color-mosala-green-100)/0.25)", borderColor: "hsl(var(--color-mosala-green-300))" }}
                      className="transition-all duration-200 border-2 border-transparent rounded-xl bg-[var(--color-mosala-white)]/80 shadow backdrop-blur-md"
                    >
                      <PartnerCard name={partner} />
                    </motion.div>
                  ))}
                </div>
                <h5 className="text-lg font-semibold text-[var(--color-mosala-green-700)] mb-4 text-center" id="modal-desc">Ils témoignent</h5>
                {/* Slider horizontal témoignages */}
                <div className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory">
                  {[{
                    name: "Aline M.",
                    initials: "AM",
                    text: "Mosala m’a permis de décrocher mon premier emploi en moins de 2 mois.",
                    color: "green"
                  }, {
                    name: "David K.",
                    initials: "DK",
                    text: "Grâce à Mosala, j’ai pu agrandir mon réseau professionnel.",
                    color: "yellow"
                  }].map((t, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.09, boxShadow: "0 0 0 6px hsl(var(--color-mosala-yellow-100)/0.25)", borderColor: "hsl(var(--color-mosala-yellow-300))" }}
                      className={`min-w-[240px] bg-[var(--color-mosala-${t.color}-50)]/80 rounded-xl shadow p-6 flex flex-col items-center backdrop-blur-md transition-all duration-200 border-2 border-transparent`}
                    >
                      <p className="text-[var(--color-mosala-dark-700)] italic mb-2 text-base">“{t.text}”</p>
                      <span className={`w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-mosala-${t.color}-100)] to-[var(--color-mosala-${t.color}-300)] flex items-center justify-center text-[var(--color-mosala-${t.color}-700)] font-bold mb-1 text-lg`}>{t.initials}</span>
                      <span className="font-semibold text-[var(--color-mosala-dark-700)] text-base">{t.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResultsSection; 