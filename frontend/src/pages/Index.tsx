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
import { useRef } from "react";

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

  return (
    <div className="min-h-screen text-gray-900 font-sans relative">
      {/* Navbar en fixed au-dessus du Hero */}
      <Navbar ref={navbarRef} className="bg-white/60 backdrop-blur-lg border border-white/40 shadow-xl fixed top-0 left-0 w-full z-50" />
      
      {/* HERO en premier, sans gradient de fond */}
      <Hero />
      
      {/* Container principal avec gradient pour le reste du contenu */}
      <div className="relative bg-gradient-to-r from-[#fef08a] via-[#84cc16] to-[#16a34a]">
        
        {/* Section d'introduction du projet */}
        <ProjectIntro />
        
        {/* Le reste du contenu commence après le Hero */}
        <main
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
          <section className="bg-white/95 backdrop-blur-md py-12 shadow-lg">
            <Mission />
          </section>
          
          {/* Section services */}
          <ServicesSection />
          
          {/* Section résultats */}
          <section className="bg-white/95 backdrop-blur-md py-12 shadow-lg">
            <ResultsSection />
          </section>
          
          {/* Section témoignages */}
          <section className="bg-white/95 backdrop-blur-md py-12 shadow-lg">
            <div className="container mx-auto px-4">
              <span className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full text-sm font-semibold mb-6 tracking-widest shadow border border-white/60">
                Témoignages
              </span>
              <Testimonials />
            </div>
          </section>
          
          {/* Section newsletter */}
          <section className="bg-white/95 backdrop-blur-md py-12 shadow-lg">
            <Newsletter />
          </section>
          
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Index;
