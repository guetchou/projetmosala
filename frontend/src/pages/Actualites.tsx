import React, { useState, useEffect } from 'react';
import { Calendar, ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { actualitesAPI, type Actualite } from '../api/actualites';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Actualites: React.FC = () => {
  const [news, setNews] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await actualitesAPI.getAll();
      setNews(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  // Note: we always render the page chrome (Navbar/Footer) and show loading/error states inside the content area

  // Pagination
  const totalPages = Math.ceil(news.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedNews = news.slice(startIndex, startIndex + itemsPerPage);
  
  // Séparer les articles à la une et normaux
  const featuredNews = news.filter(item => item.aLaUne);
  const regularNews = news.filter(item => !item.aLaUne);

  return (
    <div className="min-h-screen bg-background pt-0 flex flex-col">
      <Navbar />
      
      {/* Hero avec fond VERT */}
      <div className="bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-primary-foreground py-8  shadow-md sticky z-30" style={{ top: 'var(--nav-h)' }}>
        <div className="max-w-7xl mx-auto mt-1 text-center">
          <h1 className="text-3xl md:text-4xl font-medium">Retrouvez toutes nos actualités</h1>
         
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-4 py-12 flex-1 w-full">
        {loading && (
          <div className="col-span-full text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground font-medium">Chargement des actualités...</p>
          </div>
        )}
        {error && (
          <div className="bg-white border border-destructive/30 rounded-lg p-6 text-destructive max-w-md mx-auto">
            <p className="font-semibold mb-2">Erreur</p>
            <p>{error}</p>
          </div>
        )}
        {!loading && !error && news.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-4">Aucune actualité disponible pour le moment.</p>
            <Link to="/" className="text-primary hover:text-primary/80 font-semibold inline-block">
              ← Retour à l'accueil
            </Link>
          </div>
        )}
        {!loading && !error && news.length > 0 && (
        <>
          {/* Section "À la une" avec Carousel */}
          {featuredNews.length > 0 && (
            <div className="mb-16 py-12">
              <h2 className="text-2xl font-bold text-foreground mb-8">À la une</h2>
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={24}
                slidesPerView={1}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                className="featured-news-carousel"
              >
                {featuredNews.map((item) => (
                  <SwiperSlide key={item.id}>
                    <article className="bg-white rounded-xl border border-slate-100 shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden bg-slate-100">
                        <img
                          src={item.imageUrl || 'https://images.unsplash.com/photo-1557804506-669714131143?w=500&h=300&fit=crop'}
                          alt={item.titre}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-[#FF6B6B] to-[#EE5A52] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          À la une
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <p className="text-xs text-slate-500 mb-3 font-medium flex items-center gap-2 uppercase tracking-wide">
                          <Calendar className="w-4 h-4" />
                          {item.date ? new Date(item.date).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }) : 'Date non disponible'}
                        </p>
                        <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 flex-1">
                          {item.titre}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                          {item.excerpt || item.contenu.substring(0, 150)}
                        </p>
                        
                        {/* Actions */}
                        <div className="flex gap-2 mt-auto">
                          <Link
                            to={`/actualites/${item.id}`}
                            className="flex-1 bg-gradient-to-r from-mosala-green-600 to-mosala-green-700 hover:from-mosala-green-700 hover:to-mosala-green-800 text-white font-semibold py-2 px-3 rounded-lg transition transform hover:scale-105 text-center text-sm shadow-md"
                          >
                            Lire la suite
                          </Link>
                          {item.lien && (
                            <a
                              href={item.lien}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-gradient-to-r from-slate-100 to-slate-50 hover:from-slate-200 hover:to-slate-100 text-foreground font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2 shadow-sm"
                              title="Lire l'article officiel"
                            >
                              <ExternalLinkIcon className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {/* Grille d'actualités régulières */}
          <div className="mb-12">
            <h2 className={`text-2xl font-bold text-foreground mb-8 ${featuredNews.length > 0 ? '' : ''}`}>
              {featuredNews.length > 0 ? 'Autres actualités' : 'Actualités'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedNews.filter(item => !item.aLaUne).map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-100 shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col group"
                >
                  {/* Image avec overlay */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={item.imageUrl || 'https://images.unsplash.com/photo-1557804506-669714131143?w=500&h=300&fit=crop'}
                      alt={item.titre}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-xs text-slate-500 mb-3 font-medium flex items-center gap-2 uppercase tracking-wide">
                      <Calendar className="w-4 h-4" />
                      {item.date ? new Date(item.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }) : 'Date non disponible'}
                    </p>
                    <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 flex-1 group-hover:text-mosala-green-600 transition-colors">
                      {item.titre}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                      {item.excerpt || item.contenu.substring(0, 150)}
                    </p>
                    
                    {/* Actions */}
                    <div className="flex gap-2 mt-auto">
                      <Link
                        to={`/actualites/${item.id}`}
                        className="flex-1 bg-gradient-to-r from-mosala-green-600 to-mosala-green-700 hover:from-mosala-green-700 hover:to-mosala-green-800 text-white font-semibold py-2 px-3 rounded-lg transition transform hover:scale-105 text-center text-sm shadow-md"
                      >
                        Lire
                      </Link>
                      {item.lien && (
                        <a
                          href={item.lien}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-slate-100 to-slate-50 hover:from-slate-200 hover:to-slate-100 text-foreground font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2 shadow-sm"
                          title="Lire l'article officiel"
                        >
                          <ExternalLinkIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    page === pageNum
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-white text-foreground border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          )}
        </>
      )}
      </div>
      <Footer />
    </div>
  );
};

export default Actualites;
