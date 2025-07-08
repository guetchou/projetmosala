import { motion } from "framer-motion";
import { Search, User, Map, Bell, Users, Wifi, ArrowRight, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Search,
      title: "Recherche avancée",
      description: "Mots-clés, filtres géographiques",
      color: "from-mosala-green to-mosala-yellow"
    },
    {
      icon: User,
      title: "Création de profil",
      description: "Photo, vidéo, CV en ligne\nSauvegarde auto et suggestions",
      color: "from-mosala-yellow to-mosala-orange"
    },
    {
      icon: Map,
      title: "Carte interactive 3D",
      description: "Zoom, clusters, Street View local\nPhotos issues du projet Mosala",
      color: "from-mosala-orange to-mosala-red"
    },
    {
      icon: Bell,
      title: "Alertes personnalisées",
      description: "SMS, email ou in-app",
      color: "from-mosala-red to-mosala-green"
    },
    {
      icon: Users,
      title: "Espace recruteur",
      description: "Publication d'annonces, tri automatique\nChat intégré & statistiques avancées",
      color: "from-mosala-green to-mosala-orange"
    },
    {
      icon: Wifi,
      title: "Mode hors-ligne",
      description: "Consultation sans connexion\nSauvegarde des dernières offres",
      color: "from-mosala-yellow to-mosala-red"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Floating background elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32 rounded-full opacity-10"
          style={{
            background: `linear-gradient(45deg, 
              hsl(var(--mosala-green)), 
              hsl(var(--mosala-yellow)), 
              hsl(var(--mosala-orange)))`,
            top: `${10 + i * 20}%`,
            left: `${5 + i * 18}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: i * 0.8
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-mosala-dark mb-4"
            whileInView={{ 
              backgroundImage: [
                "linear-gradient(45deg, #009640, #FFD500)",
                "linear-gradient(45deg, #FFD500, #F39200)",
                "linear-gradient(45deg, #F39200, #E30613)",
                "linear-gradient(45deg, #E30613, #009640)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Ce que vous pouvez faire avec Mosala
          </motion.h2>
          
          <motion.div
            className="w-24 h-1 bg-gradient-mosala mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="bg-white p-6 rounded-2xl shadow-sm border border-border hover:shadow-mosala hover:border-primary/20 transition-all group cursor-pointer relative overflow-hidden"
              whileHover={{ 
                y: -15, 
                scale: 1.03,
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
              }}
              style={{ perspective: "1000px" }}
            >
              {/* Animated background gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5`}
                initial={{ scale: 0, rotate: 0 }}
                whileHover={{ scale: 1.2, rotate: 180 }}
                transition={{ duration: 0.6 }}
              />

              {/* Lightning effect on hover */}
              <motion.div
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0, rotate: 0 }}
                whileHover={{ scale: 1, rotate: 360 }}
                transition={{ duration: 0.4 }}
              >
                <Zap className="h-4 w-4 text-mosala-yellow" />
              </motion.div>

              <motion.div 
                className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform relative`}
                whileHover={{ 
                  rotate: [0, -10, 10, 0],
                  scale: 1.2
                }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="h-6 w-6 text-white" />
                
                {/* Pulse effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(0, 150, 64, 0.7)",
                      "0 0 0 10px rgba(0, 150, 64, 0)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              <motion.h3 
                className="text-xl font-bold text-mosala-dark mb-3 group-hover:text-primary transition-colors"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {feature.title}
              </motion.h3>

              <motion.p 
                className="text-muted-foreground whitespace-pre-line group-hover:text-mosala-dark transition-colors"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                {feature.description}
              </motion.p>

              {/* Arrow indicator */}
              <motion.div
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="h-5 w-5 text-primary" />
              </motion.div>

              {/* Animated border on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-transparent"
                whileHover={{
                  borderImage: "linear-gradient(45deg, transparent, rgba(0, 150, 64, 0.3), transparent) 1"
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;