
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Briefcase, Users, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

const quickLinks = [
  {
    label: "Gérer mes offres",
    icon: Briefcase,
    to: "/employers/jobs",
    desc: "Publiez, modifiez ou supprimez vos offres d'emploi."
  },
  {
    label: "Candidatures reçues",
    icon: FileText,
    to: "/employers/applications",
    desc: "Consultez et gérez les candidatures reçues."
  },
  {
    label: "Profil entreprise",
    icon: Users,
    to: "/employers/profile",
    desc: "Mettez à jour les infos de votre entreprise."
  }
];

const RecruiterSpace = () => {
  const navbarRef = useRef<HTMLElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
    const handleResize = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-mosala-green-500 via-mosala-yellow-100 to-mosala-dark-900" style={{ paddingTop: navbarHeight }}>
      <Navbar ref={navbarRef} />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center mb-8 bg-gradient-to-r from-mosala-green-500 to-mosala-yellow-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Espace Recruteur
        </motion.h1>
        <motion.p
          className="text-lg text-center text-mosala-dark-400 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Bienvenue sur votre espace entreprise Mosala. Gérez vos offres, suivez les candidatures et développez votre marque employeur.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quickLinks.map((link, i) => (
            <motion.div
              key={link.label}
              className="bg-white/80 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-mosala-green-100 hover:scale-105 transition-transform duration-300 group"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.05 }}
            >
              <link.icon className="h-12 w-12 mb-4 text-mosala-green-500 group-hover:scale-110 transition-transform" />
              <h2 className="text-xl font-bold text-mosala-green-700 mb-2">{link.label}</h2>
              <p className="text-mosala-dark-400 mb-4">{link.desc}</p>
              <Link to={link.to} className="inline-flex items-center text-mosala-green-600 font-semibold hover:underline">
                Accéder <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RecruiterSpace;
