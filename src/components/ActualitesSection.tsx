import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock API fetch (remplace par un vrai fetch API plus tard)
const fetchActualites = async () => {
  // Simule une API non paginée (on affiche tout dans le slider)
  return [
    {
      id: 1,
      image: "/lovable-uploads/carrousel/mosala1.jpeg",
      type: "Événement",
      typeColor: "#0077C8",
      date: "12 juin 2024",
      author: "Équipe Mosala",
      title: "Forum Jeunesse : 300 jeunes réunis à Brazzaville",
      excerpt: "Retour sur le forum annuel où jeunes, entreprises et institutions ont échangé sur l'emploi et l'innovation au Congo.",
      link: "#"
    },
    {
      id: 2,
      image: "/lovable-uploads/carrousel/mosala2.jpeg",
      type: "Atelier",
      typeColor: "#FFD500",
      date: "28 mai 2024",
      author: "Sarah M.",
      title: "Atelier numérique : Booster son CV en ligne",
      excerpt: "80 jeunes formés aux outils numériques pour valoriser leurs compétences et accéder à de nouvelles opportunités.",
      link: "#"
    },
    {
      id: 3,
      image: "/lovable-uploads/carrousel/mosala3.jpeg",
      type: "Annonce",
      typeColor: "#0077C8",
      date: "15 mai 2024",
      author: "Mosala",
      title: "Nouveau partenariat avec Digital Academy",
      excerpt: "Mosala s'associe à Digital Academy pour proposer des formations gratuites en développement web et design.",
      link: "#"
    },
    {
      id: 4,
      image: "/lovable-uploads/carrousel/mosala4-ambassadeur-france-congo.jpeg",
      type: "Institutionnel",
      typeColor: "#0077C8",
      date: "2 mai 2024",
      author: "Équipe Mosala",
      title: "L'Ambassadeur de France visite Mosala",
      excerpt: "Rencontre officielle pour renforcer la coopération sur l'inclusion numérique et l'emploi des jeunes.",
      link: "#"
    },
    {
      id: 5,
      image: "/lovable-uploads/carrousel/mosala5-ministre-jeunesse-ambassadeur-france-congo.jpeg",
      type: "Publication",
      typeColor: "#FFD500",
      date: "18 avril 2024",
      author: "Ministère Jeunesse",
      title: "Rapport : Jeunesse & Emploi 2024",
      excerpt: "Publication officielle sur l'impact des programmes Mosala et les perspectives pour la jeunesse congolaise.",
      link: "#"
    },
    {
      id: 6,
      image: "/lovable-uploads/carrousel/mosala6.jpeg",
      type: "Caravane",
      typeColor: "#0077C8",
      date: "5 avril 2024",
      author: "Équipe Mosala",
      title: "La Caravane Mosala à Owando",
      excerpt: "La tournée Mosala continue : ateliers, rencontres et témoignages dans la région de la Cuvette.",
      link: "#"
    },
  ];
};

export default function ActualitesSection() {
  const [actualites, setActualites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 1024px)': { slidesToScroll: 3 },
      '(min-width: 768px)': { slidesToScroll: 2 },
    },
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchActualites().then((d) => {
      setActualites(d);
      setLoading(false);
    });
  }, []);

  // Synchronise l'index sélectionné Embla
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();
  const scrollTo = (idx) => emblaApi && emblaApi.scrollTo(idx);

  return (
    <section className="bg-[#F5F7FA] py-20">
      <div className="container mx-auto px-4">
        <span className="inline-block px-4 py-2 bg-[#0077C8]/10 text-[#0077C8] rounded-full text-sm font-semibold mb-8 tracking-widest shadow">
          Actualités & Publications
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">Actualités récentes</h2>
        <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl mx-auto">
          Découvrez les dernières nouvelles, événements, partenariats et ressources publiées par Mosala.
        </p>
        {loading ? (
          <div className="text-center py-12">Chargement…</div>
        ) : (
          <>
            {/* Slider/Carrousel */}
            <div className="relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {actualites.map((actu) => (
                    <div key={actu.id} className="min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3 px-2">
                      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col h-full">
                        <img src={actu.image} alt={actu.title} className="rounded-xl mb-4 object-cover h-40 md:h-56 lg:h-64 w-full" style={{ objectPosition: 'top center' }} />
                        <span className="text-xs font-semibold mb-1" style={{ color: actu.typeColor }}>{actu.type}</span>
                        <span className="text-xs text-gray-400 mb-2">{actu.date} • par {actu.author}</span>
                        <h3 className="text-lg font-bold mb-2">{actu.title}</h3>
                        <p className="text-gray-600 text-sm flex-grow">{actu.excerpt}</p>
                        <a href={actu.link} className="mt-4 text-[#0077C8] font-semibold hover:underline">En savoir plus</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Slider navigation */}
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 border border-gray-200 hover:bg-gray-50 transition disabled:opacity-30"
                onClick={scrollPrev}
                aria-label="Précédent"
                disabled={selectedIndex === 0}
                style={{ zIndex: 2 }}
              >
                <ChevronLeft className="h-6 w-6 text-[#0077C8]" />
              </button>
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 border border-gray-200 hover:bg-gray-50 transition disabled:opacity-30"
                onClick={scrollNext}
                aria-label="Suivant"
                disabled={selectedIndex === scrollSnaps.length - 1}
                style={{ zIndex: 2 }}
              >
                <ChevronRight className="h-6 w-6 text-[#0077C8]" />
              </button>
            </div>
            {/* Pagination dots */}
            <div className="flex justify-center gap-2 mt-8">
              {scrollSnaps.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full ${selectedIndex === idx ? "bg-[#0077C8]" : "bg-gray-300"}`}
                  onClick={() => scrollTo(idx)}
                  aria-label={`Aller à la slide ${idx + 1}`}
                />
              ))}
            </div>
            {/* Bouton voir toutes les actualités */}
            <div className="flex justify-center mt-8">
              <a href="#" className="inline-block px-8 py-3 rounded-full bg-[#0077C8] text-white font-semibold shadow-lg hover:bg-[#005fa3] transition-all text-lg">Voir toutes les actualités</a>
            </div>
          </>
        )}
      </div>
    </section>
  );
} 