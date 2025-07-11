import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Star, Users, Briefcase, TrendingUp, Sparkles, Globe, BookOpen 
} from "lucide-react";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

// Nouveaux contrastes optimisés
const COLORS = {
  text: "text-[var(--color-mosala-dark-50)]",         // Blanc cassé (meilleure lisibilité)
  textSecondary: "text-[var(--color-mosala-dark-100)]",
  textDark: "text-[var(--color-mosala-dark-900)]",    // Pour texte sur fond clair
  bgDark: "bg-[var(--color-mosala-dark-900)]",        // Fond sombre
  primary: "bg-[var(--color-mosala-green-600)]", // Vert plus foncé
  primaryHover: "hover:bg-[var(--color-mosala-green-700)]",
  secondary: "bg-[var(--color-mosala-yellow-600)]", // Jaune plus foncé
  secondaryHover: "hover:bg-[var(--color-mosala-yellow-700)]"
};

const Hero = () => {
  // Données réorganisées pour plus de clarté
  const content = {
    tagline: "Inclusion, innovation, impact social",
    title: "Construisez votre avenir avec",
    highlight: "Mosala",
    description: "Plateforme inclusive pour l'emploi, l'accompagnement et la réussite professionnelle.",
    features: [
      { icon: Briefcase, text: "Offres d'emploi et stages" },
      { icon: Users, text: "Réseau professionnel" },
      { icon: Sparkles, text: "Coaching personnalisé" },
      { icon: Globe, text: "Plateforme innovante" }
    ],
    stats: [
      { icon: Users, value: "15,000+", label: "Jeunes accompagnés" },
      { icon: Briefcase, value: "2,500+", label: "Offres d'emploi" },
      { icon: Star, value: "4.8/5", label: "Satisfaction" },
      { icon: TrendingUp, value: "100+", label: "Partenaires" }
    ],
    ctaPrimary: { text: "Trouver un emploi", icon: Briefcase, link: "/jobs" },
    ctaSecondary: { text: "Démarrer mon orientation", icon: BookOpen, link: "/orientation" }
  };

  return (
    <section className={`relative min-h-screen ${COLORS.bgDark} overflow-hidden pt-32`}>
      {/* Arrière-plan avec effet Ken Burns */}
      <div className="mosala-gradient-hero absolute inset-0 bg-cover bg-center filter blur-sm" style={{zIndex:0}} />

      {/* Contenu principal */}
      <div className="relative z-20 container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Colonne gauche - Contenu texte */}
          <div className="space-y-8">
            {/* Tagline */}
            <Tagline text={content.tagline} />

            {/* Titre principal */}
            <Title 
              text={content.title} 
              highlight={content.highlight} 
              description={content.description}
            />

            {/* Features */}
            <FeaturesList items={content.features} />

            {/* Boutons CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <CTAButton 
                {...content.ctaPrimary} 
                primary={true}
                outline={false}
                className="shadow-lg hover:shadow-xl"
              />
              <CTAButton 
                {...content.ctaSecondary} 
                primary={false}
                outline={true}
                className="border-2 hover:border-transparent"
              />
            </div>

            {/* Statistiques */}
            <StatsGrid items={content.stats} />
          </div>

          {/* Colonne droite - Illustration */}
          <IllustrationCard />
        </div>
      </div>

      {/* Vague décorative */}
      <WaveDecoration />
    </section>
  );
};

// Sous-composants

