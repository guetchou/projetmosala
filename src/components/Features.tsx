import { motion } from "framer-motion";
import { Search, User, Map, Bell, Users, Wifi } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Search,
      title: "Recherche avancée",
      description: "Mots-clés, filtres géographiques"
    },
    {
      icon: User,
      title: "Création de profil",
      description: "Photo, vidéo, CV en ligne\nSauvegarde auto et suggestions"
    },
    {
      icon: Map,
      title: "Carte interactive 3D",
      description: "Zoom, clusters, Street View local\nPhotos issues du projet Mosala"
    },
    {
      icon: Bell,
      title: "Alertes personnalisées",
      description: "SMS, email ou in-app"
    },
    {
      icon: Users,
      title: "Espace recruteur",
      description: "Publication d'annonces, tri automatique\nChat intégré & statistiques avancées"
    },
    {
      icon: Wifi,
      title: "Mode hors-ligne",
      description: "Consultation sans connexion\nSauvegarde des dernières offres"
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
          <h2 className="text-3xl md:text-4xl font-bold text-mosala-dark mb-4">
            Ce que vous pouvez faire avec Mosala
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-border hover:shadow-mosala hover:border-primary/20 transition-all group"
            >
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-mosala-dark mb-3">{feature.title}</h3>
              <p className="text-muted-foreground whitespace-pre-line">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;