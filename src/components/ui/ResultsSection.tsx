import { Users, Briefcase, CheckCircle, TrendingUp, Users as Community, ArrowRight } from "lucide-react";
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

// Carte d'impact animée
const ImpactCard = ({ icon: Icon, value, label, desc, color }: { icon: any, value?: number, label: any, desc?: any, color: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-100 flex flex-col items-center text-center hover:shadow-[0_8px_32px_0_rgba(106,68,226,0.15)] hover:ring-2 hover:ring-${color}-200 transition group relative overflow-hidden`}
  >
    {/* Badge flottant */}
    <div className={`absolute -top-4 -right-4 bg-gradient-to-br from-${color}-400 to-${color}-600 text-white rounded-full px-3 py-1 text-xs font-bold shadow-lg z-10`}>{label[0]}</div>
    <div className={`p-4 rounded-full mb-4 bg-gradient-to-br from-${color}-100 to-white shadow-lg`}>
      <Icon className={`h-8 w-8 text-${color}-600 drop-shadow`} />
    </div>
    {value !== undefined ? (
      <AnimatedCounter value={value} className={`text-4xl font-bold text-${color}-700 mb-2`} />
    ) : null}
    <div className="font-semibold text-gray-900 text-lg mb-1">{label}</div>
    {desc && <div className="text-gray-500 text-sm">{desc}</div>}
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

const ResultsSection = () => (
  <section className="relative py-24 bg-gradient-to-b from-[#F9D923]/10 via-white to-white overflow-hidden">
    {/* Image d'arrière-plan professionnelle Unsplash */}
    <img
      src="public/lovable-uploads/jeunesse-congolaise/jeunesse-congolaise2.jpg"
      alt="Collaboration professionnelle"
      className="absolute inset-0 w-full h-64 md:h-[420px] lg:h-[520px] object-cover object-top z-0 opacity-60"
      aria-hidden="true"
    />
    {/* Overlay sombre et flou */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-white/10 to-white/80 backdrop-blur-sm z-10" />
    {/* Séparateur décoratif SVG plus marqué */}
    <div className="absolute -top-10 left-0 w-full z-10 pointer-events-none">
      <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16">
        <path d="M0,0 C480,60 960,0 1440,60 L1440,0 L0,0 Z" fill="#6E45E2" fillOpacity="0.10" />
      </svg>
    </div>
    <div className="container mx-auto px-4 relative z-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#6E45E2] to-[#F9D923] text-transparent bg-clip-text mb-4 drop-shadow-lg">
          Nos résultats
        </h2>
        <div className="mx-auto w-16 h-1 bg-[#F9D923] rounded-full mb-4" />
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez l’impact concret de Mosala sur les candidats et les entreprises partenaires.
        </p>
      </div>
      {/* Notre Impact animé */}
      <div className="grid md:grid-cols-5 gap-8 mb-16">
        <ImpactCard icon={Users} value={1200} label="Candidats" color="indigo" />
        <ImpactCard icon={Briefcase} value={50} label="Entreprises" color="amber" />
        <ImpactCard icon={CheckCircle} label="Accompagnement personnalisé" desc="Programmes adaptés à chaque profil" color="green" />
        <ImpactCard icon={TrendingUp} label="Taux de réussite de 92%" desc="Intégration en entreprise réussie" color="blue" />
        <ImpactCard icon={Community} label="Communauté active" desc="Réseau de professionnels engagés" color="purple" />
      </div>
      {/* Carte CTA animée “Ils nous font confiance” */}
      <div className="flex justify-center mb-12">
        <AnimatedCtaCard
          title="Ils nous font confiance"
          cta="Voir nos partenaires"
          onClick={() => {
            const el = document.getElementById('nos-partenaires');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </div>
      {/* Carte Nos partenaires */}
      <h4 id="nos-partenaires" className="text-xl font-bold text-gray-900 mb-8 text-center">Nos partenaires</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <PartnerCard key={partner} name={partner} />
        ))}
      </div>
    </div>
  </section>
);

export default ResultsSection; 