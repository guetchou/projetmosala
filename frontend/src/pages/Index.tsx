import Navbar from "@/components/Navbar";
import Hero from "@/components/ui/Hero";
import PartnersSection from "@/components/PartnersSection";
import Footer from "@/components/Footer";
import ActualitesSection from "@/components/ActualitesSection";
import { useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Award, Briefcase, TrendingUp, Globe, BookOpen, Target, Zap } from "lucide-react";

const Index = () => {
  const navbarRef = useRef<HTMLElement>(null);

  // Animation config pour stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen text-gray-900 font-sans relative">
      {/* Navbar en fixed au-dessus du Hero */}
      <Navbar ref={navbarRef} className="bg-white/60 backdrop-blur-lg border border-white/40 shadow-xl fixed top-0 left-0 w-full z-50" />
      
      {/* HERO - Preserved */}
      <Hero />
      
      {/* Main Content Container */}
      <div className="relative">
        
        {/* Section 2: Vision & Contexte */}
        <section className="py-16 md:py-20 px-4 bg-green-50/20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Left: Contexte */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-4">
                    Une ambition nationale pour l'emploi des jeunes
                  </h2>
                  <div className="h-1 w-20 bg-[#16A34A] rounded-full"></div>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Au Congo, <span className="font-bold text-[#16A34A]">37% de la population jeune est en situation de NEET</span> (Not in Employment, Education or Training) 
                  et seuls <span className="font-bold text-[#16A34A]">19% accèdent à l'emploi formel</span>. Ce défi majeur impacte le développement socio-économique du pays.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Mosala, financé par l'AFD et l'Union Européenne, intervient pour structurer l'insertion professionnelle 
                  des jeunes à travers <span className="font-bold text-[#34D399]">trois composantes stratégiques</span> : structuration, formation et accompagnement vers l'emploi.
                </p>
              </motion.div>

              {/* Right: Chiffres clés */}
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="bg-gradient-to-br from-green-50 via-white to-green-50 rounded-2xl shadow-md border border-green-100 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-10 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#34D399] rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    Le défi en chiffres
                  </h3>
                  <div className="space-y">
                    <div className="text-center py-3">
                      <div className="text-xl md:text-4xl font-black text-[#16A34A]">37%</div>
                      <p className="text-gray-700 mt-2 font-semibold text-base">Jeunes en situation NEET</p>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-green-300 to-transparent"></div>
                    <div className="text-center py-3">
                      <div className="text-5xl md:text-4xl font-black text-[#16A34A]">19%</div>
                      <p className="text-gray-700 mt-2 font-semibold text-base">Accès à l'emploi formel</p>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-green-300 to-transparent"></div>
                    <div className="text-center py-3">
                      <div className="text-5xl md:text-4xl font-black text-[#F59E0B]">3</div>
                      <p className="text-gray-700 mt-2 font-semibold text-base">Composantes d'intervention</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Section 3: Actualités - Preserved */}
        <ActualitesSection />
        
        {/* Section 4: Pour qui ? - Cartes modernes concave/pastels */}
        <section className="py-16 md:py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="space-y-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                  Pour qui ?
                </h2>
                <div className="flex justify-center mb-6">
                  <div className="h-1 w-20 bg-[#16A34A] rounded-full"></div>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Mosala accompagne tous les jeunes Congolais en quête d'insertion professionnelle
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Carte 1 - Bleue */}
                <motion.div variants={itemVariants} className="relative bg-blue-50 rounded-3xl p-8 overflow-hidden">
                  <div className="absolute -top-5 -left-5 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center">
                    <div className="w-10 h-10 rounded-md bg-[#3B82F6] flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#3B82F6]">5000</div>
                    <div className="text-xl font-semibold text-gray-900 mt-2">Jeunes accompagnés</div>
                    <p className="text-sm text-gray-600 mt-3">Structuration, formation, accompagnement</p>
                    <p className="text-xs text-gray-500 mt-4">50% de nos bénéficiaires</p>
                  </div>
                </motion.div>

                {/* Carte 2 - Verte */}
                <motion.div variants={itemVariants} className="relative bg-emerald-50 rounded-3xl p-8 overflow-hidden">
                  <div className="absolute -top-5 -left-5 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center">
                    <div className="w-10 h-10 rounded-md bg-[#34D399] flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#34D399]">50%</div>
                    <div className="text-xl font-semibold text-gray-900 mt-2">de femmes</div>
                    <p className="text-sm text-gray-600 mt-3">Objectif de parité dans nos programmes</p>
                    <ul className="mt-4 text-sm text-gray-600 list-disc list-inside space-y-1">
                      <li>Mesures dédiées de recrutement</li>
                      <li>Soutien à la formation féminine</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Carte 3 - Violette */}
                <motion.div variants={itemVariants} className="relative bg-purple-50 rounded-3xl p-8 overflow-hidden">
                  <div className="absolute -top-5 -left-5 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center">
                    <div className="w-10 h-10 rounded-md bg-[#8B5CF6] flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#8B5CF6]">3</div>
                    <div className="text-xl font-semibold text-gray-900 mt-2">Services de base</div>
                    <p className="text-sm text-gray-600 mt-3">Structuration, formation, accompagnement</p>
                    <div className="mt-4">
                      <div className="text-2xl font-bold text-[#8B5CF6]">4</div>
                      <div className="text-sm font-semibold text-gray-900">Zones d'intervention</div>
                      <p className="text-sm text-gray-600 mt-2">Brazzaville, Pointe-Noire, Niari, Sangha</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 5: Composantes - Style Institutionnel & Épuré */}
        <section className="py-16 md:py-20 px-4 bg-violet-50/20">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="space-y-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                  Les trois composantes
                </h2>
                <div className="flex justify-center mb-6">
                  <div className="h-1 w-20 bg-[#34D399] rounded-full"></div>
                </div>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Notre approche holistique pour l'insertion professionnelle des jeunes
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "DGFQE",
                    description: "Direction générale de la formation qualifiante et de l’emploi",
                    details: "Structuration et le pilotage du dispositif de la formation qualifiante et de l’emploi",
                    icon: Award,
                    color: "#16A34A",
                    lightBg: "emerald-50",
                    lightAccent: "#16A34A"
                  },
                  {
                    title: "FONEA",
                    description: "Fonds National pour l'Employabilité et l'Apprentissage",
                    details: "Formation professionnelle adaptée aux besoins du marché",
                    icon: BookOpen,
                    color: "#34D399",
                    lightBg: "emerald-50",
                    lightAccent: "#34D399"
                  },
                  {
                    title: "ACPE",
                    description: "Agence congolaise pour l’emploi",
                    details: "Insertion professionnelle des jeunes demandeurs d’emploi",
                    icon: Briefcase,
                    color: "#3B82F6",
                    lightBg: "blue-50",
                    lightAccent: "#3B82F6"
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="bg-white rounded-xl p-6 transition-all duration-300 group border-t-4 hover:shadow-lg hover:-translate-y-1"
                    style={{ borderTopColor: item.color }}
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: item.color + "15" }}>
                      <item.icon className="w-6 h-6" style={{ color: item.color }} />
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm font-bold uppercase tracking-wide mb-3 leading-tight" style={{ color: item.color }}>
                      {item.description}
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {item.details}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 6: Zones d'intervention - Style Minimaliste */}
        <section className="py-16 md:py-20 px-4 bg-green-50/20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="space-y-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                  Zones d'intervention
                </h2>
                <div className="flex justify-center mb-6">
                  <div className="h-1 w-20 bg-[#16A34A] rounded-full"></div>
                </div>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Présence active dans les principales régions du Congo
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "Brazzaville",
                  "Pointe-Noire",
                  "Niari",
                  "Sangha",
                ].map((city, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="bg-white rounded-xl p-4 transition-all duration-300 text-center border-2 border-green-200 hover:border-[#16A34A] hover:shadow-md group"
                  >
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3">
                      <MapPin className="w-6 h-6 text-[#16A34A] group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900">
                      {city}
                    </h3>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 7: Partenaires - Preserved */}
        <PartnersSection />
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;
