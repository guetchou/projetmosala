import { motion } from "framer-motion";
import { Lightbulb, Rocket, HandHeart } from "lucide-react";

const Mission = () => {
  const features = [
    {
      icon: Lightbulb,
      title: "Inclusion",
      description: "Un site optimisé pour les connexions faibles et mobile-first"
    },
    {
      icon: Rocket,
      title: "Innovation", 
      description: "Moteur de recherche intelligent & PWA offline"
    },
    {
      icon: HandHeart,
      title: "Proximité",
      description: "Support local 24/7 (chatbot, WhatsApp, email)"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-mosala-dark mb-6">
            Notre Mission
          </h2>
          <blockquote className="text-xl md:text-2xl text-muted-foreground font-medium max-w-4xl mx-auto mb-8">
            « Connecter chaque talent congolais aux opportunités qui leur ressemblent. »
          </blockquote>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-mosala transition-all"
            >
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-mosala-dark mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;