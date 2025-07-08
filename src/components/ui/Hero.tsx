import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Download,
  Star,
  Users,
  Target,
  TrendingUp,
  CheckCircle,
  Sparkles,
  Globe,
  BookOpen,
  Briefcase,
  GraduationCap,
  Check
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const stats = [
  { icon: Users, value: "15,000+", label: "Jeunes accompagnés" },
  { icon: Briefcase, value: "2,500+", label: "Offres d'emploi" },
  { icon: Star, value: "4.8/5", label: "Satisfaction" },
  { icon: TrendingUp, value: "100+", label: "Partenaires" }
];

const features = [
  { icon: Briefcase, text: "Offres d'emploi et stages pour tous" },
  { icon: Users, text: "Communauté et réseau Mosala" },
  { icon: Sparkles, text: "Accompagnement personnalisé et coaching" },
  { icon: Globe, text: "Plateforme inclusive, mobile et innovante" }
];

const Hero = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#0A0A14] via-[#1a1833] to-[#18182f] overflow-hidden">
      {/* Image de fond humaine avec overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(46, 134, 193, 0.6), rgba(30, 132, 73, 0.4)), url('/lovable-uploads/carrousel/mosala1.jpeg')`,
            filter: 'blur(1px)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A14]/80 via-[#1a1833]/90 to-[#18182f]/80"></div>
      </div>

      {/* Arrière-plan avec motifs animés */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#6E45E2]/30 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#00FFFF]/30 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-[#F9D923]/30 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Bannière promo */}
        <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-white py-2"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>🚀 Mosala : 1ère plateforme d'emploi, d'accompagnement et d'impact social au Congo !</span>
            <Sparkles className="h-4 w-4" />
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Côté gauche - Contenu */}
              <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={item}>
              <div className="inline-flex items-center bg-[#6E45E2]/10 text-[#6E45E2] hover:bg-[#6E45E2]/20 px-4 py-2 text-sm font-medium rounded-full">
                <Globe className="h-4 w-4 mr-2" />Inclusion, innovation, impact social
              </div>
              </motion.div>

            {/* Titre principal */}
            <motion.div variants={item} className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                Construisez votre avenir avec
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6E45E2] to-[#F9D923]"> Mosala</span>
              </h1>
              <p className="text-xl text-[#F5F5F7] leading-relaxed">
                Plateforme inclusive pour l'emploi, l'accompagnement, la formation et la réussite professionnelle au Congo.
              </p>
            </motion.div>

            {/* Fonctionnalités */}
            <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  className="flex items-center space-x-3 text-[#F5F5F7]"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-[#6E45E2]/10 rounded-full flex items-center justify-center">
                    <feature.icon className="h-4 w-4 text-[#6E45E2]" />
                  </div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Boutons CTA */}
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
              <Link to="/jobs">
              <Button 
                size="lg" 
                  className="bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] hover:from-[#6E45E2]/90 hover:to-[#00FFFF]/90 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                  <Briefcase className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Trouver un emploi
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              </Link>
              <Link to="/orientation">
              <Button 
                  variant="outline"
                size="lg" 
                  className="border-2 border-[#6E45E2] text-[#6E45E2] hover:bg-[#6E45E2] hover:text-white font-semibold px-8 py-4 text-lg transition-all duration-300 group"
              >
                  <BookOpen className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Démarrer mon orientation
              </Button>
              </Link>
            </motion.div>

            {/* Statistiques */}
            <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[#2a2a3a]">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-[#6E45E2]/10 rounded-full mx-auto mb-2">
                    <stat.icon className="h-6 w-6 text-[#6E45E2]" />
                </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-[#F5F5F7]/80">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Côté droit - Illustration */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Illustration principale */}
            <div className="relative">
              {/* Carte principale */}
              <motion.div
                initial={{ rotate: -5, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
              >
                {/* En-tête de la carte */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#6E45E2] to-[#F9D923] rounded-full flex items-center justify-center">
                      <Briefcase className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#18182f]">Accompagnement Mosala</h3>
                      <p className="text-sm text-gray-500">Coaching, offres, réseau, impact</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center bg-[#F9D923]/10 text-[#F9D923] px-4 py-2 text-sm font-medium rounded-full">Actif</div>
                </div>

                {/* Graphique remplacé par des indicateurs d'accompagnement */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Coaching personnalisé</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "95%" }}
                        transition={{ duration: 1, delay: 2.0 }}
                        className="h-full bg-[#6E45E2] rounded-full"
                      />
                    </div>
                    <span className="text-sm text-gray-600">95%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Accès aux offres</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: 2.2 }}
                        className="h-full bg-[#00FFFF] rounded-full"
                      />
                    </div>
                    <span className="text-sm text-gray-600">100%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Communauté & réseau</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "90%" }}
                        transition={{ duration: 1, delay: 2.4 }}
                        className="h-full bg-[#F9D923] rounded-full"
                      />
                    </div>
                    <span className="text-sm text-gray-600">90%</span>
                  </div>
                </div>

                {/* Bouton de progression */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.6 }}
                  className="mt-6"
                >
                  <Link to="/jobs">
                    <Button className="w-full bg-gradient-to-r from-[#6E45E2] to-[#F9D923] hover:from-[#6E45E2]/90 hover:to-[#F9D923]/90 text-white">
                      Découvrir les offres
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Éléments flottants */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="absolute -top-4 -right-4 bg-[#F9D923]/30 rounded-full p-3 shadow-lg"
              >
                <CheckCircle className="h-6 w-6 text-[#F9D923]" />
              </motion.div>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.7 }}
                className="absolute -bottom-4 -left-4 bg-[#00FFFF]/20 rounded-full p-3 shadow-lg"
              >
                <TrendingUp className="h-6 w-6 text-[#00FFFF]" />
              </motion.div>
            </div>

            {/* Avis client flottant */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.0 }}
              className="absolute -bottom-8 -right-8 bg-white rounded-lg shadow-lg p-4 border border-gray-100 max-w-xs"
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-[#F9D923] fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium text-[#18182f]">4.8/5</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                "Grâce à Mosala, j'ai trouvé ma voie professionnelle !"
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-[#6E45E2] rounded-full"></div>
                <span className="text-xs text-gray-500">Marie K., Brazzaville</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Vague décorative en bas */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-[#6E45E2]/10"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-[#00FFFF]/10"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-[#6E45E2]/20"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;