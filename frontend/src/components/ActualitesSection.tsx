import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, TrendingUp, ExternalLink, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { actualitesAPI, Actualite } from "@/api/actualites";

export default function ActualitesSection() {
  const [featured, setFeatured] = useState<Actualite | null>(null);
  const [recent, setRecent] = useState<Actualite[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      
      // Récupérer toutes les actualités
      const allNews = await actualitesAPI.getAll();
      
      // Séparerà la une et récentes
      const featuredData = allNews.find(n => n.aLaUne);
      if (featuredData) {
        setFeatured(featuredData);
      }

      // Récupérer les 5 actualités les plus récentes
      const recentData = allNews.filter(n => !n.aLaUne).slice(0, 5);
      setRecent(recentData as Actualite[]);
    } catch (error) {
      console.error('Erreur lors du chargement des actualités:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 md:py-32 bg-white">
      {/* Header éditorial */}
      <div className="text-center mb-16 px-4">
        <span className="inline-block px-4 py-2 rounded-full bg-[#2D8A5C]/10 text-[#2D8A5C] font-bold uppercase tracking-widest mb-4 text-sm">Actualités Officielles</span>
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">Les actualités du projet</h2>
        <div className="flex justify-center mb-6">
          <div className="h-1 w-20 bg-[#2D8A5C] rounded-full"></div>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Les actualités officielles du projet MOSALA : lancement, résultats de la caravane, partenariats stratégiques et impact sur l'emploi des jeunes congolais.
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des actualités officielles...</p>
        </div>
      ) : !featured && recent.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-gray-500">Aucune actualité disponible pour le moment.</p>
        </div>
      ) : (
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Article À la une - Mis en avant */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-64 lg:h-full overflow-hidden">
                    {featured.imageUrl ? (
                      <img 
                        src={featured.imageUrl} 
                        alt={featured.titre} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        onError={(e) => {
                          (e.target as HTMLImageElement).parentElement!.innerHTML = `
                            <div class="w-full h-full bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center">
                              <svg class="w-16 h-16 text-blue-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-blue-400/50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Badge À la une */}
                    <div className="absolute top-6 left-6">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white font-bold text-sm shadow-lg">
                        <TrendingUp className="w-4 h-4" />
                        À LA UNE
                      </span>
                    </div>
                    
                    {/* Badge externe si lien officiel */}
                    {featured.lien && (
                      <div className="absolute top-6 right-6">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 text-gray-700 font-semibold text-xs shadow-lg">
                          <ExternalLink className="w-3 h-3" />
                          Source officielle
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(featured.date || featured.created_at || '').toLocaleDateString('fr-FR', { 
                          day: '2-digit', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {featured.titre}
                    </h3>

                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                      {featured.excerpt || featured.contenu}
                    </p>

                    {/* Bouton d'action */}
                    <div className="flex justify-start">
                      {featured.lien ? (
                        <a
                          href={featured.lien}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
                        >
                          Lire l'article officiel <ExternalLink className="w-5 h-5" />
                        </a>
                      ) : (
                        <Link
                          to={`/actualites/${featured.id}`}
                          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
                        >
                          Lire la suite <ArrowRight className="w-5 h-5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Autres actualités en slide */}
          {recent.length > 0 && (
            <div>
              <h3 className="text-3xl font-black text-gray-900 mb-10 text-center">
                Autres actualités importantes ({recent.length} articles)
              </h3>
              
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
                {recent.map((post) => (
                  <SwiperSlide key={post.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                      className="bg-white rounded-2xl shadow-sm p-0 flex flex-col h-full transition-all duration-300 hover:shadow-2xl border border-gray-100"
                    >
                      {/* Image */}
                      <div className="relative rounded-t-2xl overflow-hidden aspect-[16/9] bg-gray-100 h-48">
                        {post.imageUrl ? (
                          <img 
                            src={post.imageUrl} 
                            alt={post.titre} 
                            className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                            onError={(e) => {
                              (e.target as HTMLImageElement).parentElement!.innerHTML = `
                                <div class="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                  <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                  </svg>
                                </div>
                              `;
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <ImageIcon className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                        {post.lien && (
                          <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-[#2D8A5C] text-white shadow-lg flex items-center gap-1">
                            <span>Nouveau</span>
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        )}
                      </div>

                      {/* Contenu éditorial */}
                      <div className="flex-1 flex flex-col p-6 bg-white">
                        <h4 className="font-bold text-lg mb-3 text-gray-900 line-clamp-2 leading-tight">
                          {post.titre}
                        </h4>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {post.excerpt || post.contenu}
                        </p>
                        
                        {/* Métadonnées */}
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.date || post.created_at || '').toLocaleDateString('fr-FR', { 
                              day: '2-digit', 
                              month: 'short', 
                              year: '2-digit' 
                            })}
                          </span>
                        </div>

                        {/* Bouton d'action */}
                        <div className="flex justify-end mt-auto">
                          {post.lien ? (
                            <a
                              href={post.lien}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                            >
                              Lire la suite <ArrowRight className="w-4 h-4" />
                            </a>
                          ) : (
                            <Link
                              to={`/actualites/${post.id}`}
                              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-white bg-[#2D8A5C] hover:bg-[#1f6644] transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                            >
                              Lire la suite <ArrowRight className="w-4 h-4" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {/* Call-to-action pour voir toutes les actualités */}
          <div className="text-center mt-16">
            <Link
              to="/actualites"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-[#2D8A5C] hover:bg-[#1f6644] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Voir toutes les actualités <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
} 