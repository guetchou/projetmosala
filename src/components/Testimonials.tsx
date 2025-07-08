import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Quote } from "lucide-react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "J'ai décroché un stage de développeur en moins de 2 semaines grâce aux alertes SMS.",
      author: "Jean-Pierre",
      age: "24 ans",
      role: "Développeur"
    },
    {
      quote: "Mon ONG a pu recruter 30 bénévoles en un mois. L'espace recruteur est un vrai gain de temps !",
      author: "Marie-Claire",
      age: "",
      role: "Responsable RH"
    },
    {
      quote: "Artisan-bijoutier, j'ai reçu ma première commande en ligne dès la semaine suivante !",
      author: "David",
      age: "28 ans", 
      role: "Artisan-bijoutier"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-mosala-yellow/5 to-mosala-orange/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-mosala-dark mb-4">
            Ils Ont Choisi Mosala
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-border text-center max-w-2xl mx-auto">
                  <Quote className="h-12 w-12 text-primary mx-auto mb-6" />
                  <blockquote className="text-lg md:text-xl text-mosala-dark mb-6 font-medium leading-relaxed">
                    « {testimonial.quote} »
                  </blockquote>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="font-bold text-mosala-dark">{testimonial.author}</span>
                    {testimonial.age && (
                      <>
                        <span className="text-muted-foreground">,</span>
                        <span className="text-muted-foreground">{testimonial.age}</span>
                      </>
                    )}
                  </div>
                  <p className="text-primary font-medium">{testimonial.role}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;