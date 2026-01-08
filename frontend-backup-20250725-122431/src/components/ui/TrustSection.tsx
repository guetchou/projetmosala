import { motion } from "framer-motion";
import { CheckCircle, Star, Users, TrendingUp, Award, Globe } from "lucide-react";

const TrustSection = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      number: "15,000+",
      label: "Emplois disponibles",
      color: "text-gray-600",
      bgColor: "bg-gray-100"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      number: "500+",
      label: "Entreprises partenaires",
      color: "text-gray-600",
      bgColor: "bg-gray-100"
    },
    {
      icon: <Award className="h-8 w-8" />,
      number: "25,000+",
      label: "Candidats formés",
      color: "text-gray-600",
      bgColor: "bg-gray-100"
    },
    {
      icon: <Star className="h-8 w-8" />,
      number: "95%",
      label: "Taux de satisfaction",
      color: "text-gray-600",
      bgColor: "bg-gray-100"
    }
  ];

  const testimonials = [
    {
      name: "Fatou Diallo",
      role: "Développeuse Full Stack",
      company: "TechStart Dakar",
      image: "/testimonials/fatou.jpg",
      quote: "Grâce à Mosala, j'ai trouvé mon premier emploi en tech en seulement 2 mois ! L'accompagnement était exceptionnel.",
      rating: 5
    },
    {
      name: "Kofi Mensah",
      role: "Chef de projet",
      company: "Innovation Lab Accra",
      image: "/testimonials/kofi.jpg",
      quote: "La formation en gestion de projet m'a permis de décrocher un poste de direction. Mosala change vraiment des vies !",
      rating: 5
    },
    {
      name: "Aisha Oumar",
      role: "Data Scientist",
      company: "Digital Solutions Nairobi",
      image: "/testimonials/aisha.jpg",
      quote: "Excellente plateforme ! J'ai pu me former aux nouvelles technologies et trouver un emploi bien rémunéré.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Titre de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Pourquoi faire confiance à{" "}
            <span className="bg-gradient-to-r from-gray-600 to-gray-700 text-transparent bg-clip-text">
              Mosala
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Rejoignez des milliers de professionnels qui ont transformé leur carrière avec notre plateforme
          </p>
        </motion.div>

        {/* Statistiques principales */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Témoignages */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Ils ont transformé leur carrière avec Mosala
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                {/* Note */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gray-400 text-gray-400" />
                  ))}
                </div>
                
                {/* Citation */}
                <blockquote className="text-gray-700 mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                
                {/* Auteur */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-gray-600 font-medium">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Indicateurs de confiance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-gray-100/10 to-gray-200/10 rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Certifications reconnues</h4>
              <p className="text-gray-600 text-sm">Toutes nos formations sont certifiantes et reconnues par l'industrie</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Résultats garantis</h4>
              <p className="text-gray-600 text-sm">95% de nos candidats trouvent un emploi dans les 6 mois</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Accompagnement personnalisé</h4>
              <p className="text-gray-600 text-sm">Un mentor dédié pour vous guider à chaque étape</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Réseau panafricain</h4>
              <p className="text-gray-600 text-sm">Opportunités dans toute l'Afrique et à l'international</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection; 