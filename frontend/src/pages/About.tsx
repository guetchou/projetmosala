

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { motion, useReducedMotion } from "framer-motion";
import { Users, Award, Globe, Shield, Heart, Briefcase, CheckCircle } from "lucide-react";
import { useEffect } from "react";

const team = [
  { name: "Jean Mosala", role: "Directeur de projet", avatar: "/topcenter-uploads/avatars/jean-mosala.png" },
  { name: "Bertille NGUIE", role: "Responsable technique", avatar: "/topcenter-uploads/avatars/bertille.png" },
  { name: "Marie-Claire ANGALA", role: "RH & Inclusion", avatar: "/topcenter-uploads/avatars/marieclaire.png" },
  { name: "David ITOBA", role: "Design & Accessibilité", avatar: "/topcenter-uploads/avatars/david.png" },
  { name: "Jean-Pierre KIBANGOU", role: "Chef de projet", avatar: "/topcenter-uploads/avatars/jeanpierre.png" },
];

const partners = [
  { name: "AFD", logo: "/topcenter-uploads/partenaires/afd.jpeg", url: "https://www.afd.fr" },
  { name: "Union Européenne", logo: "/topcenter-uploads/partenaires/ue.jpeg", url: "https://europa.eu" },
  { name: "Ministère de la Jeunesse", logo: "/topcenter-uploads/partenaires/ministere.jpeg", url: "https://gouvernement.cg" },
  { name: "ACPE", logo: "/topcenter-uploads/partenaires/acpe.png", url: "https://acpe.cg" },
  { name: "FONEA", logo: "/topcenter-uploads/partenaires/fonea.png", url: "https://fonea.cg" },
];

const values = [
  { icon: <Heart className="h-6 w-6 text-[#fa496e]" />, title: "Inclusion", desc: "Favoriser l'accès à l'emploi pour tous, sans discrimination." },
  { icon: <Award className="h-6 w-6 text-[#2fdab8]" />, title: "Excellence", desc: "Former et accompagner avec exigence et bienveillance." },
  { icon: <Shield className="h-6 w-6 text-[#6476f3]" />, title: "Sécurité & RGPD", desc: "Respect total de la vie privée, conformité RGPD, sécurité des données." },
  { icon: <Globe className="h-6 w-6 text-[#ff7844]" />, title: "Ouverture", desc: "S'inspirer des meilleures pratiques européennes et africaines." },
  { icon: <CheckCircle className="h-6 w-6 text-[#BFFF00]" />, title: "Transparence", desc: "Information claire, traçabilité, éthique dans toutes nos actions." },
];

