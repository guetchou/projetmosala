import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Briefcase, User, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

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
  import React from "react";
	
  // Candidate space removed — admin-only site.
  export default function CandidateSpace() {
    return null;
  }
export default CandidateSpace; 