const BackgroundCarousel = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <Carousel opts={{ loop: true }} className="h-full w-full">
      <CarouselContent>
        {[1, 2, 3].map((idx) => (
          <CarouselItem key={idx}>
            <motion.div
              className="w-full h-screen relative"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 12,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <img
                src={`/lovable-uploads/carrousel/mosala${idx}.jpeg`}
                alt={`Mosala background ${idx}`}
                className="object-cover w-full h-full brightness-[.35]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/95 to-gray-700/90" />
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  </div>
);

const Tagline = ({ text }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="inline-flex items-center bg-[var(--color-mosala-white)]/10 text-[var(--color-mosala-white)] px-4 py-2 text-sm font-semibold rounded-full border border-[var(--color-mosala-white)]/20">
      <Globe className="h-4 w-4 mr-2 text-[var(--color-mosala-white)]" aria-hidden="true" />
      {text}
    </div>
  </motion.div>
);

const Title = ({ text, highlight, description }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="space-y-4"
  >
    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${COLORS.text} leading-tight`}>
      {text} <span className="text-transparent bg-clip-text mosala-gradient-hero">{highlight}</span>
    </h1>
    <p className={`text-lg md:text-xl ${COLORS.textSecondary} leading-relaxed max-w-2xl`}>
      {description}
    </p>
  </motion.div>
);

const FeaturesList = ({ items }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
  >
    {items.map((item, index) => (
      <div key={index} className={`flex items-center space-x-3 ${COLORS.text} p-3 rounded-lg bg-white/5`}>
        <div className="flex-shrink-0 w-8 h-8 bg-[var(--color-mosala-green-500)]/20 rounded-full flex items-center justify-center">
          <item.icon className="h-4 w-4 text-[var(--color-mosala-green-500)]" aria-hidden="true" />
        </div>
        <span className="text-sm font-medium">{item.text}</span>
      </div>
    ))}
  </motion.div>
);

const CTAButton = ({ text, icon: Icon, link, primary, outline, className = '' }) => {
  const baseClass = `font-semibold px-6 py-3 text-lg transition-all duration-300 group flex items-center justify-center gap-2`;
  
  return (
    <Link to={link} className="w-full sm:w-auto">
      <Button
        className={`${baseClass} ${className} ${
          primary 
            ? `${COLORS.primary} ${COLORS.primaryHover} ${COLORS.text} shadow-lg`
            : outline
              ? `border-[var(--color-mosala-green-500)] text-[var(--color-mosala-green-500)] hover:bg-[var(--color-mosala-green-500)] hover:${COLORS.text} bg-transparent`
              : ''
        }`}
        size="lg"
      >
        <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
        {text}
        {primary && <ArrowRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />}
      </Button>
    </Link>
  );
};

const StatsGrid = ({ items }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.6 }}
    className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-gray-700"
  >
    {items.map((item, index) => (
      <div key={index} className="text-center">
        <div className="flex items-center justify-center w-10 h-10 bg-[var(--color-mosala-green-500)]/20 rounded-full mx-auto mb-2">
          <item.icon className="h-5 w-5 text-[var(--color-mosala-green-500)]" aria-hidden="true" />
        </div>
        <div className={`text-xl font-bold ${COLORS.text}`}>{item.value}</div>
        <div className={`text-xs ${COLORS.textSecondary}`}>{item.label}</div>
      </div>
    ))}
  </motion.div>
);

const IllustrationCard = () => (
  <motion.div 
    initial={{ x: 50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.4 }}
    className="hidden lg:block relative"
  >
    <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
      {/* Contenu de la carte d'illustration */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] rounded-full flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Accompagnement Mosala</h3>
              <p className="text-sm text-gray-500">Coaching, offres, réseau</p>
            </div>
          </div>
          <div className="inline-flex items-center bg-[var(--color-mosala-yellow-500)]/10 text-[var(--color-mosala-yellow-600)] px-3 py-1 text-xs font-semibold rounded-full">
            Actif
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: "Coaching personnalisé", value: 95, color: "bg-[var(--color-mosala-green-500)]" },
            { label: "Accès aux offres", value: 100, color: "bg-[var(--color-mosala-yellow-500)]" },
            { label: "Communauté", value: 90, color: "bg-[var(--color-mosala-orange-500)]" }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <div className="w-20 h-2 bg-[var(--color-mosala-dark-50)] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                  className={`h-full bg-[var(--color-mosala-green-500)] rounded-full`}
                />
              </div>
              <span className="text-sm text-gray-500">{item.value}%</span>
            </div>
          ))}
        </div>

        <CTAButton 
          text="Découvrir les offres" 
          icon={ArrowRight} 
          link="/jobs"
          primary={true}
          outline={false}
          className="w-full mt-4"
        />
      </div>
    </div>
  </motion.div>
);

const WaveDecoration = () => (
  <div className="absolute bottom-0 left-0 right-0 z-10">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16">
      <path
        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
        opacity=".25"
        className="fill-gray-800"
      />
      <path
        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
        opacity=".5"
        className="fill-gray-800"
      />
      <path
        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
        className="fill-gray-800/30"
      />
    </svg>
  </div>
);

export default Hero;