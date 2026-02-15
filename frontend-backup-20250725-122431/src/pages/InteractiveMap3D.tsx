
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Globe, Users, Building, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteractiveMap3DComponent from "@/components/InteractiveMap3D";

const InteractiveMap3D = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A0A14] via-[#1a1833] to-[#18182f]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col items-center mb-8">
        <MapPin className="h-16 w-16 text-[#7ED9A7] mb-4" />
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-[#7ED9A7] to-[#00824B] text-transparent bg-clip-text">
          Carte interactive 3D
        </h1>
        <p className="text-lg text-[#F5F5F7] text-center mb-4 max-w-2xl">
          Explorez les opportunités d'emploi, formations et services Mosala sur une carte interactive avec géolocalisation et filtres avancés.
        </p>
      </div>
      
      {/* Carte interactive 3D */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6">
        <InteractiveMap3DComponent />
      </div>
      
      {/* Informations supplémentaires */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-bold text-[#7ED9A7] mb-3">💼 Emplois</h3>
          <p className="text-[#F5F5F7] text-sm">
            Découvrez les offres d'emploi à proximité de votre position avec les salaires et descriptions détaillées.
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-bold text-[#FFD93D] mb-3">🎓 Formations</h3>
          <p className="text-[#F5F5F7] text-sm">
            Trouvez les centres de formation et programmes certifiants adaptés à vos objectifs professionnels.
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-bold text-[#FF6B35] mb-3">🏢 Services</h3>
          <p className="text-[#F5F5F7] text-sm">
            Localisez les bureaux Mosala et partenaires pour un accompagnement personnalisé.
          </p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default InteractiveMap3D;
