import Navbar from "@/components/Navbar";
import Hero from "@/components/ui/Hero";
import ProjectIntro from "@/components/ui/ProjectIntro";
import Mission from "@/components/Mission";
import Features from "@/components/Features";
import ResultsSection from "@/components/ui/ResultsSection";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import CaravaneMosala from "@/components/CaravaneMosala";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import ActualitesSection from "@/components/ActualitesSection";
import PartnerSlider from "@/components/ui/PartnerSlider";
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
      {/* Container principal avec effet glassmorphism sur toute la page */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.68)',
        borderRadius: '0',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        zIndex: 10,
      }}>
      {/* Navbar en absolute au-dessus du Hero */}
        <Navbar ref={navbarRef} className="bg-white/60 backdrop-blur-md border border-white/40 shadow-lg absolute top-0 left-0 w-full z-30" />
        {/* ESPACE entre Navbar et Hero */}
        <div style={{ height: navbarHeight ? navbarHeight * 0.5 : 32 }} />
      {/* HERO UNESCO-STYLE, commence tout en haut */}
      <Hero />
        {/* Section d'intro projet Mosala */}
        <section className="bg-white/95 py-16 px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-4">Projet d'insertion professionnelle au Congo</h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-green-700">Mosala accompagne la jeunesse congolaise</h2>
          <p className="max-w-2xl mx-auto mb-10 text-gray-700">
            Projet financé par l’AFD et l’Union Européenne pour l’emploi des jeunes. Caravane itinérante, formations, accompagnement et mise en relation avec les opportunités locales.
          </p>
          {/* Section statistiques/chiffres clés */}
          {(() => {
            const stats = [
              {
                label: "Emplois disponibles",
                value: "15,000+",
                color: "#2fdab8",
                bg: "bg-[#2fdab8]/10",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                )
              },
              {
                label: "Entreprises partenaires",
                value: "500+",
                color: "#1cc7d0",
                bg: "bg-[#1cc7d0]/10",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 15h8M8 12h8M8 9h8" /></svg>
                )
              },
              {
                label: "Candidats formés",
                value: "25,000+",
                color: "#6476f3",
                bg: "bg-[#6476f3]/10",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="4" /><path d="M16 3v4M8 3v4" /></svg>
                )
              },
              {
                label: "Taux de satisfaction",
                value: "95%",
                color: "#fa496e",
                bg: "bg-[#fa496e]/10",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h.01" /><path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l6.39 7.11a1.65 1.65 0 0 0 2.42 0l6.39-7.11z" /></svg>
                )
              }
            ];
            return (
              <section className="py-10 bg-white">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                      <div key={idx} className={`rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition hover:scale-105 hover:shadow-2xl ${stat.bg}`}
                        style={{ color: stat.color }}>
                        <div className="mb-4">{stat.icon}</div>
                        <div className="text-3xl font-black mb-2">{stat.value}</div>
                        <div className="text-[#22304a] font-semibold">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          })()}
          <div className="mb-8 text-gray-600">
            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full mr-2">Projet AFD/UE</span>
            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full mr-2">6 villes visitées</span>
            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full">10,000+ jeunes sensibilisés</span>
          </div>
          <div className="mb-8 text-gray-700">Caravane itinérante • Accompagnement de proximité</div>
          <div>
            <a href="/jobs" className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow hover:bg-green-700 transition">Voir les emplois</a>
            <a href="/formations" className="inline-block ml-4 bg-white border border-green-600 text-green-700 px-8 py-4 rounded-lg font-bold text-lg shadow hover:bg-green-50 transition">Découvrir les formations</a>
          </div>
        </section>
      {/* Le reste du contenu commence après le Hero */}
      <main
        style={{ paddingTop: navbarHeight }}
        className="relative z-10"
      >
        {/* Section de présentation du projet Mosala */}
        <ActualitesSection />
          <section className="py-12 bg-[#6476f3]/10">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-black text-[#22304a] text-center mb-8">Nos partenaires</h2>
              {(() => {
                const partners = [
                  { name: "Agence Française de Développement", logo: "/topcenter-uploads/partenaires/afd.jpeg", website: "https://www.afd.fr" },
                  { name: "Union Européenne", logo: "/topcenter-uploads/partenaires/ue.jpeg", website: "https://europa.eu" },
                  { name: "Ministère de la Jeunesse", logo: "/topcenter-uploads/partenaires/ministere.jpeg", website: "https://gouvernement.cg" },
                  { name: "ACPE", logo: "/topcenter-uploads/partenaires/acpe.png", website: "https://acpe.cg" },
                  { name: "FONEA", logo: "/topcenter-uploads/partenaires/fonea.png", website: "https://fonea.cg" }
                ];
                return (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-center">
                    {partners.map((p, idx) => (
                      <a key={idx} href={p.website} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center transition hover:scale-105 hover:shadow-lg group">
                        <img src={p.logo} alt={p.name} className="max-h-12 w-auto object-contain mb-2" />
                        <span className="text-xs text-[#22304a] font-semibold group-hover:text-[#6476f3] transition">{p.name}</span>
                      </a>
                    ))}
                  </div>
                );
              })()}
            </div>
          </section>
        <section className="bg-white/90 backdrop-blur-sm py-12">
          <Mission />
        </section>
          <section className="py-12 bg-[#1cc7d0]/10">
          <div className="container mx-auto px-4">
              <span className="inline-block px-4 py-2 bg-[#1cc7d0]/20 text-[#1cc7d0] rounded-full text-sm font-semibold mb-6 tracking-widest shadow border border-[#1cc7d0]/30">
              Nos Actions
            </span>
              {(() => {
                const features = [
                  {
                    title: "Création d'emplois",
                    description: "Accompagnement des jeunes vers l'emploi local et durable, en lien avec les entreprises partenaires.",
                    color: "#6476f3",
                    bg: "bg-[#6476f3]/10",
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
                    )
                  },
                  {
                    title: "Formations innovantes",
                    description: "Des parcours de formation adaptés aux besoins du marché et aux aspirations des jeunes.",
                    color: "#fa496e",
                    bg: "bg-[#fa496e]/10",
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                    )
                  },
                  {
                    title: "Caravane itinérante",
                    description: "Des actions de proximité dans 6 villes du Congo pour sensibiliser et accompagner la jeunesse.",
                    color: "#ff7844",
                    bg: "bg-[#ff7844]/10",
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" /></svg>
                    )
                  }
                ];
                return (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                      <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition hover:scale-105 hover:shadow-2xl">
                        <div className={`mb-4 p-4 rounded-full ${feature.bg}`} style={{ color: feature.color }}>
                          {feature.icon}
                        </div>
                        <h3 className="font-bold text-lg text-[#22304a] mb-2">{feature.title}</h3>
                        <p className="text-gray-700">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                );
              })()}
          </div>
        </section>
        <section className="bg-white/90 backdrop-blur-sm py-12">
          <ResultsSection />
        </section>
        <section className="bg-white/90 backdrop-blur-sm py-12">
          <div className="container mx-auto px-4">
            <span className="inline-block px-4 py-2 bg-gray-100/90 backdrop-blur-sm text-gray-700 rounded-full text-sm font-semibold mb-6 tracking-widest shadow border border-gray-200/50">
              Témoignages
            </span>
            <Testimonials />
          </div>
        </section>
        <section className="bg-white/90 backdrop-blur-sm py-12">
          <CaravaneMosala />
        </section>
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
