## Guide d'utilisation – Document d'acceptance (UAT / Recette)

### Objectif
Fournir une méthode rapide pour préparer, exécuter et clôturer la recette utilisateur pour chaque release.

### Étapes recommandées
1. Dupliquer `docs/ACCEPTANCE_DOCUMENT.md` en `docs/acceptance/ACCEPTANCE_YYYYMMDD_<version>.md`.
2. Renseigner les sections 1 à 4 avant le démarrage UAT.
3. Lier le référentiel de cas de tests (fichiers `.feature`, tableur, outil QA).
4. Pendant UAT: renseigner la table des scénarios et consigner les défauts.
5. En clôture: compléter critères de sortie, synthèse et décision.

### Bonnes pratiques
- Prioriser les scénarios métiers critiques et parcours utilisateurs principaux.
- Définir des seuils d'acceptation clairs (P0/P1) avant le démarrage.
- Conserver des preuves: captures, exports KPI, logs pertinents.
- Impliquer la coordination et, si nécessaire, les bailleurs pour la validation.

### Intégration au process de release
- L'étape UAT est obligatoire avant mise en production.
- Bloquer le déploiement si critères d'acceptation non atteints.
- Archiver tous les documents UAT par release dans `docs/acceptance/`.


