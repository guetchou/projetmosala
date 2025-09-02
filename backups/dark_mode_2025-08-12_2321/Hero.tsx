import { useBlog } from "@/hooks/useBlog";
import { useKpis } from "@/hooks/useKpis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useNavbar } from "@/contexts/NavbarContext";
import { AnimatedCounter } from "./AnimatedCounter";
import { ArrowRight, Users, BookOpen, Briefcase, CheckCircle, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y, EffectFade } from 'swiper/modules';
import { useState, useRef } from 'react';
import { heroSlidesFallback, type HeroSlide } from '@/content/heroSlides';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "../../styles/hero.css";

const Hero = () => {
  const { data: posts = [], isLoading } = useBlog();
  const { kpis, isLoading: kpisLoading } = useKpis();
  const prefersReducedMotion = useReducedMotion();
  const { navbarHeight } = useNavbar();
  const [isAutoplayActive, setIsAutoplayActive] = useState(!prefersReducedMotion);
  const swiperRef = useRef<any>(null);

  // Utiliser les slides du blog si disponibles, sinon fallback
  const slides: HeroSlide[] = posts.length > 0 
    ? posts.slice(0, 4).map((post, index) => ({
        id: `post-${index}`,
        title: post.title || "Insertion professionnelle des jeunes au Congo",
        subtitle: post.excerpt || "Accompagnement personnalisé et formations adaptées",
        ctas: [
          { label: "Consulter les offres d'emploi", to: "/jobs", variant: 'primary' as const },
          { label: "Découvrir nos formations", to: "/formations", variant: 'secondary' as const }
        ],
        image: {
          original: post.image || "/topcenter-uploads/carrousel/mosala-jeunes1.png",
          focusY: "22%"
        }
      }))
    : heroSlidesFallback;

  const toggleAutoplay = () => {
    if (swiperRef.current?.swiper) {
      if (isAutoplayActive) {
        swiperRef.current.swiper.autoplay.stop();
      } else {
        swiperRef.current.swiper.autoplay.start();
      }
      setIsAutoplayActive(!isAutoplayActive);
    }
  };

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
      aria-label="Mises en avant Mosala"
      className="relative z-0 min-h-[calc(100svh-var(--nav-h,80px))] max-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: navbarHeight + 16 }}
    >
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, A11y, EffectFade]}
        effect="fade"
        speed={700}
        autoplay={prefersReducedMotion ? false : { delay: 6500, disableOnInteraction: false }}
        loop
        navigation={{ enabled: true }}
        pagination={{ 
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active'
        }}
        a11y={{ enabled: true }}
        className="hero-swiper w-full h-full"
        onAutoplayStart={() => setIsAutoplayActive(true)}
        onAutoplayStop={() => setIsAutoplayActive(false)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background image optimisée */}
              <picture className="absolute inset-0 w-full h-full z-0">
                {slide.image.webp2000 && (
                  <source
                    type="image/webp"
                    srcSet={`${slide.image.webp2000} 2000w, ${slide.image.webp1200 ?? slide.image.webp2000} 1200w`}
                    sizes="100vw"
                  />
                )}
                <img
                  src={slide.image.original}
                  alt={slide.title}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={index === 0 ? 'high' : undefined}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: `50% ${slide.image.focusY ?? '30%'}` }}
                />
              </picture>

              {/* Gradient Mosala subtil */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#00A651]/10 via-[#FFD700]/10 via-[#FFA500]/10 to-[#ED1C24]/10 z-5" />

              {/* Overlay pour lisibilité */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/25 z-10" />

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

                {index === 0 ? (
                  <motion.h1
                    {...animationConfig}
                    transition={{ ...animationConfig.transition, delay: 0.2 }}
                    className="text-3xl md:text-5xl font-black text-white mb-6 drop-shadow-xl max-w-4xl mx-auto leading-tight"
                  >
                    {slide.title}
                  </motion.h1>
                ) : (
                  <motion.div
                    {...animationConfig}
                    transition={{ ...animationConfig.transition, delay: 0.2 }}
                    role="heading"
                    aria-level={1}
                    className="text-3xl md:text-5xl font-black text-white mb-6 drop-shadow-xl max-w-4xl mx-auto leading-tight"
                  >
                    {slide.title}
                  </motion.div>
                )}

                {slide.subtitle && (
                  <motion.p
                    {...animationConfig}
                    transition={{ ...animationConfig.transition, delay: 0.4 }}
                    className="text-lg md:text-xl text-white/95 mb-10 max-w-3xl mx-auto font-medium leading-relaxed"
                  >
                    {slide.subtitle}
                  </motion.p>
                )}
                
                {/* Indicateurs professionnels (seulement sur le premier slide) */}
                {index === 0 && (
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
                )}
                
                {/* CTA avec accessibilité améliorée */}
                {slide.ctas && slide.ctas.length > 0 && (
                  <motion.div
                    {...animationConfig}
                    transition={{ ...animationConfig.transition, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                  >
                    {slide.ctas.map((cta, ctaIndex) => (
                      <a
                        key={ctaIndex}
                        href={cta.to}
                        className={`inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          cta.variant === 'primary'
                            ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-400'
                            : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 focus:ring-orange-400'
                        }`}
                        aria-label={cta.label}
                      >
                        {cta.label}
                        <ArrowRight className="w-5 h-5" />
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bouton pause/play pour l'autoplay */}
      {!prefersReducedMotion && (
        <button
          onClick={toggleAutoplay}
          className="absolute bottom-4 right-4 z-30 p-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label={isAutoplayActive ? "Pause du carrousel" : "Lecture du carrousel"}
          aria-pressed={isAutoplayActive}
        >
          {isAutoplayActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
      )}

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