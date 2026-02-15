import { motion } from "framer-motion";
import { Lightbulb, Rocket, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Mission = () => {
  const features = [
    {
      icon: Lightbulb,
      title: "Inclusion",
      description: "Un site optimisé pour les connexions faibles et mobile-first",
      color: "text-mosala-yellow",
      to: "/about"
    },
    {
      icon: Rocket,
      title: "Innovation", 
      description: "Moteur de recherche intelligent & PWA offline",
      color: "text-mosala-green",
      to: "/advanced-search"
    },
    {
      icon: Heart,
      title: "Proximité",
      description: "Support local 24/7 (chatbot, WhatsApp, email)",
      color: "text-mosala-orange",
      to: "/support"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section className="py-12 bg-[var(--color-mosala-white)] relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-1/4 w-64 h-64 bg-[var(--color-mosala-green-200)]/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1], 
          x: [0, 50, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-48 h-48 bg-[var(--color-mosala-orange-200)]/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2], 
          x: [0, -30, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-4"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-primary font-semibold">Notre Mission</span>
            <Sparkles className="h-5 w-5 text-primary" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-[#2D8A5C] mb-4">
            Notre Mission
          </h2>
          <p className="text-lg text-[#4A4A4A] max-w-3xl mx-auto">
            Projet financé par l'AFD et l'Union Européenne, Mosala accompagne la jeunesse congolaise vers l'emploi 
            à travers une caravane itinérante, des formations et un accompagnement personnalisé.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <Link to={feature.to} key={feature.title} className="block group" tabIndex={0} aria-label={feature.title}>
              <motion.div
                variants={itemVariants}
                className="text-center p-6 rounded-xl bg-[var(--color-mosala-white)] border-2 border-[var(--color-mosala-green-300)] shadow-lg hover:shadow-xl transition-all group-hover:scale-105 cursor-pointer relative overflow-hidden"
                whileHover={{ 
                  y: -5, 
                  scale: 1.02,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
                }}
              >
                {/* Hover background effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] rounded-full flex items-center justify-center mx-auto mb-3 relative z-10"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                  {/* Sparkle effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    whileHover={{
                      boxShadow: [
                        "0 0 0 0 rgba(255, 213, 0, 0.7)",
                        "0 0 0 8px rgba(255, 213, 0, 0)",
                        "0 0 0 16px rgba(255, 213, 0, 0)"
                      ]
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>

                <motion.h3 
                  className="text-lg font-bold text-[var(--color-mosala-dark-500)] mb-2 relative z-10 group-hover:text-primary"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.title}
                </motion.h3>
                <p className="text-sm text-muted-foreground relative z-10">{feature.description}</p>

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-transparent"
                  whileHover={{
                    borderImage: "linear-gradient(45deg, #009640, #FFD500, #F39200, #E30613) 1"
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;