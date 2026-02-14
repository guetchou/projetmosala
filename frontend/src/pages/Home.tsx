import Navbar from "@/components/Navbar";
import Hero from "@/components/ui/Hero";
import Footer from "@/components/Footer";
import PartnerSlider from "@/components/ui/PartnerSlider";
import NewsSection from "@/components/NewsSection";
import { useRef, useEffect, useState } from "react";
import { MapPin, Users, Award, Briefcase, TrendingUp, Globe } from "lucide-react";
import { motion } from "framer-motion";

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

  // Animation config
  const animationConfig = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true, margin: "-100px" }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar ref={navbarRef} />
      <main className="flex-1" style={{ paddingTop: navbarHeight }}>
        {/* Section 1: Hero (Conservation) */}
        <Hero />
        
        {/* Section 2: Contexte & Vision */}
        <section className="py-16 md:py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              {...animationConfig}
              className="text-4xl md:text-5xl font-bold text-primary mb-12 text-center"
            >
              Une ambition nationale pour l'emploi des jeunes
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Colonne gauche: Texte */}
              <motion.div {...animationConfig} className="flex flex-col justify-center">
                <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                  Le Congo fait face à une crise de l'emploi des jeunes. Avec 37% de jeunes en situation de NEET (ni emploi, ni études, ni formation), le marché du travail s'est considérablement détériorisé ces dernières années.
                </p>
                <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                  Les femmes et les minorités sont particulièrement touchées. Le manque de formation professionnelle qualifiante reste la barrière principale à l'insertion durable des jeunes.
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed font-semibold text-primary">
                  Mosala répond à cette urgence en offrant des formations certifiées, un accompagnement personnalisé et un accès direct aux employeurs.
                </p>
              </motion.div>
              
              {/* Colonne droite: Chiffres clés */}
              <motion.div 
                {...animationConfig}
                className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20"
              >
                <h3 className="text-2xl font-bold text-primary mb-8">Le défi en chiffres</h3>
                
                <div className="space-y-8">
                  <div className="border-l-4 border-primary pl-6">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Chômage des jeunes</p>
                    <p className="text-5xl font-bold text-primary mt-2">37%</p>
                    <p className="text-sm text-foreground/70 mt-1">jeunes en situation de NEET</p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-6">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Taux d'emploi</p>
                    <p className="text-5xl font-bold text-primary mt-2">19%</p>
                    <p className="text-sm text-foreground/70 mt-1">seulement dans l'emploi formel</p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-6">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Barrière majeure</p>
                    <p className="text-2xl font-bold text-primary mt-2">Manque de formation</p>
                    <p className="text-sm text-foreground/70 mt-1">Principal obstacle à l'insertion</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Section 3: Actualités (Conservation) */}
        <NewsSection />
        
        {/* Section 4: Pour qui ? (Impact) */}
        <section className="py-16 md:py-20 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              {...animationConfig}
              className="text-4xl md:text-5xl font-bold text-primary mb-12 text-center"
            >
              Pour qui ?
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Bénéficiaires */}
              <motion.div {...animationConfig} className="text-center">
                <div className="bg-primary/10 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-6">
                  <Users className="w-12 h-12 text-primary" />
                </div>
                <p className="text-5xl md:text-6xl font-bold text-primary mb-3">5 000</p>
                <p className="text-lg text-foreground font-semibold mb-2">jeunes bénéficiaires</p>
                <p className="text-muted-foreground">50% de femmes, priorité aux zones rurales</p>
              </motion.div>
              
              {/* Services publics */}
              <motion.div 
                {...animationConfig}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <div className="bg-primary/10 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-6">
                  <Award className="w-12 h-12 text-primary" />
                </div>
                <p className="text-5xl md:text-6xl font-bold text-primary mb-3">3</p>
                <p className="text-lg text-foreground font-semibold mb-2">services publics renforcés</p>
                <p className="text-muted-foreground">DGFE, FONEA, ACPE</p>
              </motion.div>
              
              {/* Formations */}
              <motion.div 
                {...animationConfig}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="bg-primary/10 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-6">
                  <Briefcase className="w-12 h-12 text-primary" />
                </div>
                <p className="text-lg text-foreground font-semibold mb-2">Formations certifiées</p>
                <p className="text-muted-foreground">dans les secteurs clés (Tech, Services, Entrepreneuriat)</p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Section 5: Les Composantes */}
        <section className="py-16 md:py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              {...animationConfig}
              className="text-4xl md:text-5xl font-bold text-primary mb-12 text-center"
            >
              Nos Composantes
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* DGFE */}
              <motion.div 
                {...animationConfig}
                className="bg-white rounded-2xl p-8 shadow-md border border-slate-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">DGFE</h3>
                </div>
                <p className="text-foreground/70 leading-relaxed">
                  Direction Générale des Finances et de l'Équipement — Coordination gouvernementale et pilotage stratégique du projet
                </p>
              </motion.div>
              
              {/* FONEA */}
              <motion.div 
                {...animationConfig}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-md border border-slate-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">FONEA</h3>
                </div>
                <p className="text-foreground/70 leading-relaxed">
                  Fonds National d'Appui à l'Employabilité et à l'Apprentissage — Financement des formations et accompagnement des bénéficiaires
                </p>
              </motion.div>
              
              {/* ACPE */}
              <motion.div 
                {...animationConfig}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-md border border-slate-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">ACPE</h3>
                </div>
                <p className="text-foreground/70 leading-relaxed">
                  Agence Congolaise Pour l'Emploi — Mise en relation avec les employeurs et placement des jeunes
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Section 6: Zones d'Intervention */}
        <section className="py-16 md:py-20 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              {...animationConfig}
              className="text-4xl md:text-5xl font-bold text-primary mb-12 text-center"
            >
              Zones d'intervention
            </motion.h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Brazzaville", emoji: "🏢" },
                { name: "Pointe-Noire", emoji: "🌊" },
                { name: "Niari", emoji: "🌳" },
                { name: "Sangha", emoji: "🏞️" }
              ].map((zone, idx) => (
                <motion.div
                  key={zone.name}
                  {...animationConfig}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{zone.name}</p>
                  <p className="text-4xl mt-2">{zone.emoji}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Section 7: Partenaires (Conservation) */}
        <PartnerSlider />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
export default Home;