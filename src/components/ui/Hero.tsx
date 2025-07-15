import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Star, Users, Briefcase, TrendingUp, Sparkles, Globe, BookOpen, 
  Play, Quote, Award, CheckCircle, Heart, Zap, Search, Users as Community
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useState, useEffect, useRef } from "react";

// Palette de couleurs optimisée pour l'accessibilité
const COLORS = {
  primary: {
    main: "bg-[#4F46E5]",
    hover: "hover:bg-[#4338CA]",
    text: "text-[#4F46E5]"
  },
  secondary: {
    main: "bg-[#F59E0B]",
    hover: "hover:bg-[#D97706]",
    text: "text-[#F59E0B]"
  },
  dark: {
    main: "bg-[#1F2937]",
    text: "text-[#1F2937]"
  },
  light: {
    main: "bg-[#F9FAFB]",
    text: "text-[#F9FAFB]"
  },
  accent: {
    purple: "bg-[#7C3AED]",
    amber: "bg-[#F59E0B]"
  }
};

// Images pour le carrousel Ken Burns
const KEN_BURNS_IMAGES = [
  "/lovable-uploads/carrousel/mosala1.jpeg",
  "/lovable-uploads/carrousel/mosala2.jpeg",
  "/lovable-uploads/carrousel/mosala3.jpeg",
  "/lovable-uploads/carrousel/mosala4.jpeg",
];

const KenBurnsSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % KEN_BURNS_IMAGES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden aspect-[16/9]">
      {KEN_BURNS_IMAGES.map((src, index) => (
        <motion.img
          key={src}
          src={src}
          alt={`Scène Mosala ${index + 1}`}
          initial={false}
          animate={{
            scale: index === currentIndex ? 1.08 : 1,
            opacity: index === currentIndex ? 1 : 0
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-1000 ${
            index === currentIndex ? "z-10" : "z-0"
          }`}
          style={{ 
            filter: 'brightness(0.6) contrast(1.05)',
            objectPosition: 'center'
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-gray-900/80" aria-hidden="true" />
    </div>
  );
};

const StatsCard = ({ icon: Icon, value, label, color }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg">
    <div className={`p-3 rounded-full ${color} mb-4`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <span className="text-3xl font-bold text-gray-900">{value}</span>
    <span className="text-sm text-gray-600">{label}</span>
  </div>
);

const AccomplishmentCard = () => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.5 }}
    className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
  >
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <Sparkles className="h-7 w-7 text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-900">Notre Impact</h3>
      </div>
      <Award className="h-6 w-6 text-amber-500" />
    </div>
    
    <div className="grid grid-cols-2 gap-4 mb-6">
      <StatsCard 
        icon={Users} 
        value="+1200" 
        label="Candidats accompagnés" 
        color="bg-indigo-100" 
      />
      <StatsCard 
        icon={Briefcase} 
        value="+50" 
        label="Entreprises partenaires" 
        color="bg-amber-100" 
      />
    </div>

    <div className="space-y-4 mb-6">
      <div className="flex items-center space-x-2">
        <CheckCircle className="h-5 w-5 text-green-500" />
        <span className="text-gray-700">Accompagnement personnalisé</span>
      </div>
      <div className="flex items-center space-x-2">
        <TrendingUp className="h-5 w-5 text-blue-500" />
        <span className="text-gray-700">Taux de réussite de 92%</span>
      </div>
      <div className="flex items-center space-x-2">
        <Community className="h-5 w-5 text-purple-500" />
        <span className="text-gray-700">Communauté active</span>
      </div>
    </div>

    <Link to="/jobs">
      <Button className="w-full bg-gradient-to-r from-indigo-600 to-amber-500 hover:from-indigo-700 hover:to-amber-600 text-white">
        Explorer les opportunités
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </Link>
  </motion.div>
);

const testimonials = [
  {
    quote: "Mosala a transformé ma carrière. En 3 mois, j'ai trouvé un poste qui correspond parfaitement à mes compétences.",
    author: "Sarah M.",
    role: "Développeuse Full-Stack",
    company: "Tech Congo",
    avatar: "/lovable-uploads/avatars/sarah.jpg",
    rating: 5,
  },
  {
    quote: "L'accompagnement sur-mesure m'a permis de négocier une augmentation de 30% par rapport à mon précédent poste.",
    author: "David K.",
    role: "Chef de projet",
    company: "Innovation Hub",
    avatar: "/lovable-uploads/avatars/david.jpg",
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col h-full">
    <div className="flex items-center mb-4">
      {[...Array(testimonial.rating)].map((_, i) => (
        <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
      ))}
    </div>
    <p className="text-gray-700 italic mb-6 flex-grow">"{testimonial.quote}"</p>
    <div className="flex items-center">
      <img 
        src={testimonial.avatar} 
        alt={`Photo de ${testimonial.author}`} 
        className="w-16 h-16 rounded-full object-cover object-center border-2 border-indigo-100 shadow-lg ring-2 ring-indigo-200"
      />
      <div className="ml-4">
        <p className="font-semibold text-gray-900">{testimonial.author}</p>
        <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
      </div>
    </div>
  </div>
);

const partners = [
  { name: "Tech Congo", logo: "/logos/tech-congo.svg" },
  { name: "Innovation Hub", logo: "/logos/innovation-hub.svg" },
  { name: "Digital Academy", logo: "/logos/digital-academy.svg" },
  { name: "Green Tech", logo: "/logos/green-tech.svg" },
  { name: "Social Impact", logo: "/logos/social-impact.svg" },
];

const PartnerLogo = ({ partner }) => (
  <div className="flex items-center justify-center p-4 bg-white rounded-lg border border-gray-200 shadow-md min-w-[80px] min-h-[80px] aspect-square hover:bg-gray-50 transition-all">
    <img 
      src={partner.logo} 
      alt={`Logo ${partner.name}`} 
      className="object-contain object-center w-full h-full"
      style={{ background: '#fff' }}
    />
  </div>
);

const HeroSection = () => (
  // pt-26 = 104px (hauteur Navbar), min-h-[calc(100vh-104px)] pour que la Hero soit toujours visible sous la Navbar
  <section className="relative z-0 pt-26 min-h-[calc(100vh-104px)] flex items-center justify-center overflow-hidden pb-16 md:pb-32">
    {/* Ken Burns Slideshow en fond (z-0) */}
    <KenBurnsSlideshow />
    {/* Overlay dégradé + blur (z-0) */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent backdrop-blur-sm z-0" aria-hidden="true" />
    {/* Contenu Hero (z-10) */}
    <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col items-center text-center max-w-3xl">
      {/* Badge stylisé */}
      <motion.span
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="inline-flex items-center gap-2 px-5 py-2 bg-yellow-100/90 text-yellow-800 rounded-full text-base font-semibold mb-6 tracking-widest shadow-lg backdrop-blur-md border border-yellow-200"
      >
        <Sparkles className="h-5 w-5 text-yellow-500" />
        Jeunesse & Impact
      </motion.span>
      {/* Titre avec effet gradient (doré, neutre, plus de bleu) */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg bg-gradient-to-r from-yellow-400 via-white to-amber-500 text-transparent bg-clip-text"
      >
        Votre réussite professionnelle commence ici
      </motion.h1>
      {/* Sous-titre amélioré */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-xl md:text-2xl text-white/90 mb-6 max-w-2xl mx-auto font-medium drop-shadow"
      >
        Mosala accompagne la jeunesse congolaise vers l’emploi, l’innovation et l’inclusion.
      </motion.p>
      {/* Citation inspirante */}
      <motion.blockquote
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="italic text-lg text-white/80 mb-10 flex items-center justify-center gap-2"
      >
        <Quote className="h-6 w-6 text-yellow-300 opacity-80" />
        "L’avenir appartient à ceux qui croient en la beauté de leurs rêves."
      </motion.blockquote>
      {/* CTA principal (doré, plus de bleu) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 1.1 }}
        className="w-full flex justify-center"
      >
        <Button className="px-12 py-5 bg-gradient-to-r from-yellow-500 to-amber-400 text-white text-lg rounded-full shadow-xl hover:scale-105 hover:from-yellow-600 hover:to-amber-500 transition-all font-bold">
          Commencer maintenant
        </Button>
      </motion.div>
    </div>
    {/* Séparateur SVG vague */}
    <div className="absolute bottom-0 left-0 w-full z-30 pointer-events-none">
      <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16">
        <path d="M0,0 C480,60 960,0 1440,60 L1440,0 L0,0 Z" fill="#fff" fillOpacity="1" />
      </svg>
    </div>
  </section>
);

const ResultsSection = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      {/* Titre et introduction */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-4">
          Nos résultats
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Des résultats concrets
        </h2>
        <p className="text-xl text-gray-600">
          Nos candidats trouvent des postes plus rapidement et avec de meilleures conditions
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Section Notre Impact */}
        <div className="bg-gray-50 rounded-3xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
            Notre Impact
          </h3>

          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                  <Users className="h-5 w-5 text-indigo-600" />
                </div>
                <span className="text-sm text-gray-500">Candidats</span>
              </div>
              <p className="text-4xl font-bold text-gray-900">+1200</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-amber-100 rounded-lg mr-3">
                  <Briefcase className="h-5 w-5 text-amber-600" />
                </div>
                <span className="text-sm text-gray-500">Entreprises</span>
              </div>
              <p className="text-4xl font-bold text-gray-900">+50</p>
            </div>
          </div>

          <div className="space-y-4 mb-10">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Accompagnement personnalisé</h4>
                <p className="text-gray-600 text-sm">Programmes adaptés à chaque profil</p>
              </div>
            </div>

            <div className="flex items-start">
              <TrendingUp className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Taux de réussite de 92%</h4>
                <p className="text-gray-600 text-sm">Intégration en entreprise réussie</p>
              </div>
            </div>

            <div className="flex items-start">
              <Community className="h-6 w-6 text-purple-500 flex-shrink-0 mt-1 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Communauté active</h4>
                <p className="text-gray-600 text-sm">Réseau de professionnels engagés</p>
              </div>
            </div>
          </div>

          <button className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-md">
            Explorer les opportunités
          </button>
        </div>

        {/* Section Témoignages et Partenaires */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
            Ils nous font confiance
          </h3>

          <Carousel className="mb-12">
            <CarouselContent>
              <CarouselItem>
                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                  <blockquote className="text-lg italic text-gray-700 mb-6">
                    "Mosala a transformé ma carrière. En 3 mois, j'ai trouvé un poste qui correspond parfaitement à mes compétences."
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-medium">SM</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Sarah M.</p>
                      <p className="text-sm text-gray-600">Développeuse Full-Stack, Tech Congo</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem>
                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                  <blockquote className="text-lg italic text-gray-700 mb-6">
                    "L'accompagnement sur-mesure m'a permis de négocier une augmentation de 30% par rapport à mon précédent poste."
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                      <span className="text-amber-600 font-medium">DK</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">David K.</p>
                      <p className="text-sm text-gray-600">Chef de projet, Innovation Hub</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>

          <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            Nos partenaires
          </h4>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["Tech Congo", "Innovation Hub", "Digital Academy", "Green Tech", "Social Impact"].map((partner) => (
              <div key={partner} className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                <span className="font-medium text-gray-800">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Hero = () => (
  <>
    <HeroSection />
    {/* ResultsSection sera désormais importé et utilisé ailleurs, après NotreMission */}
  </>
);

export default Hero;