import { Link } from "react-router-dom";
import { Zap, UserPlus, Map, Bell, UserCog, WifiOff } from "lucide-react";

  const features = [
    {
      title: "Recherche avancée",
    desc: "Trouvez l'emploi idéal grâce à des filtres intelligents et une recherche par mots-clés.",
    icon: Zap,
    to: "/advanced-search",
    },
    {
      title: "Création de profil",
    desc: "Créez un profil complet avec photo, vidéo, CV en ligne et suggestions personnalisées.",
    icon: UserPlus,
    to: "/profile-creation",
    },
    {
    title: "Carte interactive 3D",
    desc: "Explorez les opportunités sur une carte 3D, avec zoom, clusters et photos Mosala.",
      icon: Map,
    to: "/map-3d",
    },
    {
    title: "Alertes personnalisées",
    desc: "Recevez des notifications par SMS, email ou in-app selon vos préférences.",
      icon: Bell,
    to: "/alerts",
    },
    {
      title: "Espace recruteur",
    desc: "Publiez des annonces, triez automatiquement les candidatures et accédez à des statistiques avancées.",
    icon: UserCog,
    to: "/recruiter-space",
    },
    {
      title: "Mode hors-ligne",
    desc: "Consultez les offres sans connexion et sauvegardez les dernières opportunités.",
    icon: WifiOff,
    to: "/offline-mode",
  },
];

const Features = () => (
  <section className="py-16 bg-[var(--color-mosala-white)]/80">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-[var(--color-mosala-dark-500)]">Fonctionnalités avancées</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <Link
            to={feature.to}
            key={feature.title}
            className="block bg-[var(--color-mosala-white)] rounded-xl shadow-lg p-6 hover:shadow-[var(--color-mosala-green-500)]/30 border border-[var(--color-mosala-dark-200)] transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <feature.icon className="h-8 w-8 text-[var(--color-mosala-green-500)] group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-[var(--color-mosala-dark-500)] group-hover:text-[var(--color-mosala-green-500)]">{feature.title}</h3>
            </div>
            <p className="text-[var(--color-mosala-dark-700)]/80">{feature.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default Features;