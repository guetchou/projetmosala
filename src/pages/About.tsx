
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRef, useEffect, useState } from "react";

const About = () => {
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
    <div className="min-h-screen flex flex-col bg-[#F7F7F7] text-gray-900 font-sans" style={{ paddingTop: navbarHeight }}>
      <Navbar ref={navbarRef} />
      {/* Header UNESCO-style */}
      <section className="w-full flex flex-col items-center justify-center min-h-[180px] py-10 mb-0 bg-white border-b border-gray-200">
        <div className="flex flex-col items-center text-center px-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">À propos de Mosala</h1>
          <div className="w-16 h-1 bg-yellow-400 rounded-full mb-4" />
          <p className="text-lg md:text-xl text-gray-600 mb-2">
            Mosala œuvre pour l’inclusion, l’innovation et l’accompagnement des jeunes vers l’emploi au Congo.
          </p>
        </div>
      </section>
      {/* Corps de page institutionnel */}
      <section className="container mx-auto px-4 py-12 max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Notre mission</h2>
        <p className="text-lg text-gray-700 mb-6">
          Mosala accompagne la jeunesse congolaise vers l’emploi, l’innovation et l’inclusion, en mettant l’accent sur l’accessibilité, la formation et l’accompagnement personnalisé.
        </p>
        <h3 className="text-xl font-semibold mb-2">Nos valeurs</h3>
        <ul className="list-disc pl-6 text-gray-700 mb-6">
          <li>Inclusion</li>
          <li>Innovation</li>
          <li>Proximité</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2">Notre équipe</h3>
        <p className="text-lg text-gray-700 mb-6">
          Une équipe passionnée, engagée pour l’avenir professionnel de la jeunesse congolaise.
        </p>
      </section>
      <Footer />
    </div>
  );
};

export default About;
 