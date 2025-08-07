import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OptimizedImage from "@/components/ui/OptimizedImage";
import ProfessionalCard from "@/components/ui/ProfessionalCard";
import ProfessionalSection from "@/components/ui/ProfessionalSection";
import ProfessionalGrid from "@/components/ui/ProfessionalGrid";
import { motion, useReducedMotion } from "framer-motion";
import { Users, Award, Globe, Shield, Heart, Briefcase, CheckCircle, ArrowRight } from "lucide-react";
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
  { icon: <Heart className="h-6 w-6" />, title: "Inclusion", desc: "Favoriser l'accès à l'emploi pour tous, sans discrimination.", color: "text-red-500" },
  { icon: <Award className="h-6 w-6" />, title: "Excellence", desc: "Former et accompagner avec exigence et bienveillance.", color: "text-emerald-500" },
  { icon: <Shield className="h-6 w-6" />, title: "Sécurité & RGPD", desc: "Respect total de la vie privée, conformité RGPD, sécurité des données.", color: "text-blue-500" },
  { icon: <Globe className="h-6 w-6" />, title: "Ouverture", desc: "S'inspirer des meilleures pratiques européennes et africaines.", color: "text-orange-500" },
  { icon: <CheckCircle className="h-6 w-6" />, title: "Transparence", desc: "Information claire, traçabilité, éthique dans toutes nos actions.", color: "text-lime-500" },
];

const missionItems = [
  "Caravane itinérante dans 6 villes",
  "Formations certifiantes et coaching",
  "Plateforme digitale accessible et sécurisée",
  "Accompagnement à l'entrepreneuriat"
];

const engagementItems = [
  "Accessibilité numérique (WCAG 2.1 AA)",
  "Protection des données (conformité RGPD)",
  "Égalité des chances et lutte contre les discriminations",
  "Transparence sur l'utilisation des données",
  "Accompagnement humain et digital"
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

    const existingScript = document.querySelector('script[data-structured-data="mosala"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-structured-data', 'mosala');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-structured-data="mosala"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null;
};

const AboutModern = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <StructuredData />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-green-50/20 to-yellow-50/30" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.3 : 0.8 }}
          className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-32"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: shouldReduceMotion ? 0.3 : 0.6 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500 to-yellow-500 rounded-3xl shadow-2xl mb-8"
          >
            <Users className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: shouldReduceMotion ? 0.3 : 0.6 }}
            className="text-5xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-gray-900 via-green-600 to-yellow-600 bg-clip-text text-transparent leading-tight"
          >
            À propos de Mosala
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: shouldReduceMotion ? 0.3 : 0.6 }}
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Projet d'insertion professionnelle financé par l'AFD et l'Union Européenne, 
            dédié à l'accompagnement de la jeunesse congolaise vers l'emploi durable et l'autonomie.
          </motion.p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <ProfessionalSection
        title="Notre mission"
        subtitle="Accompagner chaque jeune vers la réussite professionnelle"
        background="light"
        animation="slide"
      >
        <ProfessionalCard variant="hero" padding="xl" className="max-w-4xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Accompagnement vers l'excellence
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Offrir à chaque jeune du Congo les moyens de réussir professionnellement, 
                grâce à des formations innovantes, un accompagnement personnalisé, 
                et une mise en relation directe avec les employeurs.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missionItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </motion.div>
            ))}
          </div>
        </ProfessionalCard>
      </ProfessionalSection>

      {/* Values Section */}
      <ProfessionalSection
        title="Nos valeurs fondamentales"
        subtitle="Des principes qui guident chacune de nos actions et décisions"
        animation="scale"
      >
        <ProfessionalGrid columns={3} gap="lg" animation="stagger">
          {values.map((value, index) => (
            <ProfessionalCard key={index} variant="elevated" padding="lg">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl flex items-center justify-center ${value.color}`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{value.desc}</p>
            </ProfessionalCard>
          ))}
        </ProfessionalGrid>
      </ProfessionalSection>

      {/* Team Section */}
      <ProfessionalSection
        title="Notre équipe"
        subtitle="Des experts dédiés à votre réussite professionnelle"
        background="gradient"
        animation="fade"
      >
        <ProfessionalGrid columns={5} gap="lg" animation="stagger">
          {team.map((member, index) => (
            <ProfessionalCard key={index} variant="elevated" padding="md">
              <div className="text-center">
                <div className="relative mb-6">
                  <OptimizedImage
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg"
                    fallback="/topcenter-uploads/avatars/default-avatar.svg"
                    width={96}
                    height={96}
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            </ProfessionalCard>
          ))}
        </ProfessionalGrid>
      </ProfessionalSection>

      {/* Partners Section */}
      <ProfessionalSection
        title="Nos partenaires"
        subtitle="Institutions et organisations qui nous font confiance"
        animation="slide"
      >
        <ProfessionalGrid columns={5} gap="lg" animation="stagger">
          {partners.map((partner, index) => (
            <motion.a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <ProfessionalCard variant="default" padding="lg" hover={true}>
                <div className="text-center">
                  <OptimizedImage
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-16 w-auto object-contain mb-4 mx-auto"
                    fallback="/topcenter-uploads/partenaires/default-logo.svg"
                    width={64}
                    height={64}
                  />
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-green-600 transition-colors">
                    {partner.name}
                  </span>
                </div>
              </ProfessionalCard>
            </motion.a>
          ))}
        </ProfessionalGrid>
      </ProfessionalSection>

      {/* Engagements Section */}
      <ProfessionalSection
        title="Nos engagements"
        subtitle="Des promesses que nous tenons au quotidien"
        background="light"
        animation="fade"
      >
        <ProfessionalCard variant="hero" padding="xl" className="max-w-4xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Engagement pour l'excellence
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nous nous engageons à respecter les plus hauts standards de qualité, 
                d'accessibilité et de protection des données.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            {engagementItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </motion.div>
            ))}
          </div>
        </ProfessionalCard>
      </ProfessionalSection>

      <Footer />
    </div>
  );
};

export default AboutModern; 