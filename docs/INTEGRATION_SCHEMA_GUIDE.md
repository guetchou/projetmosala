## Guide d'intégration du canevas et du schéma

Ce guide explique comment transformer les fichiers YAML conformes à `docs/schema/contenu_projet.schema.yml` en contenus affichés sur le site.

### 1. Où stocker les fichiers
- Placer les fichiers projet dans `docs/schema/projets/*.yml` (un fichier par projet).
- Conserver un exemple à jour dans `docs/schema/exemples/projet_exemple.yml`.

### 2. Champs clés → Composants frontend
- `identite` → page projet (titre, acronyme, zone, période, partenaires, liens)
- `contexte` → section contexte/besoins
- `objectifs` → blocs objectifs (global + spécifiques)
- `resultats[].indicateurs[]` → tableau KPI et graphiques
- `activites[].livrables[]` → timeline/roadmap et documents téléchargeables
- `gouvernance` → organigramme simplifié + RACI
- `bailleurs` → encart attentes et calendrier de reporting
- `contenus_site` → SEO, taxonomies, médias, langues

### 3. Pipelines d'import suggérés
1. Lecture YAML → validation (JSON Schema-like) → mapping objets → écriture dans la source de vérité (CMS headless ou fichiers markdown/JSON).
2. Build frontend lit la source de vérité pour générer les pages.

### 4. Exemple de mapping technique (Next.js / Astro / Nuxt)
- Stocker un JSON normalisé `project.content.json` par projet (généré depuis YAML).
- Clé `slug` dérivée de `identite.intitule`.
- Pages:
  - `/projets/[slug]/index` → sections: identité, contexte, objectifs
  - `/projets/[slug]/resultats` → tableaux d'indicateurs et graphiques
  - `/projets/[slug]/activites` → timeline et livrables

### 5. Validation et CI
- Ajoutez un job CI pour valider tout YAML contre `contenu_projet.schema.yml`.
- Refuser le merge si validation échoue.

### 6. Multilingue
- Définir les champs multilingues (si besoin) via suffixes (`_fr`, `_en`) ou structure `i18n: { fr: ..., en: ... }`.
- Maintenir la langue par défaut `fr` si non spécifiée.

### 7. SEO et médias
- Générer meta titre/description par page à partir de `contenus_site.seo`.
- Vérifier droits des médias avant publication.

### 8. Démarrage rapide
1. Dupliquer `docs/schema/exemples/projet_exemple.yml` dans `docs/schema/projets/mosala.yml`.
2. Compléter le contenu avec l'équipe coordination.
3. Ajouter une étape d'import dans le backend/CMS ou un script de build.
4. Lancer le site et vérifier les sections.


