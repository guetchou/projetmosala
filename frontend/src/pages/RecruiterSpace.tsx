
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
  return null;
}
import React from "react";

// Recruiter space removed — admin-only site.
export default function RecruiterSpace() {
  return null;
}
