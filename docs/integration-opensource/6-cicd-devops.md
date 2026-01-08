# 6. CI/CD & DevOps : GitHub Actions, Docker, Terraform

## Objectif
Automatiser les tests, le build, le déploiement et la gestion de l’infrastructure avec des outils open source et standards du marché.

## Prérequis
- Compte GitHub
- Docker installé
- Accès à un serveur de déploiement (VM, cloud, etc.)

## Procédure détaillée

### 1. Mise en place de GitHub Actions (CI/CD)
- Créer un fichier `.github/workflows/ci.yml` dans le repo :
```yaml
name: CI
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test
```
- Adapter pour le backend, le frontend, etc.

### 2. Dockerisation des services
- Créer un `Dockerfile` pour chaque service (backend, frontend, etc.)
- Exemple pour Node.js :
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["node", "dist/main.js"]
```
- Builder et tester localement :
```bash
docker build -t mosala-backend .
docker run -p 4000:4000 mosala-backend
```

### 3. Infrastructure as Code avec Terraform
- Installer Terraform : https://developer.hashicorp.com/terraform/downloads
- Exemple d’init de projet :
```bash
mkdir infra && cd infra
terraform init
```
- Écrire des fichiers `.tf` pour décrire l’infra (VM, DB, S3, etc.)
- Appliquer :
```bash
terraform plan
terraform apply
```

## Points de vigilance
- Ne jamais stocker de secrets dans le code (utiliser GitHub Secrets)
- Tester les images Docker localement avant déploiement
- Versionner les fichiers Terraform

## Liens utiles
- [GitHub Actions Docs](https://docs.github.com/actions)
- [Docker Docs](https://docs.docker.com/)
- [Terraform Docs](https://developer.hashicorp.com/terraform/docs) 