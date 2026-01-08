import { useBlog } from "@/hooks/useBlog";
import { useKpis } from "@/hooks/useKpis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { AnimatedCounter } from "./AnimatedCounter";
import { ArrowRight, Users, BookOpen, Briefcase, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import "../../styles/hero.css";

const Hero = ({ navbarHeight = 0 }: { navbarHeight?: number }) => {
  const { data: posts = [], isLoading } = useBlog();
  const { kpis, isLoading: kpisLoading } = useKpis();
  const prefersReducedMotion = useReducedMotion();
  
  // Fallback pour l'image et le contenu
  const featuredPost = posts[0];
  const heroImage = featuredPost?.image || "/topcenter-uploads/carrousel/mosala-jeunes1.png";
  const heroTitle = featuredPost?.title || "Insertion professionnelle des jeunes au Congo";
  const heroDescription = featuredPost?.excerpt || "Accompagnement personnalisé, formations adaptées et mise en relation avec les opportunités d'emploi locales pour la jeunesse congolaise.";

  // Configuration des animations selon les préférences
  const animationConfig = prefersReducedMotion ? {
    initial: { opacity: 1, y: 0 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  } : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  return (
    <section
      role="region"
      aria-label="Insertion professionnelle des jeunes au Congo"
      className="relative z-0 min-h-[70vh] max-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: navbarHeight ? navbarHeight + 16 : 56 }}
    >
      {/* Image de fond optimisée */}
      <picture className="absolute inset-0 w-full h-full z-0">
        <source
          type="image/webp"
          srcSet={`${heroImage.replace('.png', '@2000.webp')} 2000w, ${heroImage.replace('.png', '@1200.webp')} 1200w`}
          sizes="100vw"
        />
        <img
          src={heroImage}
          alt="Jeunes en formation au Congo, Projet Mosala"
          className={`w-full h-full object-cover object-[center_40%] hero-background-image ${
            prefersReducedMotion ? 'reduced-motion' : ''
          }`}
          loading="eager"
          decoding="async"
        />
      </picture>

      {/* Gradient Mosala subtil */}
      <div className="absolute inset-0 hero-mosala-gradient z-5" />

      {/* Overlay pour lisibilité */}
      <div className="absolute inset-0 hero-overlay z-10" />

      {/* Contenu éditorial centré */}
      <div className="relative z-20 w-full flex flex-col items-center justify-start text-center px-4">
        <motion.div
          {...animationConfig}
          transition={{ ...animationConfig.transition, delay: 0.1 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
            <CheckCircle className="w-4 h-4" />
            Projet financé par l'AFD et l'Union Européenne
          </span>
        </motion.div>

        <motion.h1
          {...animationConfig}
          transition={{ ...animationConfig.transition, delay: 0.2 }}
          className="text-3xl md:text-5xl font-black text-white mb-6 drop-shadow-xl max-w-4xl mx-auto leading-tight"
        >
          {heroTitle}
        </motion.h1>

        <motion.p
          {...animationConfig}
          transition={{ ...animationConfig.transition, delay: 0.4 }}
          className="text-lg md:text-xl text-white/95 mb-10 max-w-3xl mx-auto font-medium leading-relaxed"
        >
          {heroDescription}
        </motion.p>
        
        {/* Indicateurs professionnels avec compteurs animés */}
        <motion.div
          {...animationConfig}
          transition={{ ...animationConfig.transition, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 max-w-4xl mx-auto"
          aria-live="polite"
        >
          <div className="flex flex-col items-center text-white/90">
            <Users className="w-8 h-8 mb-2 text-green-400" />
            <AnimatedCounter
              value={kpis.candidates}
              className="text-2xl font-bold text-white"
              suffix="+"
              aria-label={`${kpis.candidates.toLocaleString('fr-FR')} candidats accompagnés`}
            />
            <span className="text-sm font-medium">Candidats accompagnés</span>
          </div>
          
          <div className="flex flex-col items-center text-white/90">
            <Briefcase className="w-8 h-8 mb-2 text-green-400" />
            <AnimatedCounter
              value={kpis.jobs}
              className="text-2xl font-bold text-white"
              suffix="+"
              aria-label={`${kpis.jobs.toLocaleString('fr-FR')} emplois disponibles`}
            />
            <span className="text-sm font-medium">Emplois disponibles</span>
          </div>
          
          <div className="flex flex-col items-center text-white/90">
            <BookOpen className="w-8 h-8 mb-2 text-green-400" />
            <AnimatedCounter
              value={kpis.partners}
              className="text-2xl font-bold text-white"
              suffix="+"
              aria-label={`${kpis.partners.toLocaleString('fr-FR')} entreprises partenaires`}
            />
            <span className="text-sm font-medium">Entreprises partenaires</span>
          </div>
        </motion.div>
        
        {/* CTA avec accessibilité améliorée */}
        <motion.div
          {...animationConfig}
          transition={{ ...animationConfig.transition, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/jobs"
            className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            aria-label="Consulter les offres d'emploi disponibles"
          >
            Consulter les offres d'emploi
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="/formations"
            className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/30 transition-all duration-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
            aria-label="Découvrir nos formations disponibles"
          >
            Découvrir nos formations
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Loading state amélioré */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-30">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto"></div>
            <p className="mt-4 text-white font-medium">Chargement de l'actualité...</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;