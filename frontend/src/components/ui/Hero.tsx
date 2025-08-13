import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import { ArrowRight, Users, BookOpen, Briefcase, CheckCircle, Play, Pause } from "lucide-react";

import { useBlog } from "@/hooks/useBlog";
import { useKpis } from "@/hooks/useKpis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useNavbar } from "@/contexts/NavbarContext";
import { AnimatedCounter } from "./AnimatedCounter";
import { heroSlidesFallback, type HeroSlide } from "@/content/heroSlides";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/hero.css";

const Hero = () => {
  const { data: posts = [], isLoading } = useBlog();
  const { kpis, isLoading: kpisLoading } = useKpis();
  const prefersReducedMotion = useReducedMotion();
  const { navbarHeight } = useNavbar();

  const [isAutoplayActive, setIsAutoplayActive] = useState(!prefersReducedMotion);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const swiperRef = useRef<{ swiper: SwiperType } | null>(null);

  // Slides: blog si dispo, sinon fallback statique
  const slides: HeroSlide[] =
    posts.length > 0
      ? posts.slice(0, 4).map((post, index) => ({
          id: `post-${index}`,
          title: post.title || "Insertion professionnelle des jeunes au Congo",
          subtitle: post.excerpt || "Accompagnement personnalisé et formations adaptées",
          ctas: [
            { label: "Consulter les offres d'emploi", to: "/jobs", variant: "primary" as const },
            { label: "Découvrir nos formations", to: "/formations", variant: "secondary" as const },
          ],
          image: {
            original: post.image || "/topcenter-uploads/carrousel/mosala-jeunes1.png",
            focusY: "22%",
          },
        }))
      : heroSlidesFallback;

  const toggleAutoplay = () => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper) return;
    if (isAutoplayActive) swiper.autoplay?.stop();
    else swiper.autoplay?.start();
    setIsAutoplayActive((v) => !v);
  };

  // Animations respectant prefers-reduced-motion
  const animationConfig = prefersReducedMotion
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 } }
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 } };

  // KPIs sûrs (fallback à 0)
  const c = kpis?.candidates ?? 0;
  const j = kpis?.jobs ?? 0;
  const p = kpis?.partners ?? 0;

  // Hauteur de la navbar (fallback 64) pour OFFSET interne
  const navH = (navbarHeight ?? 64) + 16;

  // Effet de scale automatique sur les images
  useEffect(() => {
    const images = document.querySelectorAll('.hero-image-scale');
    images.forEach((img, index) => {
      if (index === activeSlideIndex) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
    });
  }, [activeSlideIndex]);

  // Transition automatique des éléments de contenu
  const contentVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -30, 
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section
      role="region"
      aria-roledescription="carrousel"
      aria-label="Mises en avant Mosala"
      className={`relative z-0 min-h-[90vh] max-h-[100vh] overflow-hidden hero-section ${
        activeSlideIndex === 0 ? 'slide-1-active' : ''
      }`}
      style={{ paddingTop: navH }}
    >
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, A11y, EffectFade]}
        effect="fade"
        speed={800}
        loop
        navigation={{ enabled: true }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        autoplay={
          prefersReducedMotion
            ? false
            : {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
        }
        a11y={{ enabled: true }}
        className="hero-swiper w-full h-full absolute inset-0"
        onAutoplayStart={() => setIsAutoplayActive(true)}
        onAutoplayStop={() => setIsAutoplayActive(false)}
        onSlideChange={(s) => {
          setIsTransitioning(true);
          setActiveSlideIndex(s.realIndex);
          // cache les slides inactifs pour SR
          s.slides.forEach((el, i) => el.setAttribute("aria-hidden", String(i !== s.activeIndex)));
          
          // Reset transition state after animation
          setTimeout(() => setIsTransitioning(false), 800);
        }}
        onSlideChangeTransitionStart={() => setIsTransitioning(true)}
        onSlideChangeTransitionEnd={() => setIsTransitioning(false)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full scale-in">
              {/* Image de fond optimisée avec effet scale automatique */}
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
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className={`absolute inset-0 w-full h-full object-cover hero-image-scale ${!prefersReducedMotion ? 'hero-float' : ''}`}
                  style={{ 
                    objectPosition: index === 0 
                      ? `50% 35%` 
                      : `50% ${(parseInt(slide.image.focusY ?? "28") + 10)}%`
                  }}
                  // @ts-expect-error: React typings ne connaissent pas encore l'attribut fetchpriority
                  fetchpriority={index === 0 ? "high" : undefined}
                />
              </picture>

              {/* Gradient Mosala subtil */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#00A651]/10 via-[#FFD700]/10 via-[#FFA500]/10 to-[#ED1C24]/10 z-10" />

              {/* Overlay de lisibilité */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/25 z-20 dark:from-black/50 dark:via-black/40 dark:to-black/25" />

              {/* Contenu éditorial avec glassmorphism et transitions automatiques */}
              <div className="relative z-30 w-full h-full flex flex-col items-center justify-center text-center px-4 min-h-[600px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${slide.id}-content`}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full max-w-6xl"
                  >
                    {/* Badge avec transition automatique */}
                    <motion.div variants={itemVariants} className="mb-3">
                      <span className={`inline-flex items-center gap-1 glassmorphism-content dark:glassmorphism-content-dark text-white rounded-full font-semibold ${
                        index === 0 
                          ? "px-3 py-1 text-sm" 
                          : "px-3 py-1 text-xs"
                      }`}>
                        <CheckCircle className={index === 0 ? "w-3 h-3" : "w-3 h-3"} />
                        Projet financé par l'AFD et l'Union Européenne
                      </span>
                    </motion.div>

                    {/* Titre avec transition automatique */}
                    <motion.div variants={itemVariants} className="mb-4">
                      {index === 0 ? (
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-xl max-w-4xl mx-auto leading-tight">
                          {slide.title}
                        </h1>
                      ) : (
                        <div
                          role="heading"
                          aria-level={1}
                          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-xl max-w-4xl mx-auto leading-tight"
                        >
                          {slide.title}
                        </div>
                      )}
                    </motion.div>

                    {/* Sous-titre avec transition automatique */}
                    {slide.subtitle && (
                      <motion.div variants={itemVariants} className="mb-6">
                        <p className={`text-white/95 max-w-3xl mx-auto font-medium leading-relaxed ${
                          index === 0 
                            ? "text-sm sm:text-base md:text-lg lg:text-xl" 
                            : "text-sm sm:text-base md:text-lg lg:text-xl"
                        }`}>
                          {slide.subtitle}
                        </p>
                      </motion.div>
                    )}

                    {/* KPIs uniquement sur le 1er slide avec transitions automatiques */}
                    {index === 0 && (
                      <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 max-w-4xl mx-auto"
                        aria-live="polite"
                      >
                        {/* Candidats */}
                        <motion.div 
                          variants={itemVariants}
                          className="flex flex-col items-center text-white/90 scale-transition"
                        >
                          <div className="glassmorphism dark:glassmorphism-dark p-1.5 rounded-lg mb-1">
                            <Users className="w-4 h-4 text-green-400" />
                          </div>
                          {kpisLoading ? (
                            <div className="h-4 w-12 rounded bg-white/30 animate-pulse mb-1" />
                          ) : (
                            <AnimatedCounter
                              value={c}
                              className="text-lg font-bold text-white"
                              suffix="+"
                              aria-label={`${c.toLocaleString("fr-FR")} candidats accompagnés`}
                            />
                          )}
                          <span className="text-sm font-medium">Candidats accompagnés</span>
                        </motion.div>

                        {/* Emplois */}
                        <motion.div 
                          variants={itemVariants}
                          className="flex flex-col items-center text-white/90 scale-transition"
                        >
                          <div className="glassmorphism dark:glassmorphism-dark p-1.5 rounded-lg mb-1">
                            <Briefcase className="w-4 h-4 text-green-400" />
                          </div>
                          {kpisLoading ? (
                            <div className="h-4 w-12 rounded bg-white/30 animate-pulse mb-1" />
                          ) : (
                            <AnimatedCounter
                              value={j}
                              className="text-lg font-bold text-white"
                              suffix="+"
                              aria-label={`${j.toLocaleString("fr-FR")} emplois disponibles`}
                            />
                          )}
                          <span className="text-sm font-medium">Emplois disponibles</span>
                        </motion.div>

                        {/* Partenaires */}
                        <motion.div 
                          variants={itemVariants}
                          className="flex flex-col items-center text-white/90 scale-transition"
                        >
                          <div className="glassmorphism dark:glassmorphism-dark p-1.5 rounded-lg mb-1">
                            <BookOpen className="w-4 h-4 text-green-400" />
                          </div>
                          {kpisLoading ? (
                            <div className="h-4 w-12 rounded bg-white/30 animate-pulse mb-1" />
                          ) : (
                            <AnimatedCounter
                              value={p}
                              className="text-lg font-bold text-white"
                              suffix="+"
                              aria-label={`${p.toLocaleString("fr-FR")} entreprises partenaires`}
                            />
                          )}
                          <span className="text-sm font-medium">Entreprises partenaires</span>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* CTA avec glassmorphism et transitions automatiques */}
                    {slide.ctas && slide.ctas.length > 0 && (
                      <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                      >
                        {slide.ctas.map((cta, ctaIndex) => (
                          <motion.div
                            key={ctaIndex}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link
                              to={cta.to}
                              className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 scale-transition ${
                                cta.variant === "primary"
                                  ? "bg-green-600 text-white hover:bg-green-700 focus:ring-green-400"
                                  : "glassmorphism-content dark:glassmorphism-content-dark text-white hover:bg-white/30 focus:ring-orange-400"
                              }`}
                              aria-label={cta.label}
                            >
                              {cta.label}
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bouton pause/lecture avec glassmorphism */}
      {!prefersReducedMotion && (
        <motion.button
          onClick={toggleAutoplay}
          className="absolute bottom-4 right-4 z-40 p-3 glassmorphism dark:glassmorphism-dark text-white rounded-full hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 scale-transition"
          aria-label={isAutoplayActive ? "Pause du carrousel" : "Lecture du carrousel"}
          aria-pressed={isAutoplayActive}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isAutoplayActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </motion.button>
      )}

      {/* Loading overlay pour le feed blog avec glassmorphism */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center glassmorphism dark:glassmorphism-dark z-50">
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
