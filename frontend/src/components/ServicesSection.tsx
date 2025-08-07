import React from 'react';

const ServicesSection: React.FC = () => {
  const features = [
    {
      title: "Moteur de recherche intelligent",
      description: "Trouvez facilement les emplois et formations qui correspondent à vos compétences et aspirations.",
      color: "#6476f3",
      bg: "bg-[#6476f3]/10",
      icon: "Search"
    },
    {
      title: "Chatbot assistant 24/7",
      description: "Obtenez une assistance personnalisée à toute heure pour vos questions sur l'emploi et la formation.",
      color: "#fa496e",
      bg: "bg-[#fa496e]/10",
      icon: "MessageCircle"
    },
    {
      title: "Caravane itinérante",
      description: "Des actions de proximité dans 6 villes du Congo pour sensibiliser et accompagner la jeunesse.",
      color: "#ff7844",
      bg: "bg-[#ff7844]/10",
      icon: "MapPin"
    },
    {
      title: "FAQ dynamique",
      description: "Base de connaissances enrichie en temps réel grâce aux questions fréquentes des utilisateurs.",
      color: "#2fdab8",
      bg: "bg-[#2fdab8]/10",
      icon: "HelpCircle"
    },
    {
      title: "Formations personnalisées",
      description: "Des parcours adaptés aux besoins du marché et aux aspirations des jeunes.",
      color: "#e6b800",
      bg: "bg-[#e6b800]/10",
      icon: "BookOpen"
    },
    {
      title: "Accompagnement individualisé",
      description: "Un suivi personnalisé pour maximiser vos chances de réussite professionnelle.",
      color: "#cc0510",
      bg: "bg-[#cc0510]/10",
      icon: "UserCheck"
    }
  ];

  return (
    <section className="py-12 bg-[#1cc7d0]/10">
      <div className="container mx-auto px-4">
        <span className="inline-block px-4 py-2 bg-[#1cc7d0]/20 text-[#1cc7d0] rounded-full text-sm font-semibold mb-6 tracking-widest shadow border border-[#1cc7d0]/30">
          Nos Services
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition hover:scale-105 hover:shadow-2xl micro-interaction focus-ring">
              <div className={`mb-4 p-4 rounded-full ${feature.bg} w-16 h-16 flex items-center justify-center`} style={{ color: feature.color }}>
                {feature.icon === "Search" && (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                )}
                {feature.icon === "MessageCircle" && (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                )}
                {feature.icon === "MapPin" && (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                )}
                {feature.icon === "HelpCircle" && (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <path d="M12 17h.01"/>
                  </svg>
                )}
                {feature.icon === "BookOpen" && (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                )}
                {feature.icon === "UserCheck" && (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="m16 11 2 2 4-4"/>
                  </svg>
                )}
              </div>
              <h3 className="font-bold text-lg text-[#22304a] mb-2">{feature.title}</h3>
              <p className="text-gray-700 mobile-text-optimized">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 