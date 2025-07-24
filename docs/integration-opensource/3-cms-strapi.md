# 3. CMS Headless : Strapi

## Objectif
Permettre la gestion de contenu (pages, articles, médias) via une interface admin moderne et exposer une API (REST/GraphQL) pour le frontend.

## Prérequis
- Docker installé
- Accès à PostgreSQL (ou autre DB supportée)

## Procédure détaillée

### 1. Déploiement de Strapi (en local via Docker)
```bash
docker run -d --name strapi \
  -p 1337:1337 \
  -e DATABASE_CLIENT=postgres \
  -e DATABASE_NAME=mosala \
  -e DATABASE_HOST=host.docker.internal \
  -e DATABASE_PORT=5433 \
  -e DATABASE_USERNAME=postgres \
  -e DATABASE_PASSWORD=postgres \
  strapi/strapi
```
- Adapter les variables selon ta config PostgreSQL

### 2. Configuration initiale
- Accéder à http://localhost:1337/admin
- Créer le premier compte admin
- Créer les collections (ex : jobs, entreprises, articles...)
- Configurer les permissions publiques/privées

### 3. Intégration avec le frontend
- Récupérer les données via l’API REST ou GraphQL de Strapi
- Exemple d’appel API :
```js
fetch('http://localhost:1337/api/jobs')
  .then(res => res.json())
  .then(data => console.log(data));
```
- Pour l’upload d’images, utiliser le plugin "Upload" de Strapi (stockage local ou S3/MinIO)

### 4. Sécurisation
- Restreindre l’accès à l’admin Strapi en production
- Configurer les rôles et permissions API

## Points de vigilance
- Bien choisir le type de permissions pour chaque collection
- Sauvegarder régulièrement la base de données
- Mettre à jour Strapi pour bénéficier des correctifs de sécurité

## Liens utiles
- [Strapi Docs](https://docs.strapi.io/)
- [Strapi Docker](https://hub.docker.com/r/strapi/strapi)
- [Strapi GraphQL](https://docs.strapi.io/dev-docs/api/graphql) 