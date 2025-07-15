import Navbar from "@/components/Navbar";
import Hero from "@/components/ui/Hero";
import Mission from "@/components/Mission";
import Features from "@/components/Features";
import ResultsSection from "@/components/ui/ResultsSection";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import CaravaneMosala from "@/components/CaravaneMosala";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import ActualitesSection from "@/components/ActualitesSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navbar institutionnelle */}
      <Navbar />

      {/* HERO UNESCO-STYLE */}
      <Hero />

      {/* Séparateur décoratif SVG */}
      <Separator className="my-0 h-4 bg-gradient-to-r from-[#0077C8]/10 via-[#FFD500]/10 to-[#0077C8]/10 border-0" />

      {/* SECTION MISSION (badge, titre, texte, illustration) */}
      <section className="bg-[#F5F7FA] py-20">
        <Mission />
      </section>

      {/* Séparateur décoratif SVG */}
      <Separator className="my-0 h-4 bg-gradient-to-r from-[#FFD500]/10 via-[#0077C8]/10 to-[#FFD500]/10 border-0" />

      {/* SECTION ACTIONS/SERVICES (grille de cartes, badges, icônes) */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <span className="inline-block px-4 py-2 bg-[#0077C8]/10 text-[#0077C8] rounded-full text-sm font-semibold mb-8 tracking-widest shadow">
            Nos Actions
          </span>
          <Features />
        </div>
      </section>

      {/* Séparateur décoratif SVG */}
      <Separator className="my-0 h-4 bg-gradient-to-r from-[#0077C8]/10 via-[#FFD500]/10 to-[#0077C8]/10 border-0" />

      {/* SECTION CHIFFRES CLÉS / IMPACT */}
      <section className="bg-[#F5F7FA] py-20">
        <ResultsSection />
      </section>

      {/* Séparateur décoratif SVG */}
      <Separator className="my-0 h-4 bg-gradient-to-r from-[#FFD500]/10 via-[#0077C8]/10 to-[#FFD500]/10 border-0" />

      {/* SECTION TÉMOIGNAGES */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <span className="inline-block px-4 py-2 bg-[#FFD500]/20 text-[#B8860B] rounded-full text-sm font-semibold mb-8 tracking-widest shadow">
            Témoignages
          </span>
          <Testimonials />
        </div>
      </section>

      {/* Séparateur décoratif SVG */}
      <Separator className="my-0 h-4 bg-gradient-to-r from-[#0077C8]/10 via-[#FFD500]/10 to-[#0077C8]/10 border-0" />

      {/* SECTION CARAVANE MOSALA (événementiel, institutionnel UNESCO) */}
      <section className="bg-[#F5F7FA] py-20">
        <CaravaneMosala />
      </section>

      {/* Séparateur décoratif SVG */}
      <Separator className="my-0 h-4 bg-gradient-to-r from-[#FFD500]/10 via-[#0077C8]/10 to-[#FFD500]/10 border-0" />

      {/* SECTION ACTUALITÉS / PUBLICATIONS UNESCO-STYLE */}
      <ActualitesSection />

      {/* SECTION NEWSLETTER */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <span className="inline-block px-4 py-2 bg-[#0077C8]/10 text-[#0077C8] rounded-full text-sm font-semibold mb-8 tracking-widest shadow">
            Restez informé
          </span>
          <Newsletter />
        </div>
      </section>

      {/* FOOTER institutionnel */}
      <Footer />
    </div>
  );
};

export default Index;