// Composant pour injecter les données structurées JSON-LD
const StructuredData = () => {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Mosala",
      "description": "Projet d'insertion professionnelle financé par l'AFD et l'Union Européenne, dédié à la jeunesse congolaise",
      "url": "https://mosala.cg",
      "logo": "https://mosala.cg/topcenter-uploads/Logo-Mosala/logo-mosala1.png",
      "foundingDate": "2024",
      "location": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "CG",
          "addressRegion": "Brazzaville"
        }
      },
      "sameAs": [
        "https://www.afd.fr",
        "https://europa.eu"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services d'insertion professionnelle",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Formation professionnelle",
              "description": "Formations certifiantes et coaching pour les jeunes"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Accompagnement à l'emploi",
              "description": "Mise en relation avec les employeurs"
            }
          }
        ]
      },
      "employee": team.map(member => ({
        "@type": "Person",
        "name": member.name,
        "jobTitle": member.role
      }))
    };

    // Supprimer l'ancien script s'il existe
    const existingScript = document.querySelector('script[data-structured-data="mosala"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Créer et injecter le nouveau script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-structured-data', 'mosala');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Nettoyer lors du démontage
    return () => {
      const scriptToRemove = document.querySelector('script[data-structured-data="mosala"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null;
};

const About = () => {
  const shouldReduceMotion = useReducedMotion();

  // Configuration des animations respectant les préférences utilisateur
  const animationConfig = {
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: shouldReduceMotion ? { duration: 0.1 } : { duration: 0.6 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[var(--color-mosala-green-50)] via-[var(--color-mosala-yellow-50)] to-[var(--color-mosala-dark-50)]">
      <StructuredData />
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-24 md:pt-32 max-w-6xl">
        {/* Header éditorial */}
        <motion.div
          {...animationConfig}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] p-6 rounded-2xl shadow-lg">
              <Users className="h-10 w-10 text-[var(--color-mosala-white)]" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-transparent bg-clip-text leading-tight">
            À propos de Mosala
          </h1>
          <p className="text-xl text-[var(--color-mosala-dark-600)] max-w-3xl mx-auto leading-relaxed">
            Mosala est un projet d'insertion professionnelle financé par l'AFD et l'Union Européenne, dédié à la jeunesse congolaise. Notre mission : accompagner chaque jeune vers l'emploi durable, l'autonomie et l'excellence, dans le respect des normes européennes et de l'inclusion.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.section
          {...animationConfig}
          transition={{ ...animationConfig.transition, delay: shouldReduceMotion ? 0 : 0.1 }}
          className="mb-16 bg-[var(--color-mosala-white)]/95 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-[var(--color-mosala-green-100)]"
        >
          <h2 className="text-3xl font-bold mb-6 text-[var(--color-mosala-dark-900)] flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-[#2fdab8]" />
            Notre mission
          </h2>
          <p className="text-lg text-[var(--color-mosala-dark-700)] mb-6 leading-relaxed">
            Offrir à chaque jeune du Congo les moyens de réussir professionnellement, grâce à des formations innovantes, un accompagnement personnalisé, et une mise en relation directe avec les employeurs.
          </p>
          <ul className="list-none space-y-3">
            {[
              "Caravane itinérante dans 6 villes",
              "Formations certifiantes et coaching",
              "Plateforme digitale accessible et sécurisée",
              "Accompagnement à l'entrepreneuriat"
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-[var(--color-mosala-dark-600)]">
                <div className="w-2 h-2 bg-[#2fdab8] rounded-full flex-shrink-0"></div>
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Valeurs */}
        <motion.section
          {...animationConfig}
          transition={{ ...animationConfig.transition, delay: shouldReduceMotion ? 0 : 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-12 text-[var(--color-mosala-dark-900)] flex items-center gap-3 justify-center">
            <Heart className="h-8 w-8 text-[#fa496e]" />
            Nos valeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div 
                key={i} 
                {...animationConfig}
                transition={{ ...animationConfig.transition, delay: shouldReduceMotion ? 0 : 0.2 + i * 0.1 }}
                className="bg-[var(--color-mosala-white)]/90 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-[var(--color-mosala-green-100)] hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  {v.icon}
                  <h3 className="font-bold text-xl text-[var(--color-mosala-dark-900)]">{v.title}</h3>
                </div>
                <p className="text-[var(--color-mosala-dark-600)] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Équipe */}
        <motion.section
          {...animationConfig}
          transition={{ ...animationConfig.transition, delay: shouldReduceMotion ? 0 : 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-12 text-[var(--color-mosala-dark-900)] flex items-center gap-3 justify-center">
            <Users className="h-8 w-8 text-[#6476f3]" />
            L'équipe Mosala
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {team.map((m, i) => (
              <motion.div 
                key={i} 
                {...animationConfig}
                transition={{ ...animationConfig.transition, delay: shouldReduceMotion ? 0 : 0.3 + i * 0.1 }}
                className="bg-[var(--color-mosala-white)]/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-[var(--color-mosala-green-100)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <OptimizedImage 
                  src={m.avatar} 
                  alt={`Photo de ${m.name}`} 
                  className="w-24 h-24 rounded-full mb-4 border-4 border-white shadow-lg mx-auto"
                  fallback="/topcenter-uploads/avatars/default-avatar.svg"
                  width={96}
                  height={96}
                />
                <h3 className="font-bold text-lg text-[var(--color-mosala-dark-900)] mb-2 text-center">{m.name}</h3>
                <div className="text-sm text-[var(--color-mosala-dark-600)] text-center">{m.role}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Partenaires */}
        <motion.section
          {...animationConfig}
          transition={{ ...animationConfig.transition, delay: shouldReduceMotion ? 0 : 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-12 text-[var(--color-mosala-dark-900)] flex items-center gap-3 justify-center">
            <Globe className="h-8 w-8 text-[#ff7844]" />
            Nos partenaires
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-center">
            {partners.map((p, idx) => (
              <motion.a 
                key={idx} 
                href={p.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                {...animationConfig}
                transition={{ ...animationConfig.transition, delay: shouldReduceMotion ? 0 : 0.4 + idx * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl group focus:outline-none focus:ring-2 focus:ring-[var(--color-mosala-green-500)] focus:ring-offset-2"
                aria-label={`Visiter le site de ${p.name}`}
              >
                <OptimizedImage 
                  src={p.logo} 
                  alt={`Logo ${p.name}`} 
                  className="max-h-16 w-auto object-contain mb-4"
                  fallback="/topcenter-uploads/partenaires/default-logo.svg"
                  width={64}
                  height={64}
                />
                <span className="text-sm text-[#22304a] font-semibold group-hover:text-[#6476f3] transition-colors">{p.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Engagements */}
        <motion.section
          {...animationConfig}
          transition={{ ...animationConfig.transition, delay: shouldReduceMotion ? 0 : 0.5 }}
          className="mb-16 bg-[var(--color-mosala-white)]/95 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-[var(--color-mosala-green-100)]"
        >
          <h2 className="text-3xl font-bold mb-6 text-[var(--color-mosala-dark-900)] flex items-center gap-3">
            <Shield className="h-8 w-8 text-[#6476f3]" />
            Nos engagements
          </h2>
          <ul className="list-none space-y-4">
            {[
              "Accessibilité numérique (WCAG 2.1 AA)",
              "Protection des données (conformité RGPD)",
              "Égalité des chances et lutte contre les discriminations",
              "Transparence sur l'utilisation des données",
              "Accompagnement humain et digital"
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-[var(--color-mosala-dark-600)]">
                <div className="w-2 h-2 bg-[#6476f3] rounded-full flex-shrink-0"></div>
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
 