import { useQuery } from "@tanstack/react-query";

// MOCK: Données statiques pour le blog (à remplacer par l'API quand elle sera disponible)
const mockPosts = [
  {
    id: "1",
    title: "7 astuces pour rendre votre profil irrésistible",
    excerpt: "Découvrez des conseils pratiques pour mettre en valeur vos compétences, structurer votre CV et capter l’attention des recruteurs dès les premières secondes.",
    date: "2024-06-01",
    image: "/images-mosala/photos-projet-mosala/photo-projet-mosala5.jpeg",
    category: "Carrière & CV",
    author: "Équipe Mosala"
  },
  {
    id: "2",
    title: "Les secteurs porteurs en 2025 au Congo",
    excerpt: "Analyse des filières en croissance : agritech, numérique, artisanat digital, énergies renouvelables… Identifiez les opportunités qui correspondent à votre profil.",
    date: "2024-05-20",
    image: "/topcenter-uploads/carrousel/secteursporteurs.png",
    category: "Marché de l’emploi",
    author: "Équipe Mosala"
  },
  {
    id: "3",
    title: "Réussir son entretien à distance",
    excerpt: "Préparez-vous efficacement aux entretiens en visioconférence : environnement, posture, gestion du stress et réponses aux questions pièges.",
    date: "2024-05-10",
    image: "/topcenter-uploads/carrousel/entretienembauche.jpg",
    category: "Carrière & CV",
    author: "Équipe Mosala"
  },
  {
    id: "4",
    title: "Témoignages inspirants de la diaspora congolaise",
    excerpt: "Parcours de Congolais ayant réussi à l’étranger : leurs conseils, défis surmontés et le rôle de Mosala dans leur success story.",
    date: "2024-04-28",
    image: "/topcenter-uploads/dc40e710-f029-4dbb-9fbd-593f85573051.png",
    category: "Témoignages",
    author: "Équipe Mosala"
  },
  {
    id: "5",
    title: "Comment utiliser la Caravane Mosala",
    excerpt: "Guide pratique pour participer aux étapes de la Caravane : inscription offline, ateliers CV, simulations d’entretien et networking local.",
    date: "2024-04-15",
    image: "/topcenter-uploads/264fe1f1-8c99-414c-97df-7ea214db45d2.png",
    category: "Événements & Caravane",
    author: "Équipe Mosala"
  }
];

export function useBlog() {
  return useQuery({
    queryKey: ["blog"],
    queryFn: async () => mockPosts
  });
} 