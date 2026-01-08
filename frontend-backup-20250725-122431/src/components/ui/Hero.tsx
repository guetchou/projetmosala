import { useBlog } from "@/hooks/useBlog";
import { ArrowRight } from "lucide-react";
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/10 z-10" />
          {/* Contenu éditorial centré, en haut */}
          <div className="relative z-20 w-full flex flex-col items-center justify-start text-center px-4 pt-32 md:pt-48">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-3xl md:text-5xl font-black text-white mb-4 drop-shadow-xl max-w-2xl mx-auto"
            >
              {featuredPost.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-2xl text-white/90 mb-6 max-w-xl mx-auto font-serif drop-shadow"
            >
              {featuredPost.excerpt?.slice(0, 120)}{featuredPost.excerpt && featuredPost.excerpt.length > 120 ? '…' : ''}
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              href={`/blog/${featuredPost.id}`}
              className="inline-flex items-center gap-2 text-white text-lg font-semibold underline underline-offset-4 hover:text-green-200 transition-colors"
            >
              Lire la suite
              <ArrowRight className="w-5 h-5" />
            </motion.a>
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