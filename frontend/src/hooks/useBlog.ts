import { useQuery } from "@tanstack/react-query";

// DONNÉES OFFICIELLES MOSALA - Source unique de vérité
const officialMosalaPosts = [
  {
    id: "1",
    title: "Lancement officiel du projet MOSALA : Un tremplin vers l'emploi pour 5000 jeunes",
    excerpt: "Le Ministre Hugues NGOUELONDELE lance officiellement le projet MOSALA, financé à plus de 6 milliards de FCFA par l'AFD et l'Union Européenne pour l'insertion professionnelle des jeunes congolais.",
    date: "2024-10-10",
    image: "images-mosala/photos-projet-mosala/ministre-jeunesse.jpg",
    category: "À la une",
    author: "Ministère de la Jeunesse et des Sports",
    content: "Lancement ce matin 10 octobre 2024 du projet MOSALA, un tremplin de la formation vers l'emploi pour une insertion réussie des jeunes. Le projet vise à renforcer l'employabilité des jeunes et réduire les inégalités du genre.",
    tags: ["Lancement", "Officiel", "Ministère"],
    readTime: 5,
    views: 1250,
    likes: 89,
    externalLink: "https://jeunesse-sports.gouv.cg/2024/10/11/lancement-du-projet-mosala/",
    featured: true
  },
  {
    id: "2",
    title: "Signature des conventions de financement MOSALA : 10,3 millions d'euros pour l'emploi des jeunes",
    excerpt: "La France et l'Union européenne réaffirment leur soutien au Congo avec un financement de 10,3 millions d'euros pour le projet MOSALA, visant l'autonomisation économique des jeunes en situation de vulnérabilité.",
    date: "2024-01-09",
    image: "images-mosala/photos-projet-mosala/convention-mosala.jpeg",
    category: "Partenariats",
    author: "Union Européenne",
    content: "Signature des conventions de financement du Projet de renforcement de l'adéquation formation – emploi, dénommé en lingala « Mosala » d'un montant total de 10,3 millions d'euros, financé à travers le Contrat de désendettement et de développement (C2D).",
    tags: ["Financement", "UE", "AFD"],
    readTime: 4,
    views: 980,
    likes: 67,
    externalLink: "https://www.eeas.europa.eu/delegations/congo-brazzaville/insertion-professionnelle-des-jeunes-le-projet-mosala-est-lanc%C3%A9_und_en",
    featured: true
  },
  {
    id: "3",
    title: "Caravane MOSALA : 2,449 jeunes enrôlés dans 4 villes du Congo",
    excerpt: "Résultats exceptionnels de la caravane itinérante : 6,600 visiteurs, 1,708 demandes de formation, et 20 jeunes déjà recrutés par CONGO TELECOM à Ouesso.",
    date: "2024-11-30",
    image: "images-mosala/photos-projet-mosala/lancement-mosala.jpg",
    category: "Caravane",
    author: "Équipe Mosala",
    content: "La caravane MOSALA a visité 4 villes (Brazzaville, Ouesso, Dolisie, Pointe-Noire) avec des résultats remarquables : 2,449 jeunes enrôlés, 6,600 visiteurs, 1,514 NEETs identifiés, et 32 offres d'emploi générées.",
    tags: ["Caravane", "Résultats", "Impact"],
    readTime: 6,
    views: 1450,
    likes: 112,
    externalLink: null,
    featured: true
  },
  {
    id: "4",
    title: "Focus sur les formations les plus demandées : Entrepreneuriat en tête",
    excerpt: "L'analyse des demandes de formation révèle que 35% des jeunes privilégient l'entrepreneuriat, suivis par la logistique (25%), le numérique (20%) et le BTP (20%).",
    date: "2024-11-25",
    image: "/topcenter-uploads/carrousel/mosala-jeunes1.png",
    category: "Formation",
    author: "FONEA",
    content: "Les formations les plus demandées lors de la caravane MOSALA montrent une forte appétence pour l'entrepreneuriat (35%), la logistique (25%), le numérique (20%) et le BTP (20%). Ces résultats orientent les prochaines actions de formation.",
    tags: ["Formation", "Entrepreneuriat", "Analyse"],
    readTime: 3,
    views: 720,
    likes: 45,
    externalLink: null,
    featured: false
  },
  {
    id: "5",
    title: "Partenariats stratégiques : CONGO TELECOM, OLAM, NOKI NOKI et YA DII",
    excerpt: "Le projet MOSALA développe des partenariats avec des entreprises majeures pour l'insertion professionnelle des jeunes, avec déjà 20 recrutements effectifs chez CONGO TELECOM.",
    date: "2024-11-20",
    image: "images-mosala/photos-projet-mosala/partenariat.jpg",
    category: "Partenariats",
    author: "ACPE",
    content: "Des discussions sont en cours avec plusieurs entreprises pour la formation et l'insertion professionnelle des jeunes : OLAM, CONGO TELECOM, NOKI NOKI, YA DII. 20 jeunes ont déjà été recrutés par CONGO TELECOM à Ouesso.",
    tags: ["Partenariats", "Entreprises", "Recrutement"],
    readTime: 4,
    views: 890,
    likes: 56,
    externalLink: null,
    featured: false
  },
  {
    id: "6",
    title: "Inclusion et diversité : 46 personnes en situation de handicap accompagnées",
    excerpt: "Le projet MOSALA met l'accent sur l'inclusion avec l'identification d'un centre de formation dédié aux jeunes en situation de handicap et l'accompagnement de 46 personnes.",
    date: "2024-11-15",
    image: "images-mosala/photos-projet-mosala/photo-projet-mosala6.jpeg",
    category: "Inclusion",
    author: "Équipe Mosala",
    content: "Le projet MOSALA s'engage pour l'inclusion avec l'identification d'un centre de formation dédié aux jeunes vivant en situation de handicap avec une cohorte de 30 jeunes en recherche d'accompagnement et de financement.",
    tags: ["Inclusion", "Handicap", "Diversité"],
    readTime: 4,
    views: 650,
    likes: 38,
    externalLink: null,
    featured: false
  },
  // Articles de conseils et ressources (complémentaires aux actualités officielles)
  {
    id: "7",
    title: "7 astuces pour rendre votre profil irrésistible",
    excerpt: "Découvrez des conseils pratiques pour mettre en valeur vos compétences, structurer votre CV et capter l'attention des recruteurs dès les premières secondes.",
    date: "2024-06-01",
    image: "/images-mosala/photos-projet-mosala/photo-projet-mosala5.jpeg",
    category: "Conseils",
    author: "Équipe Mosala",
    content: "Guide complet pour optimiser votre profil professionnel et maximiser vos chances de recrutement.",
    tags: ["CV", "Conseils", "Recrutement"],
    readTime: 5,
    views: 420,
    likes: 23,
    externalLink: null,
    featured: false
  },
  {
    id: "8",
    title: "Les secteurs porteurs en 2025 au Congo",
    excerpt: "Analyse des filières en croissance : agritech, numérique, artisanat digital, énergies renouvelables… Identifiez les opportunités qui correspondent à votre profil.",
    date: "2024-05-20",
    image: "/topcenter-uploads/carrousel/secteursporteurs.png",
    category: "Marché de l'emploi",
    author: "Équipe Mosala",
    content: "Analyse approfondie des secteurs d'activité en pleine croissance au Congo et des opportunités pour les jeunes.",
    tags: ["Marché", "Opportunités", "Analyse"],
    readTime: 4,
    views: 380,
    likes: 19,
    externalLink: null,
    featured: false
  }
];

export function useBlog() {
  return useQuery({
    queryKey: ["blog"],
    queryFn: async () => officialMosalaPosts
  });
}

// Hook pour récupérer uniquement les articles mis en avant (pour la page d'accueil)
export function useFeaturedPosts() {
  return useQuery({
    queryKey: ["blog", "featured"],
    queryFn: async () => officialMosalaPosts.filter(post => post.featured)
  });
}

// Hook pour récupérer les articles par catégorie
export function useBlogByCategory(category: string) {
  return useQuery({
    queryKey: ["blog", "category", category],
    queryFn: async () => {
      if (category === "all") return officialMosalaPosts;
      return officialMosalaPosts.filter(post => post.category === category);
    }
  });
}

// Hook pour récupérer un article spécifique
export function useBlogPost(id: string) {
  return useQuery({
    queryKey: ["blog", "post", id],
    queryFn: async () => officialMosalaPosts.find(post => post.id === id)
  });
} 