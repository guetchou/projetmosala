import React from 'react';

const ProjectIntro: React.FC = () => {
  return (
    <section className="bg-white/95 py-16 px-4 text-center">
      <h1 className="text-3xl md:text-5xl font-black mb-4 text-high-contrast">
        Projet d'insertion professionnelle au Congo
      </h1>
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-green-700">
        Mosala accompagne la jeunesse congolaise
      </h2>
      <p className="max-w-2xl mx-auto mb-10 text-medium-contrast mobile-text-optimized">
        Projet financé par l'AFD et l'Union Européenne pour l'emploi des jeunes. 
        Caravane itinérante, formations, accompagnement et mise en relation avec les opportunités locales.
      </p>
      
      {/* Section Objectifs du projet */}
      <div className="max-w-4xl mx-auto mb-12">
        <h3 className="text-xl font-bold text-[#22304a] mb-6">Nos Objectifs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h4 className="font-semibold text-green-800 mb-2">Démocratiser l'accès</h4>
            <p className="text-green-700 text-sm">Faciliter l'accès à la formation pour tous les citoyens</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
              </svg>
            </div>
            <h4 className="font-semibold text-blue-800 mb-2">Faciliter l'emploi</h4>
            <p className="text-blue-700 text-sm">Mettre en relation les jeunes avec les opportunités locales</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h4 className="font-semibold text-orange-800 mb-2">Accompagner</h4>
            <p className="text-orange-700 text-sm">Un suivi personnalisé pour maximiser les chances de réussite</p>
          </div>
        </div>
      </div>

      {/* Section statistiques */}
      <StatsSection />
      
      <div className="mb-8 text-gray-600">
        <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full mr-2">Projet AFD/UE</span>
        <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full mr-2">6 villes visitées</span>
        <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full">10,000+ jeunes sensibilisés</span>
      </div>
      <div className="mb-8 text-gray-700">Caravane itinérante • Accompagnement de proximité</div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a 
          href="/jobs" 
          className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-green-700 hover:shadow-xl transition-all duration-300 touch-target focus-ring micro-interaction"
          style={{ minWidth: '200px', textAlign: 'center' }}
        >
          Consulter les offres d'emploi
        </a>
        <a 
          href="/formations" 
          className="inline-block bg-white border-2 border-green-600 text-green-700 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-green-50 hover:shadow-xl transition-all duration-300 touch-target focus-ring micro-interaction"
          style={{ minWidth: '200px', textAlign: 'center' }}
        >
          Découvrir nos formations
        </a>
      </div>
    </section>
  );
};

// Composant StatsSection séparé
const StatsSection: React.FC = () => {
  const stats = [
    {
      label: "Emplois disponibles",
      value: "15,000+",
      color: "#2fdab8",
      bg: "bg-[#2fdab8]/10",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      label: "Entreprises partenaires",
      value: "500+",
      color: "#1cc7d0",
      bg: "bg-[#1cc7d0]/10",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 15h8M8 12h8M8 9h8" />
        </svg>
      )
    },
    {
      label: "Candidats formés",
      value: "25,000+",
      color: "#6476f3",
      bg: "bg-[#6476f3]/10",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="7" width="20" height="14" rx="4" />
          <path d="M16 3v4M8 3v4" />
        </svg>
      )
    },
    {
      label: "Taux de satisfaction",
      value: "95%",
      color: "#fa496e",
      bg: "bg-[#fa496e]/10",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 20h.01" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l6.39 7.11a1.65 1.65 0 0 0 2.42 0l6.39-7.11z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className={`rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition hover:scale-105 hover:shadow-2xl touch-target micro-interaction focus-ring ${stat.bg}`}
              style={{ color: stat.color }}>
              <div className="mb-4">{stat.icon}</div>
              <div className="text-3xl font-black mb-2 stat-counter">{stat.value}</div>
              <div className="text-[#22304a] font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectIntro; 