import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from "framer-motion";
import { ExternalLink, Info } from "lucide-react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const partners = [
  { 
    name: "Agence Française de Développement", 
    logo: "/topcenter-uploads/partenaires/afd.jpeg",
    description: "Partenaire financier principal",
    longDescription: "L'AFD accompagne Mosala dans le développement de programmes d'insertion professionnelle pour les jeunes congolais.",
    website: "https://www.afd.fr",
    color: "from-pink-100 to-pink-50 border-pink-200",
    priority: "high"
  },
  { 
    name: "Union Européenne", 
    logo: "/topcenter-uploads/partenaires/ue.jpeg",
    description: "Coopération européenne",
    longDescription: "L'Union Européenne soutient les initiatives de Mosala pour l'emploi des jeunes en République du Congo.",
    website: "https://europa.eu",
    color: "from-blue-100 to-blue-50 border-blue-200",
    priority: "featured" // Mise en avant spéciale
  },
  { 
    name: "Ministère de la Jeunesse", 
    logo: "/topcenter-uploads/partenaires/ministere.jpeg",
    description: "Institution nationale",
    longDescription: "Le Ministère de la Jeunesse collabore étroitement avec Mosala pour promouvoir l'emploi des jeunes.",
    website: "https://gouvernement.cg",
    color: "from-green-100 to-green-50 border-green-200",
    priority: "high"
  },
  { 
    name: "ACPE", 
    logo: "/topcenter-uploads/partenaires/acpe.png",
    description: "Agence Congolaise pour l'Emploi",
    longDescription: "L'ACPE travaille en partenariat avec Mosala pour faciliter l'accès à l'emploi des jeunes diplômés.",
    website: "https://acpe.cg",
    color: "from-yellow-100 to-yellow-50 border-yellow-200",
    priority: "medium"
  },
  { 
    name: "FONEA", 
    logo: "/topcenter-uploads/partenaires/fonea.png",
    description: "Fonds National pour l'Emploi",
    longDescription: "Le FONEA finance les programmes de formation et d'insertion professionnelle de Mosala.",
    website: "https://fonea.cg",
    color: "from-purple-100 to-purple-50 border-purple-200",
    priority: "medium"
  },
];

export default function PartnerSlider() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header amélioré */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-6 py-3 bg-gray-100 text-gray-700 rounded-full text-sm font-bold mb-6 tracking-wider shadow-lg border border-gray-200">
            Partenariats
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Nos Partenaires Institutionnels
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Mosala travaille en étroite collaboration avec les principales institutions nationales et internationales pour l'emploi des jeunes.
          </p>
        </motion.div>

        {/* Grille responsive 3x2 avec UE mise en avant */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative group ${
                partner.priority === "featured" 
                  ? "md:col-span-2 lg:col-span-1 order-first" 
                  : ""
              }`}
            >
              {/* Carte partenaire */}
              <div className={`bg-white rounded-2xl p-8 shadow-xl border border-gray-200 transition-all duration-500 h-full relative overflow-hidden group-hover:shadow-2xl ${
                partner.priority === "featured" 
                  ? "ring-4 ring-gray-300 scale-105" 
                  : ""
              }`}>
                
                {/* Badge spécial pour UE */}
                {partner.priority === "featured" && (
                  <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Partenaire Principal
                  </div>
                )}

                {/* Logo avec animation */}
                <div className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-200 mb-6 transition-all duration-300 group-hover:shadow-xl">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className={`h-20 w-auto object-contain transition-all duration-300 ${
                      partner.priority === "featured" 
                        ? "grayscale-0" 
                        : "grayscale hover:grayscale-0"
                    }`}
                  />
                </div>

                {/* Informations */}
                <div className="text-center">
                  <h3 className={`font-bold text-gray-900 mb-3 ${
                    partner.priority === "featured" 
                      ? "text-xl" 
                      : "text-lg"
                  }`}>
                    {partner.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {partner.description}
                  </p>

                  {/* Actions */}
                  <div className="flex justify-center gap-3">
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                      title={partner.longDescription}
                    >
                      <Info className="w-4 h-4" />
                      Plus d'infos
                    </button>
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Site web
                    </a>
                  </div>
                </div>

                {/* Overlay au hover avec description complète */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end p-6">
                  <div className="text-white">
                    <p className="text-sm leading-relaxed">
                      {partner.longDescription}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistiques de partenariat */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="text-3xl font-bold text-gray-900 mb-2">5</div>
            <div className="text-gray-700 font-medium">Partenaires Institutionnels</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="text-3xl font-bold text-gray-900 mb-2">2M€</div>
            <div className="text-gray-700 font-medium">Fonds Mobilisés</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-gray-700 font-medium">Jeunes Bénéficiaires</div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Intéressé par un partenariat avec Mosala ?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-gray-900 text-white font-bold shadow-lg hover:bg-gray-800 transition-all duration-300"
          >
            <span>Nous contacter</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
} 