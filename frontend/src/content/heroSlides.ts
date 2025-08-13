export type HeroSlide = {
  id: string;
  title: string;        // H1 du slide
  subtitle?: string;    // phrase courte
  ctas?: { label: string; to: string; variant?: 'primary' | 'secondary' }[];
  image: {
    original: string;   // ex: "/topcenter-uploads/carrousel/mosala-jeunes1.png"
    webp1200?: string;  // si déjà généré
    webp2000?: string;  // si déjà généré
    focusY?: string;    // ex: "15%" pour éviter de couper les têtes
  };
};

export const heroSlidesFallback: HeroSlide[] = [
  {
    id: 'lancement',
    title: "Lancement officiel du projet MOSALA : tremplin vers l'emploi",
    subtitle: "Formations, accompagnement, mise en relation",
    ctas: [
      { label: "Consulter les offres d'emploi", to: "/jobs", variant: 'primary' },
      { label: "Découvrir nos formations", to: "/formations", variant: 'secondary' }
    ],
    image: {
      original: "/topcenter-uploads/carrousel/mosala1.jpeg",
      webp1200: "/topcenter-uploads/carrousel/mosala1@1200.webp",
      webp2000: "/topcenter-uploads/carrousel/mosala1@2000.webp",
      focusY: "60%"
    }
  },
  {
    id: 'jeunes',
    title: "Insertion professionnelle des jeunes au Congo",
    subtitle: "AFD et Union Européenne aux côtés de la jeunesse congolaise",
    ctas: [{ label: "Nos services", to: "/services", variant: 'primary' }],
    image: {
      original: "/topcenter-uploads/carrousel/mosala2.jpeg",
      webp1200: "/topcenter-uploads/carrousel/mosala2@1200.webp",
      webp2000: "/topcenter-uploads/carrousel/mosala2@2000.webp",
      focusY: "50%"
    }
  },
  {
    id: 'formation',
    title: "Formation et accompagnement personnalisé",
    subtitle: "Développement des compétences pour l'emploi",
    ctas: [
      { label: "Découvrir nos formations", to: "/formations", variant: 'primary' },
      { label: "En savoir plus", to: "/about", variant: 'secondary' }
    ],
    image: {
      original: "/topcenter-uploads/carrousel/mosala3.jpeg",
      webp1200: "/topcenter-uploads/carrousel/mosala3@1200.webp",
      webp2000: "/topcenter-uploads/carrousel/mosala3@2000.webp",
      focusY: "50%"
    }
  },
  {
    id: 'partenariat',
    title: "Partenariat international pour l'emploi",
    subtitle: "Ministère de la Jeunesse et Ambassade de France",
    ctas: [{ label: "Nos partenaires", to: "/partners", variant: 'primary' }],
    image: {
      original: "/topcenter-uploads/carrousel/mosala5-ministre-jeunesse-ambassadeur-france-congo.jpeg",
      webp1200: "/topcenter-uploads/carrousel/mosala5-ministre-jeunesse-ambassadeur-france-congo@1200.webp",
      webp2000: "/topcenter-uploads/carrousel/mosala5-ministre-jeunesse-ambassadeur-france-congo@2000.webp",
      focusY: "50%"
    }
  }
];
