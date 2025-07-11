import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Briefcase, User, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  {
    label: "Voir les offres",
    icon: Briefcase,
    to: "/jobs",
    desc: "Consultez toutes les offres d'emploi et de stage."
  },
  {
    label: "Mes candidatures",
    icon: FileText,
    to: "/candidates/applications",
    desc: "Suivez vos candidatures et leur statut."
  },
  {
    label: "Mon profil",
    icon: User,
    to: "/profile",
    desc: "Gérez vos informations personnelles et CV."
  }
];

const CandidateSpace = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[var(--color-mosala-green-500)] via-[var(--color-mosala-yellow-100)] to-[var(--color-mosala-dark-900)]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center mb-8 bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-transparent bg-clip-text"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Espace Candidat
      </motion.h1>
      <motion.p
        className="text-lg text-center text-[var(--color-mosala-dark-400)] mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        Bienvenue sur votre tableau de bord Mosala. Accédez rapidement à vos outils et suivez votre parcours professionnel.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {quickLinks.map((link, i) => (
          <motion.div
            key={link.label}
            className="bg-[var(--color-mosala-white)]/80 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-[var(--color-mosala-green-100)] hover:scale-105 transition-transform duration-300 group"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.6, type: "spring" }}
            whileHover={{ scale: 1.05 }}
          >
            <link.icon className="h-12 w-12 mb-4 text-[var(--color-mosala-green-500)] group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-bold text-[var(--color-mosala-green-700)] mb-2">{link.label}</h2>
            <p className="text-[var(--color-mosala-dark-400)] mb-4">{link.desc}</p>
            <Link to={link.to} className="inline-flex items-center text-[var(--color-mosala-green-600)] font-semibold hover:underline">
              Accéder <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default CandidateSpace; 