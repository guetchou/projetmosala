export type MosalaRole = {
  key: string;
  label: string;
  description: string;
  permissions: string[];
  features: string[];
};

export const MOSALA_ROLES: MosalaRole[] = [
  {
    key: "candidat",
    label: "Candidat",
    description: "Jeune diplômé, artisan ou demandeur d’emploi",
    permissions: [
      "Créer/modifier son profil",
      "Postuler à des offres"
    ],
    features: [
      "Recherche & filtres d’offres",
      "Alertes personnalisées",
      "Historique de candidatures"
    ]
  },
  {
    key: "recruteur",
    label: "Recruteur / Employeur",
    description: "Responsable RH, chef d’entreprise ou ONG",
    permissions: [
      "Publier/modifier/supprimer des offres",
      "Gérer son profil entreprise"
    ],
    features: [
      "Annuaire candidats",
      "Statistiques de candidatures",
      "Chat intégré avec postulants"
    ]
  },
  {
    key: "admin",
    label: "Administrateur",
    description: "Membre de l’équipe Mosala ou partenaire institutionnel",
    permissions: [
      "Gestion du contenu (FAQ, blog, pages statiques)",
      "Gestion des utilisateurs et de leurs rôles"
    ],
    features: [
      "Dashboard global (inscriptions, offres, trafic)",
      "Modération profils et offres"
    ]
  },
  {
    key: "superadmin",
    label: "Super-Admin",
    description: "Utilisateur technique de très haut niveau (Mosala IT)",
    permissions: [
      "Tous les droits sur la plateforme",
      "Configuration système",
      "Gestion des rôles et des accès",
      "Audit logs"
    ],
    features: [
      "Accès complet à tous les dashboards et paramètres infra (CI/CD, déploiement, monitoring, sécurité)"
    ]
  },
  {
    key: "moderateur_caravane",
    label: "Modérateur Caravane",
    description: "Coordinateur des étapes “Caravane Mosala”",
    permissions: [
      "Validation des inscriptions offline",
      "Synchronisation des enregistrements terrain",
      "Gestion des ateliers"
    ],
    features: [
      "Interface de synchronisation offline",
      "Suivi des participants par étape",
      "Export de listes CSV/PDF"
    ]
  }
]; 