import React from 'react';

const CaravaneMosala: React.FC = () => {
  const caravaneData = {
    period: "Octobre – Novembre 2024",
    cities: ["Brazzaville", "Ouesso", "Dolisie", "Pointe-Noire"],
    stats: {
      totalEnrolled: 2449,
      totalVisitors: 6600,
      disabledPersons: 46,
      workshopParticipants: 667,
      qualifiedTrainingDemands: 1708,
      neets: 1514,
      jobSeekers: 712,
      exhibitors: 90,
      newTrainingOperators: 21,
      targetedJobs: 280,
      jobOffers: 32
    },
    results: [
      "20 jeunes recrutés par CONGO TELECOM à OUESSO",
      "Discussions en cours avec OLAM, CONGO TELECOM, NOKI NOKI, YA DII",
      "Base de données de demandeurs de formation disponible",
      "Enrôlement aux niveaux des CEFA et autres centres de formations privés",
      "Identification de 700 jeunes entrepreneurs à Dolisie",
      "Centre de formation dédié aux jeunes en situation de handicap (30 jeunes)"
    ],
    requestedFormations: [
      { name: "ENTREPRENARIAT", percentage: 35 },
      { name: "LOGISTIQUE", percentage: 25 },
      { name: "NUMERIQUE", percentage: 20 },
      { name: "BTP", percentage: 20 }
    ]
  };

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Caravane Itinérante
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Caravane Mosala
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
            {caravaneData.period} - {caravaneData.cities.join(", ")}
          </p>
          <p className="text-lg text-gray-500">
            Village de l'emploi itinérant dans 4 villes du Congo
          </p>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{caravaneData.stats.totalEnrolled.toLocaleString()}</div>
            <div className="text-gray-600 font-medium">Jeunes enrôlés</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{caravaneData.stats.totalVisitors.toLocaleString()}</div>
            <div className="text-gray-600 font-medium">Visiteurs</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{caravaneData.stats.qualifiedTrainingDemands.toLocaleString()}</div>
            <div className="text-gray-600 font-medium">Demandes de formation</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{caravaneData.stats.jobOffers}</div>
            <div className="text-gray-600 font-medium">Offres d'emploi</div>
          </div>
        </div>

        {/* Détails par ville */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Objectifs atteints</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Village de l'emploi installé dans 4 villes</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Identification des besoins en accompagnement</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Ateliers Techniques de recherche d'emploi</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Base de données entreprises par ville</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Visibilité nationale (TV, presse, radio)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Résultats concrets</h3>
            <div className="space-y-4">
              {caravaneData.results.map((result, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-700 text-sm">{result}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Formations demandées */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Formations les plus demandées</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {caravaneData.requestedFormations.map((formation, idx) => (
              <div key={idx} className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-bold text-lg"
                     style={{ backgroundColor: idx === 0 ? '#10B981' : idx === 1 ? '#3B82F6' : idx === 2 ? '#8B5CF6' : '#F59E0B' }}>
                  {formation.percentage}%
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{formation.name}</h4>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-1000 ease-out" 
                    style={{ 
                      width: `${formation.percentage}%`, 
                      backgroundColor: idx === 0 ? '#10B981' : idx === 1 ? '#3B82F6' : idx === 2 ? '#8B5CF6' : '#F59E0B'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommandations */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommandations pour l'avenir</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                <span className="text-gray-700">Renforcer les interactions avec les entreprises</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                <span className="text-gray-700">Accentuer la communication orientée genre</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                <span className="text-gray-700">Démarrer rapidement les formations qualifiantes</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                <span className="text-gray-700">Reproduire ce type d'initiatives</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                <span className="text-gray-700">Renforcer les synergies public-privé</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                <span className="text-gray-700">Accompagnement socio-professionnel adéquat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaravaneMosala;