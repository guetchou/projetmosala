import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  MapPin, 
  MessageCircle, 
  Award, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap,
  ArrowRight,
  Star,
  Briefcase,
  GraduationCap
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Matching intelligent",
      description: "Notre IA analyse votre profil et vous propose les emplois qui correspondent parfaitement à vos compétences et aspirations.",
      color: "from-gray-600 to-gray-700",
      bgColor: "bg-gradient-to-br from-gray-100/10 to-gray-200/10",
      link: "/jobs"
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Cartographie interactive",
      description: "Visualisez les opportunités sur une carte interactive et trouvez des emplois près de chez vous ou dans votre région de prédilection.",
      color: "from-gray-600 to-gray-700",
      bgColor: "bg-gradient-to-br from-gray-100/10 to-gray-200/10",
      link: "/map"
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Support temps réel",
      description: "Chat intégré 24h/24 pour un accompagnement personnalisé. Nos experts sont là pour répondre à toutes vos questions.",
      color: "from-gray-600 to-gray-700",
      bgColor: "bg-gradient-to-br from-gray-100/10 to-gray-200/10",
      link: "/contact"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Formations certifiantes",
      description: "Programmes de formation reconnus par l'industrie, avec des certifications valorisées par les employeurs africains et internationaux.",
      color: "from-gray-600 to-gray-700",
      bgColor: "bg-gradient-to-br from-gray-100/10 to-gray-200/10",
      link: "/formations"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Communauté active",
      description: "Rejoignez une communauté de 25,000+ professionnels africains. Partagez, apprenez et développez votre réseau.",
      color: "from-gray-600 to-gray-700",
      bgColor: "bg-gradient-to-br from-gray-100/10 to-gray-200/10",
      link: "/community"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Suivi de carrière",
      description: "Suivez vos progrès, analysez vos performances et recevez des recommandations personnalisées pour votre évolution professionnelle.",
      color: "from-gray-600 to-gray-700",
      bgColor: "bg-gradient-to-br from-gray-100/10 to-gray-200/10",
      link: "/dashboard"
    }
  ];

  const highlights = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Sécurisé et fiable",
      description: "Vos données sont protégées avec les meilleures pratiques de sécurité"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Rapide et efficace",
      description: "Interface optimisée pour des résultats en quelques clics"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Qualité garantie",
      description: "Tous nos partenaires sont vérifiés et certifiés"
    }
  ];

  return (
    <section className="py-20 bg-white">
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
            Pourquoi choisir{" "}
            <span className="bg-gradient-to-r from-gray-600 to-gray-700 text-transparent bg-clip-text">
              Mosala Job Hub
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une plateforme complète qui combine technologie avancée et accompagnement humain pour votre réussite professionnelle
          </p>
        </motion.div>

        {/* Fonctionnalités principales */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link to={feature.link}>
                <div className={`${feature.bgColor} rounded-3xl p-8 h-full hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200`}>
                  {/* Icône */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  
                  {/* Contenu */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Lien */}
                  <div className="flex items-center text-gray-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    En savoir plus
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Section CTA principale */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-3xl p-12 text-center mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Prêt à transformer votre carrière ?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de professionnels qui ont déjà trouvé leur voie avec Mosala
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/jobs">
              <Button className="bg-white text-gray-700 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 text-lg">
                <Briefcase className="h-5 w-5 mr-2" />
                Trouver un emploi
              </Button>
            </Link>
            <Link to="/formations">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-full transition-all duration-300 text-lg">
                <GraduationCap className="h-5 w-5 mr-2" />
                Découvrir les formations
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Points forts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-white">
                  {highlight.icon}
                </div>
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-lg">
                {highlight.title}
              </h4>
              <p className="text-gray-600">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection; 