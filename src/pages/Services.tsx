import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, ChevronRight } from "lucide-react";

const services = [
  {
    id: "1",
    title: "Accompagnement professionnel",
    description: "Programmes de mentorat et coaching sur mesure pour votre développement de carrière.",
    icon: "public/services/Accompagnement-pro.png",
    category: "Accompagnement",
    rating: 4.8
  },
  {
    id: "2",
    title: "Solutions de recrutement",
    description: "Services complets de sourcing et sélection de talents qualifiés.",
    icon: "public/services/Solutions de recrutement__Services.jpeg",
    category: "Recrutement",
    rating: 4.5
  },
  {
    id: "3",
    title: "Programmes de formation",
    description: "Formations certifiantes adaptées aux besoins du marché.",
    icon: "public/services/programme-formation.png",
    category: "Formation",
    rating: 4.7
  },
  {
    id: "4",
    title: "Réseau professionnel",
    description: "Accès à notre communauté d'experts et d'opportunités.",
    icon: "/lovable-uploads/community.png",
    category: "Réseau",
    rating: 4.6
  }
];

const categories = ["Tous", "Accompagnement", "Recrutement", "Formation", "Réseau"];

const Services = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredServices = services.filter(s => {
    const matchCategory = selectedCategory === "Tous" || s.category === selectedCategory;
    const matchSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Navbar />
      
      {/* Hero institutionnel avec grande photo */}
      <section className="relative w-full h-[400px] md:h-[500px] bg-gray-900 overflow-hidden">
        <img 
          src="public/lovable-uploads/jeunesse-congolaise/jeunesse-congolaise.jpg" 
          alt="Équipe Mosala en réunion"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent flex items-end pb-16 md:pb-24">
          <div className="container mx-auto px-6 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Services Professionnels</h1>
            <p className="text-xl md:text-2xl max-w-2xl mb-6">
              Des solutions expertes pour votre développement professionnel et organisationnel
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-gray-900 px-6 py-3 rounded-sm font-medium flex items-center hover:bg-gray-100 transition">
                Découvrir nos programmes <ChevronRight className="ml-2" />
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-sm font-medium hover:bg-white/10 transition">
                Contactez-nous
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section de contenu principal */}
      <main className="flex-1 container mx-auto px-4 py-16 max-w-6xl">
        {/* Filtres */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Nos solutions</h2>
            <div className="w-full md:w-96">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher un service..."
                className="w-full px-4 py-2 border-b border-gray-300 focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors
                  ${selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grille de services */}
        {filteredServices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Aucun service trouvé</h2>
            <p className="text-gray-500 mb-6">Veuillez essayer une autre recherche ou catégorie.</p>
            <button 
              className="bg-blue-600 text-white px-6 py-2 rounded-sm font-medium hover:bg-blue-700 transition"
              onClick={() => { setSearch(""); setSelectedCategory("Tous"); }}
            >
              Réinitialiser
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredServices.map(service => (
              <div 
                key={service.id} 
                className="border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 bg-gray-100 overflow-hidden">
                  <img 
                    src={service.icon} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                    <div className="flex items-center">
                      <Star className="text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-700">{service.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{service.category}</span>
                    <button className="text-blue-600 font-medium hover:text-blue-800 transition flex items-center">
                      En savoir plus <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Section institutionnelle */}
        <section className="mt-24 py-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre approche institutionnelle</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Mosala s'engage à fournir des services professionnels de haute qualité, en partenariat avec les institutions nationales et internationales. Notre méthodologie rigoureuse et nos conseillers experts garantissent un accompagnement d'excellence.
            </p>
            <div className="flex justify-center gap-6">
              <img src="/lovable-uploads/partenaires/afd.jpeg" alt="AFD" className="h-12 grayscale hover:grayscale-0 transition" />
              <img src="/lovable-uploads/partenaires/ministere.jpeg" alt="Ministère" className="h-12 grayscale hover:grayscale-0 transition" />
              <img src="/lovable-uploads/partenaires/ue.jpeg" alt="UE" className="h-12 grayscale hover:grayscale-0 transition" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;