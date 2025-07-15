import Navbar from "@/components/Navbar";
import Hero from "@/components/ui/Hero";
import Footer from "@/components/Footer";
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-mosala-green-50 via-mosala-yellow-50 to-mosala-dark-50">
      <Navbar ref={navbarRef} />
      <main className="flex-1" style={{ paddingTop: navbarHeight }}>
        <Hero />
        {/* Ajoute ici d'autres sections (ex: stats, témoignages, partenaires, etc.) */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;