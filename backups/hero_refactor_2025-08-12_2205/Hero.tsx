import { useBlog } from "@/hooks/useBlog";
import { ArrowRight, Users, BookOpen, Briefcase, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const Hero = ({ navbarHeight = 0 }: { navbarHeight?: number }) => {
  const { data: posts = [], isLoading } = useBlog();
  const featuredPost = posts[0];

  return (
    <section
      className="relative z-0 min-h-[70vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden"
      style={{ paddingTop: navbarHeight ? navbarHeight + 16 : 56 }} // 16px de marge visuelle
    >
      {featuredPost && (
        <>
          {/* Image de fond couvrant toute la section, très grande, décalée vers le bas, avec animation flottante */}
          <style>{`
            @keyframes heroFloat {
              0% { transform: translateY(0); }
              100% { transform: translateY(24px); }
            }
          `}</style>
          <motion.img
            src={"/topcenter-uploads/carrousel/mosala-jeunes1.png"}
            alt={featuredPost?.title || "Mosala Hero"}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full object-cover object-[center_40%] z-0"
            style={{ minHeight: '70vh', maxHeight: '100vh', animation: 'heroFloat 12s ease-in-out infinite alternate' }}
          />
          {/* Overlay pour lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 z-10" />
          {/* Contenu éditorial centré, en haut */}
          <div className="relative z-20 w-full flex flex-col items-center justify-start text-center px-4 pt-32 md:pt-48">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                <CheckCircle className="w-4 h-4" />
                Projet financé par l'AFD et l'Union Européenne
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-3xl md:text-5xl font-black text-white mb-6 drop-shadow-xl max-w-4xl mx-auto leading-tight"
            >
              Insertion professionnelle des jeunes au Congo
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-white/95 mb-10 max-w-3xl mx-auto font-medium leading-relaxed"
            >
              Accompagnement personnalisé, formations adaptées et mise en relation avec les opportunités d'emploi locales pour la jeunesse congolaise.
            </motion.p>
            
            {/* Indicateurs professionnels */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 max-w-4xl mx-auto"
            >
              <div className="flex flex-col items-center text-white/90">
                <Users className="w-8 h-8 mb-2 text-green-400" />
                <span className="text-2xl font-bold text-white">25,000+</span>
                <span className="text-sm font-medium">Candidats accompagnés</span>
              </div>
              <div className="flex flex-col items-center text-white/90">
                <Briefcase className="w-8 h-8 mb-2 text-green-400" />
                <span className="text-2xl font-bold text-white">15,000+</span>
                <span className="text-sm font-medium">Emplois disponibles</span>
              </div>
              <div className="flex flex-col items-center text-white/90">
                <BookOpen className="w-8 h-8 mb-2 text-green-400" />
                <span className="text-2xl font-bold text-white">500+</span>
                <span className="text-sm font-medium">Entreprises partenaires</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="/jobs"
                className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Consulter les offres d'emploi
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/formations"
                className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                Découvrir nos formations
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </>
      )}
      {isLoading && (
        <div className="text-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto"></div>
          <p className="mt-4 text-gray-700">Chargement de l'actualité...</p>
        </div>
      )}
    </section>
  );
};

export default Hero;