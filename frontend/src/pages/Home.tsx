import Navbar from "@/components/Navbar";
import Hero from "@/components/ui/Hero";
import Footer from "@/components/Footer";
import PartnerSlider from "@/components/ui/PartnerSlider";
import TrustSection from "@/components/ui/TrustSection";
import FeaturesSection from "@/components/ui/FeaturesSection";
import BlogSection from "@/components/ui/BlogSection";
import { useRef, useEffect, useState } from "react";

const Home = () => {
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
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar ref={navbarRef} />
      <main className="flex-1" style={{ paddingTop: navbarHeight }}>
        {/* Section Hero améliorée */}
        <Hero />
        
        {/* Section de confiance et social proof */}
        <TrustSection />
        
        {/* Section des fonctionnalités clés */}
        <FeaturesSection />
        
        {/* Section blog et ressources */}
        <BlogSection />
        
        {/* Section des partenaires */}
        <PartnerSlider />
      </main>
      <Footer />
    </div>
  );
};

export default Home;