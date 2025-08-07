import Navbar from "@/components/Navbar";
import Hero from "@/components/ui/Hero";
import ProjectIntro from "@/components/ProjectIntro";
import TargetAudience from "@/components/TargetAudience";
import PartnersSection from "@/components/PartnersSection";
import ServicesSection from "@/components/ServicesSection";
import CaravaneMosala from "@/components/CaravaneMosala";
import Mission from "@/components/Mission";
import ResultsSection from "@/components/ui/ResultsSection";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import ActualitesSection from "@/components/ActualitesSection";
import { useRef, useEffect, useState } from "react";

/*
  -----------------------------------------------------------------------------
  MOSALA UI PATTERN : UNIFICATION NAVBAR + HERO (PAGE ACCUEIL)
  -----------------------------------------------------------------------------
  Ce fichier applique le modèle Mosala pour unifier l'arrière-plan de la navbar
  et du Hero (carrousel d'images en haut de page) :

  - Le background (couleur ou gradient) est appliqué sur le container principal
    (div parent), qui englobe la navbar et le Hero.
  - La Navbar est rendue en bg-transparent, sans bordure ni ombre basse.
  - La section Hero n'a pas de background propre : elle hérite du parent.
  - Résultat : la transition visuelle entre la navbar et le Hero est parfaitement
    fluide, sans coupure ni différence de couleur.

  Pattern recommandé pour toutes les pages Mosala avec Hero visuel.
  -----------------------------------------------------------------------------
*/
const Index = () => {
  const navbarRef = useRef<HTMLElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
    const handleResize = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen text-gray-900 font-sans relative bg-gradient-to-br from-green-50 via-emerald-50 to-lime-100">
      {/* Container principal avec effet glassmorphism optimisé pour mobile */}
      <div 
        className="relative w-full h-full min-h-screen glassmorphism-desktop md:glassmorphism-desktop"
        style={{
          borderRadius: '0',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          zIndex: 10,
        }}
      >
        {/* Navbar en absolute au-dessus du Hero */}
        <Navbar ref={navbarRef} className="bg-white/40 backdrop-blur-md border border-white/30 shadow-lg absolute top-0 left-0 w-full z-30" />
        
        {/* HERO UNESCO-STYLE, commence tout en haut, passe sous la navbar */}
        <div style={{ position: 'relative', zIndex: 20 }}>
          <Hero navbarHeight={navbarHeight} />
        </div>
        
        {/* Section d'introduction du projet */}
        <ProjectIntro />
        
        {/* Le reste du contenu commence après le Hero */}
        <main
          style={{ paddingTop: navbarHeight }}
          className="relative z-10"
        >
          {/* Section actualités */}
          <ActualitesSection />
          
          {/* Section public cible */}
          <TargetAudience />
          
          {/* Section caravane Mosala */}
          <CaravaneMosala />
          
          {/* Section partenaires */}
          <PartnersSection />
          
          {/* Section mission */}
          <section className="bg-white/90 backdrop-blur-sm py-12">
            <Mission />
          </section>
          
          {/* Section services */}
          <ServicesSection />
          
          {/* Section résultats */}
          <section className="bg-white/90 backdrop-blur-sm py-12">
            <ResultsSection />
          </section>
          
          {/* Section témoignages */}
          <section className="bg-white/90 backdrop-blur-sm py-12">
            <div className="container mx-auto px-4">
              <span className="inline-block px-4 py-2 bg-gray-100/90 backdrop-blur-sm text-gray-700 rounded-full text-sm font-semibold mb-6 tracking-widest shadow border border-gray-200/50">
                Témoignages
              </span>
              <Testimonials />
            </div>
          </section>
          
          {/* Section newsletter */}
          <section className="bg-white/90 backdrop-blur-sm py-12">
            <Newsletter />
          </section>
          
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Index;
