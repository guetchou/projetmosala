## Document d'acceptance (UAT / Recette) – Projet MOSALA

But: cadrer la recette utilisateur, formaliser les critères d'acceptation et la décision de mise en production.

### 1. Informations générales
- **Projet**: 
- **Version livrée / Release**: 
- **Périmètre de la recette**: 
- **Date de démarrage UAT**: 
- **Date de clôture UAT**: 
- **Environnements**: (URL, versions backend/frontend, base de données)
- **Données de test**: (jeu de données, anonymisation, comptes)

### 2. Rôles et responsabilités
- **Responsable recette (métiers)**: 
- **Coordinateur UAT**: 
- **Référent qualité (QA)**: 
- **Équipe technique**: 
- **Bailleurs / représentants** (si impliqués): 

### 3. Périmètre et livrables couverts
- **Fonctionnalités**: (liste concise, liens vers specs/user stories)
- **Livrables**: (build, migrations, documentation utilisateur, scripts)
- **Non inclus**: (hors scope pour cette release)

### 4. Critères d'entrée (Entry Criteria)
- Environnement UAT prêt et stable (versions gelées, accès fournis)
- Données de test disponibles et validées
- Cas de test écrits et revus
- Suivi des défauts configuré (outil, workflow)
- Guides utilisateur/minis how-to disponibles

### 5. Plan de tests (vue synthétique)
- **Stratégie**: (basée sur risques, scénarios métier critiques d'abord)
- **Jeu de tests**: (lien vers référentiel: test cases/BDD, e.g. `.feature`/sheet)
- **Couverture visée**: (ex: 100% scénarios critiques, 80% fonctionnalités)
- **Non régression**: (fumée/smoke, check parcours clés)
- **Accessibilité / i18n**: (critères WCAG ciblés, langues supportées)

### 6. Scénarios UAT et résultats

| ID | Titre scénario | Préconditions | Étapes | Résultat attendu | Statut | Défaut(s) |
|----|----------------|---------------|--------|------------------|--------|-----------|
| UAT-001 |  |  |  |  | Pass/Fail/Blocked | #DEF-123 |
| UAT-002 |  |  |  |  |  |  |

Statuts: Pass, Fail, Blocked, N/A.

### 7. Défauts et suivi
- **Outil**: (ex: GitHub Issues/Jira), lien: 
- **Règles de priorité**: (P0 critique, P1 majeur, P2 mineur)
- **Seuil d'acceptation**: (ex: 0 P0, ≤2 P1, P2 tolérés si workaround)
- **Rapport de défauts**: (export/rapport à la clôture)

### 8. Critères de sortie (Exit Criteria / Acceptation)
- Tous les scénarios critiques en Pass
- Aucun défaut P0 ouvert, P1 selon seuil accepté
- Documentation utilisateur à jour
- Scripts/migrations testés sur UAT
- Checklists de go-live complètes

### 9. Conformité bailleurs et exigences spécifiques
- Exigences de reporting vérifiées (formats, fréquences)
- Exigences de visibilité (logos, mentions) respectées
- Indicateurs/KPI démontrés sur UAT (captures, exports)

### 10. Non-fonctionnel
- Performance (temps de réponse cibles, tests de charge si requis)
- Sécurité (authN/authZ, rôles, journaux, RGPD/local)
- Accessibilité (WCAG ciblé), compatibilité navigateurs/appareils

### 11. Checklist de mise en production (Go-Live)
- Sauvegardes réalisées et vérifiées
- Fenêtre de déploiement planifiée et communiquée
- Plan de communication utilisateur prêt
- Procédure de rollback définie et testée
- Points de contrôle post-déploiement (smoke test, monitoring)

### 12. Décision d'acceptation
- **Synthèse UAT**: (points saillants, risques résiduels)
- **Décision**: Accepté / Accepté avec réserves / Refusé
- **Réserves** (si applicable): (liste, échéance de levée)

Signatures:
- Responsable Recette (métiers): Nom, Date, Signature
- Coordinateur de Projet: Nom, Date, Signature
- Représentant Bailleurs (optionnel): Nom, Date, Signature

Annexes:
- Liens vers cas de test détaillés, rapports défauts, métriques de performance, captures.


