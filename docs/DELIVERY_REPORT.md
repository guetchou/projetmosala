## Rapport de livraison – Projet MOSALA

But: documenter formellement la livraison (version, périmètre, artefacts, contrôles qualité) et servir de référence pour la mise en production et la traçabilité.

### 1. Informations générales
- **Projet**: 
- **Release / Version**: 
- **Date de livraison**: 
- **Environnements cibles**: (UAT/Préprod/Prod + URLs)
- **Responsable livraison**: 
- **Contact technique**: 

### 2. Périmètre de la livraison
- **Fonctionnalités incluses**: (liste concise; références specs / user stories)
- **Correctifs inclus**: (références issues/#)
- **Éléments non inclus / différés**: 

### 3. Artefacts livrés
- **Frontend**: (bundle, version, checksum, registre)
- **Backend / API**: (image, tag, checksum, registre)
- **Base de données**: (scripts de migration, version de schéma)
- **Documentation**: (guides utilisateur, notes techniques)
- **Scripts / Jobs**: (cron, ETL, batch)
- **Autres**: (fichiers de configuration, assets)

Pour chaque artefact, préciser: nom, version, origine (CI run/commit), empreinte (SHA256), emplacement de stockage, et méthode de restauration.

### 4. Changelog synthétique
- Lier au changelog détaillé si disponible (ex: `CHANGELOG.md` ou releases Git)
- Résumer les changements majeurs, breaking changes, migrations, et impacts utilisateurs

### 5. Qualité et conformité
- **Statut UAT/Recette**: (référence `docs/ACCEPTANCE_DOCUMENT.md`, synthèse: Pass/Fail/Blocked, réserves)
- **Défauts ouverts tolérés**: (P1/P2, justification et plan de correction)
- **Tests automatisés**: (unitaires, intégration, e2e – taux de succès, couverture si pertinent)
- **Sécurité / RGPD**: (scans, dépendances, secrets, données; conformité aux exigences)
- **Accessibilité / i18n**: (critères ciblés et statut)

### 6. Prérequis et dépendances
- **Infrastructures**: (versions requises de runtime, OS, DB, services tiers)
- **Variables d'environnement / secrets**: (liste et portée; référencer coffre/secret manager, ne pas exposer la valeur)
- **Compatibilité**: (navigateurs, appareils, API partenaires)

### 7. Instructions d'installation / déploiement
- **Fenêtre de déploiement**: (date/heure, durée estimée, charge)
- **Procédure standard**: étapes numérotées pour chaque environnement
  1. Sauvegardes/exports (DB, fichiers)
  2. Mise hors-ligne/maintenance si nécessaire
  3. Déploiement des artefacts (ordre, commandes, outils)
  4. Exécution des migrations
  5. Vérifications post-déploiement (smoke tests)
  6. Mise en ligne / purge cache / invalidations CDN
- **Paramétrages spécifiques**: (feature flags, toggles, configs)

### 8. Plan de rollback
- **Déclencheurs**: (critères d'activation)
- **Procédure**: (étapes détaillées pour revenir à la version N-1)
- **Données**: (stratégie si migrations destructives; scripts de rétroversion ou restauration sauvegardes)

### 9. Vérifications post-déploiement
- **Smoke tests**: (parcours critiques, résultats attendus)
- **Monitoring / alerting**: (tableaux de bord, métriques clés, seuils)
- **KPI projet / bailleurs**: (indicateurs à vérifier et capturer)

### 10. Impacts et communication
- **Impacts utilisateurs**: (changements UX, interruptions prévues)
- **Plan de communication**: (canaux, messages, calendrier)
- **Guides / notes de version**: (lien vers notes destinées aux utilisateurs)

### 11. Risques résiduels et actions de mitigation
- **Risques**: (liste courte)
- **Actions**: (responsable, échéance)

### 12. Validation
- **Décision**: Prêt pour Prod / Prêt avec réserves / À re-travailler
- **Visas**:
  - Responsable produit / métiers: Nom, Date, Signature
  - Responsable technique: Nom, Date, Signature
  - Qualité (QA): Nom, Date, Signature
  - Représentant bailleurs (si requis): Nom, Date, Signature

Annexes:
- Logs de build (CI), artefacts et empreintes
- Exports des rapports de tests / défauts
- Captures des KPI et tableaux de bord de monitoring


