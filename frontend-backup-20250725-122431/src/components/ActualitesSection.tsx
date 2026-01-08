import { useBlog } from "@/hooks/useBlog";
import { ArrowRight, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const CATEGORY_COLORS = {
  emploi: 'bg-[#1cc7d0]/20 text-[#1cc7d0]',
  formation: 'bg-[#2fdab8]/20 text-[#2fdab8]',
  caravane: 'bg-[#ff7844]/20 text-[#ff7844]',
  partenariats: 'bg-[#6476f3]/20 text-[#6476f3]',
  breaking: 'bg-[#fa496e]/20 text-[#fa496e]',
  default: 'bg-[#6476f3]/10 text-[#22304a]'
};

export default function ActualitesSection() {
  const { data: posts = [], isLoading } = useBlog();
  const actualites = posts.slice(0, 8);

  return (
    <section className="py-10 bg-[#f6f9fc]">
      {/* Header éditorial */}
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-2 rounded-full bg-[#6476f3]/10 text-[#6476f3] font-bold uppercase tracking-widest mb-4">Actualités</span>
        <h2 className="text-4xl md:text-5xl font-black text-[#22304a] mb-2 drop-shadow">Le Journal Mosala</h2>
        <p className="text-lg text-[#22304a]/80 max-w-2xl mx-auto">L’actualité de l’emploi, de la formation et de l’innovation au Congo. Sélection éditoriale, analyses d’experts, et inspirations du web mondial.</p>
      </div>
      {isLoading ? (
        <div className="text-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6476f3] mx-auto"></div>
          <p className="mt-4 text-[#22304a]">Chargement des actualités...</p>
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
            const cat = post.category?.toLowerCase() || 'default';
            const badgeClass = CATEGORY_COLORS[cat] || CATEGORY_COLORS.default;
            return (
              <SwiperSlide key={post.id}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="bg-white rounded-3xl shadow-xl p-0 flex flex-col h-full transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{ border: '1px solid #e3e8ee' }}
                >
                  {/* Image + badge catégorie */}
                  <div className="relative rounded-t-3xl overflow-hidden aspect-[16/9] bg-[#6476f3]/10">
                    <img src={post.image} alt={post.title} className="object-cover w-full h-full" />
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow ${badgeClass}`}>{post.category || 'Actualité'}</span>
                  </div>
                  {/* Contenu éditorial */}
                  <div className="flex-1 flex flex-col p-6">
                    <h3 className="font-bold text-xl mb-2 text-[#22304a] drop-shadow-sm line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-700 text-base mb-4 line-clamp-2">
                      {post.excerpt?.slice(0, 120)}{post.excerpt && post.excerpt.length > 120 ? '…' : ''}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-[#6476f3] mb-4">
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(post.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: '2-digit' })}</span>
                      <span className="flex items-center gap-1"><User className="w-4 h-4" />{post.author}</span>
                    </div>
                    <div className="flex justify-end mt-auto">
                      <a
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow hover:scale-105 transition glassmorphism-cta"
                        style={{
                          background: 'rgba(100, 118, 243, 0.7)',
                          backdropFilter: 'blur(6px)',
                          WebkitBackdropFilter: 'blur(6px)',
                          border: '1px solid rgba(255,255,255,0.3)',
                          color: '#22304a'
                        }}
                      >
                        Lire la suite <ArrowRight className="w-5 h-5 ml-1" />
                      </a>
                    </div>
          </div>
        </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </section>
  );
} 