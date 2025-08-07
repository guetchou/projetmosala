import { useFeaturedPosts } from "@/hooks/useBlog";
import { ArrowRight, Calendar, User, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const CATEGORY_COLORS = {
  "À la une": 'bg-red-500/20 text-red-600',
  "Partenariats": 'bg-blue-500/20 text-blue-600',
  "Caravane": 'bg-orange-500/20 text-orange-600',
  "Formation": 'bg-green-500/20 text-green-600',
  "Inclusion": 'bg-pink-500/20 text-pink-600',
  "Conseils": 'bg-purple-500/20 text-purple-600',
  "Marché de l'emploi": 'bg-indigo-500/20 text-indigo-600',
  default: 'bg-gray-500/20 text-gray-600'
};

export default function ActualitesSection() {
  const { data: featuredPosts = [], isLoading } = useFeaturedPosts();
  const actualites = featuredPosts.slice(0, 6); // Limiter à 6 articles mis en avant

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header éditorial */}
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 font-bold uppercase tracking-widest mb-4">Actualités Officielles</span>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 drop-shadow">Le Journal Mosala</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Les actualités officielles du projet MOSALA : lancement, résultats de la caravane, partenariats stratégiques et impact sur l'emploi des jeunes congolais.
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des actualités officielles...</p>
        </div>
      ) : actualites.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-gray-500">Aucune actualité disponible pour le moment.</p>
        </div>
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            1024: { slidesPerView: 2.2 },
            1280: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          navigation
          className="pb-8"
          modules={[Pagination, Navigation]}
        >
          {actualites.map((post) => {
            const badgeClass = CATEGORY_COLORS[post.category] || CATEGORY_COLORS.default;
            return (
              <SwiperSlide key={post.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="bg-white rounded-3xl shadow-xl p-0 flex flex-col h-full transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100"
                >
                  {/* Image + badge catégorie */}
                  <div className="relative rounded-t-3xl overflow-hidden aspect-[16/9] bg-gray-100">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/topcenter-uploads/default-news.jpg";
                      }}
                    />
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${badgeClass}`}>
                      {post.category}
                    </span>
                    {post.externalLink && (
                      <span className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold bg-white/90 text-gray-700 shadow-lg">
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  {/* Contenu éditorial */}
                  <div className="flex-1 flex flex-col p-6">
                    <h3 className="font-bold text-xl mb-3 text-gray-900 line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    {/* Métadonnées */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('fr-FR', { 
                          day: '2-digit', 
                          month: 'short', 
                          year: '2-digit' 
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                    </div>

                    {/* Statistiques */}
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <span>{post.views} vues</span>
                      <span>{post.likes} likes</span>
                      <span>{post.readTime} min de lecture</span>
                    </div>

                    {/* Bouton d'action */}
                    <div className="flex justify-end mt-auto">
                      {post.externalLink ? (
                        <a
                          href={post.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:scale-105"
                        >
                          Lire l'article officiel <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <a
                          href={`/blog/${post.id}`}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:scale-105"
                        >
                          Lire la suite <ArrowRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      {/* Call-to-action pour voir toutes les actualités */}
      <div className="text-center mt-12">
        <a
          href="/blog"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200"
        >
          Voir toutes les actualités <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
} 