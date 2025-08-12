
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Users, Award, Globe, Shield, Heart, Briefcase, CheckCircle } from "lucide-react";

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
  { icon: <Heart className="h-7 w-7 text-[#fa496e]" />, title: "Inclusion", desc: "Favoriser l’accès à l’emploi pour tous, sans discrimination." },
  { icon: <Award className="h-7 w-7 text-[#2fdab8]" />, title: "Excellence", desc: "Former et accompagner avec exigence et bienveillance." },
  { icon: <Shield className="h-7 w-7 text-[#6476f3]" />, title: "Sécurité & RGPD", desc: "Respect total de la vie privée, conformité RGPD, sécurité des données." },
  { icon: <Globe className="h-7 w-7 text-[#ff7844]" />, title: "Ouverture", desc: "S’inspirer des meilleures pratiques européennes et africaines." },
  { icon: <CheckCircle className="h-7 w-7 text-[#BFFF00]" />, title: "Transparence", desc: "Information claire, traçabilité, éthique dans toutes nos actions." },
];

const About = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[var(--color-mosala-green-50)] via-[var(--color-mosala-yellow-50)] to-[var(--color-mosala-dark-50)]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 pt-24 md:pt-32 max-w-5xl">
      {/* Header éditorial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] p-4 rounded-full">
            <Users className="h-8 w-8 text-[var(--color-mosala-white)]" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-transparent bg-clip-text">À propos de Mosala</h1>
        <p className="text-lg text-[var(--color-mosala-dark-600)] max-w-2xl mx-auto">
          Mosala est un projet d’insertion professionnelle financé par l’AFD et l’Union Européenne, dédié à la jeunesse congolaise. Notre mission : accompagner chaque jeune vers l’emploi durable, l’autonomie et l’excellence, dans le respect des normes européennes et de l’inclusion.
        </p>
      </motion.div>

      {/* Mission */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-12 bg-[var(--color-mosala-white)]/90 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-[var(--color-mosala-green-100)]"
      >
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-mosala-dark-900)] flex items-center gap-2"><Briefcase className="h-6 w-6 text-[#2fdab8]" /> Notre mission</h2>
        <p className="text-[var(--color-mosala-dark-700)] mb-2">
          Offrir à chaque jeune du Congo les moyens de réussir professionnellement, grâce à des formations innovantes, un accompagnement personnalisé, et une mise en relation directe avec les employeurs.
        </p>
        <ul className="list-disc list-inside text-[var(--color-mosala-dark-600)] ml-6 mt-2">
          <li>Caravane itinérante dans 6 villes</li>
          <li>Formations certifiantes et coaching</li>
          <li>Plateforme digitale accessible et sécurisée</li>
          <li>Accompagnement à l’entrepreneuriat</li>
        </ul>
      </motion.section>

      {/* Valeurs */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-8 text-[var(--color-mosala-dark-900)] flex items-center gap-2"><Heart className="h-6 w-6 text-[#fa496e]" /> Nos valeurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <div key={i} className="bg-[var(--color-mosala-white)]/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-[var(--color-mosala-green-100)] flex flex-col items-center text-center">
              {v.icon}
              <h3 className="font-bold text-lg mt-3 mb-2 text-[var(--color-mosala-dark-900)]">{v.title}</h3>
              <p className="text-[var(--color-mosala-dark-600)]">{v.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Équipe */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-8 text-[var(--color-mosala-dark-900)] flex items-center gap-2"><Users className="h-6 w-6 text-[#6476f3]" /> L’équipe Mosala</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {team.map((m, i) => (
            <div key={i} className="bg-[var(--color-mosala-white)]/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-[var(--color-mosala-green-100)] flex flex-col items-center text-center">
              <img src={m.avatar} alt={m.name} className="w-20 h-20 rounded-full mb-3 border-4 border-white shadow" />
              <h3 className="font-bold text-lg text-[var(--color-mosala-dark-900)] mb-1">{m.name}</h3>
              <div className="text-sm text-[var(--color-mosala-dark-600)]">{m.role}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Partenaires */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-8 text-[var(--color-mosala-dark-900)] flex items-center gap-2"><Globe className="h-6 w-6 text-[#ff7844]" /> Nos partenaires</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-center">
          {partners.map((p, idx) => (
            <a key={idx} href={p.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center transition hover:scale-105 hover:shadow-lg group">
              <img src={p.logo} alt={p.name} className="max-h-12 w-auto object-contain mb-2" />
              <span className="text-xs text-[#22304a] font-semibold group-hover:text-[#6476f3] transition">{p.name}</span>
            </a>
          ))}
        </div>
      </motion.section>

      {/* Engagements */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mb-12 bg-[var(--color-mosala-white)]/90 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-[var(--color-mosala-green-100)]"
      >
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-mosala-dark-900)] flex items-center gap-2"><Shield className="h-6 w-6 text-[#6476f3]" /> Nos engagements</h2>
        <ul className="list-disc list-inside text-[var(--color-mosala-dark-600)] ml-6 mt-2 space-y-2">
          <li>Accessibilité numérique (WCAG 2.1 AA)</li>
          <li>Protection des données (conformité RGPD)</li>
          <li>Égalité des chances et lutte contre les discriminations</li>
          <li>Transparence sur l’utilisation des données</li>
          <li>Accompagnement humain et digital</li>
        </ul>
      </motion.section>
    </main>
    <Footer />
  </div>
);

export default About;
 