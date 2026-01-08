import React from 'react';

const TargetAudience: React.FC = () => {
  const targetAudiences = [
    {
      title: "Étudiants et jeunes diplômés",
      percentage: "60%",
      description: "Préparez votre insertion professionnelle avec des formations adaptées et un accompagnement personnalisé pour développer vos compétences.",
      icon: "GraduationCap",
      color: "#3B82F6",
      bgGradient: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      features: ["Formations adaptées", "Accompagnement personnalisé", "Développement de compétences"]
    },
    {
      title: "Personnes en recherche d'emploi",
      percentage: "25%",
      description: "Accédez à des opportunités locales fiables et bénéficiez d'un accompagnement pour optimiser votre recherche d'emploi.",
      icon: "Briefcase",
      color: "#10B981",
      bgGradient: "from-green-50 to-green-100",
      borderColor: "border-green-200",
      features: ["Opportunités locales", "Accompagnement recherche", "Optimisation CV"]
    },
    {
      title: "Professionnels en reconversion",
      percentage: "15%",
      description: "Découvrez de nouvelles opportunités et formations pour évoluer dans votre carrière ou changer de secteur d'activité.",
      icon: "Users",
      color: "#8B5CF6",
      bgGradient: "from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      features: ["Évolution de carrière", "Changement de secteur", "Formations spécialisées"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4">
        {/* Header avec badge */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-6">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Public cible
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Pour qui ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Mosala accompagne tous les acteurs de l'insertion professionnelle au Congo avec des solutions adaptées à chaque profil
          </p>
        </div>
        
        {/* Cards avec design moderne */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {targetAudiences.map((audience, idx) => (
            <div key={idx} className="group relative">
              {/* Card principale */}
              <div className={`bg-gradient-to-br ${audience.bgGradient} rounded-2xl p-8 border ${audience.borderColor} hover:border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                {/* Header avec icône et pourcentage */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: audience.color }}>
                    {audience.icon === "GraduationCap" && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                      </svg>
                    )}
                    {audience.icon === "Briefcase" && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                      </svg>
                    )}
                    {audience.icon === "Users" && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                        <path d="M16 3.13a4 4 0 010 7.75"/>
                      </svg>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">{audience.percentage}</div>
                    <div className="text-sm text-gray-500">de nos bénéficiaires</div>
                  </div>
                </div>
                
                {/* Contenu */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{audience.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{audience.description}</p>
                
                {/* Features list */}
                <div className="space-y-3">
                  {audience.features.map((feature, featureIdx) => (
                    <div key={featureIdx} className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: audience.color }}></div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Effet de bordure colorée au hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gray-300 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
        
        {/* Section de statistiques complémentaires */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Répartition de nos bénéficiaires</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {targetAudiences.map((audience, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: audience.color }}>
                  {audience.percentage}
                </div>
                <div className="text-gray-600 font-medium">{audience.title}</div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full transition-all duration-1000 ease-out" 
                      style={{ 
                        width: audience.percentage, 
                        backgroundColor: audience.color 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience; 