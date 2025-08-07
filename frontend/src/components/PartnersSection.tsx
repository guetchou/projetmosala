import React from 'react';

const PartnersSection: React.FC = () => {
  const partners = [
    { 
      name: "Agence Française de Développement", 
      logo: "/topcenter-uploads/partenaires/afd.jpeg", 
      website: "https://www.afd.fr" 
    },
    { 
      name: "Union Européenne", 
      logo: "/topcenter-uploads/partenaires/ue.jpeg", 
      website: "https://europa.eu" 
    },
    { 
      name: "Ministère de la Jeunesse", 
      logo: "/topcenter-uploads/partenaires/ministere.jpeg", 
      website: "https://gouvernement.cg" 
    },
    { 
      name: "ACPE", 
      logo: "/topcenter-uploads/partenaires/acpe.png", 
      website: "https://acpe.cg" 
    },
    { 
      name: "FONEA", 
      logo: "/topcenter-uploads/partenaires/fonea.png", 
      website: "https://fonea.cg" 
    }
  ];

  return (
    <section className="py-12 bg-[#6476f3]/10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black text-[#22304a] text-center mb-8">
          Nos partenaires
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-center">
          {partners.map((partner, idx) => (
            <a 
              key={idx} 
              href={partner.website} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center transition hover:scale-105 hover:shadow-lg group touch-target focus-visible"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-12 w-auto object-contain mb-2" 
              />
              <span className="text-xs text-[#22304a] font-semibold group-hover:text-[#6476f3] transition">
                {partner.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection; 