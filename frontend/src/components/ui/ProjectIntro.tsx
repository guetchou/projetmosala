import { motion } from "framer-motion";
import { Sparkles, CheckCircle, MapPin, Star, Zap, Users, TrendingUp, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ProjectIntro = () => {
  const stats = [
    {
      number: "15,000+",
      label: "Emplois disponibles",
      icon: TrendingUp,
      color: "text-gray-700"
    },
    {
      number: "500+",
      label: "Entreprises partenaires",
      icon: Users,
      color: "text-gray-700"
    },
    {
      number: "25,000+",
      label: "Candidats formés",
      icon: Award,
      color: "text-gray-700"
    },
    {
      number: "95%",
      label: "Taux de satisfaction",
      icon: Star,
      color: "text-gray-700"
    }
  ];

  const projectHighlights = [
    {
      icon: CheckCircle,
      text: "Projet AFD/UE",
      description: "Financé par l'Agence Française de Développement et l'Union Européenne"
    },
    {
      icon: MapPin,
      text: "6 villes visitées",
      description: "Caravane itinérante dans tout le Congo"
    },
    {
      icon: Star,
      text: "10,000+ jeunes sensibilisés",
      description: "Impact direct sur la jeunesse congolaise"
    },
    {
      icon: Zap,
      text: "Caravane itinérante",
      description: "Accompagnement de proximité"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/95 backdrop-blur-md text-gray-700 rounded-full text-lg font-bold mb-6 tracking-wider shadow-lg border border-white/50"
          >
            <Sparkles className="h-5 w-5" />
            Projet d'insertion professionnelle au Congo
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6 leading-tight"
          >
            <span className="text-gray-900">
              Mosala
            </span>
            <br />
            <span className="text-gray-700">
              accompagne
            </span>
            <br />
            <span className="text-gray-900">
              la jeunesse congolaise
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
          >
            Projet financé par l'AFD et l'Union Européenne pour l'emploi des jeunes. 
            Caravane itinérante, formations, accompagnement et mise en relation avec les opportunités locales.
          </motion.p>
        </motion.div>

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-colors">
                <stat.icon className="h-8 w-8 text-gray-600" />
              </div>
              <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Points forts du projet */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {projectHighlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
                <highlight.icon className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{highlight.text}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{highlight.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call-to-action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Prêt à rejoindre le projet Mosala ?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Découvrez nos services, participez à la caravane ou créez votre profil pour accéder aux opportunités.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/jobs">
                <Button className="bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:from-gray-700 hover:to-gray-800 transition-all text-lg">
                  Voir les emplois
                </Button>
              </Link>
              <Link to="/formations">
                <Button variant="outline" className="border-2 border-gray-600 text-gray-700 hover:bg-gray-50 font-bold px-8 py-3 rounded-full transition-all text-lg">
                  Découvrir les formations
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectIntro; 