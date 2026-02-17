# 🚀 Mosala - Plateforme Complète

Une application web moderne avec frontend React, backend NestJS, et CMS Strapi.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Développement](#-développement)
- [Déploiement](#-déploiement)
- [Docker](#-docker)
- [Structure du projet](#-structure-du-projet)
- [API Documentation](#-api-documentation)
- [Contribuer](#-contribuer)
- [Licence](#-licence)

## ✨ Fonctionnalités

- **Frontend React** avec Vite, TypeScript et Tailwind CSS
- **Backend NestJS** avec authentification JWT
- **CMS Strapi** pour la gestion de contenu
- **Base de données** MySQL et PostgreSQL
- **Docker** pour le déploiement
- **WebSockets** pour les communications en temps réel
- **Interface moderne** avec shadcn/ui

## 🏗️ Architecture

```
mosala/
├── frontend/          # Application React/Vite
├── backend/           # API NestJS
├── mosala-api/        # API Python (FastAPI)
├── mosala-cms/        # CMS Strapi
├── docs/              # Documentation
└── docker-compose.yml # Configuration Docker
```

## 📋 Prérequis

- Node.js 18+
- Docker et Docker Compose
- Git

## 🚀 Installation

### Option 1: Avec Docker (Recommandé)

```bash
# Cloner le repository
git clone https://github.com/votre-username/mosala.git
cd mosala

# Lancer avec Docker Compose
docker-compose up -d

# Les services seront disponibles sur :
# Frontend: http://localhost:1199
# Backend NestJS: http://localhost:4002
# Backend Python: http://localhost:1188
# Strapi CMS: http://localhost:1337
# MySQL: localhost:3326
# PostgreSQL: localhost:5433
```

### Option 2: Développement local

```bash
# Cloner le repository
git clone https://github.com/votre-username/mosala.git
cd mosala

# Installer les dépendances
npm install
cd frontend && npm install
cd ../backend && npm install
cd ../mosala-cms && npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos configurations

# Lancer les services
npm run dev          # Frontend
cd backend && npm run start:dev  # Backend NestJS
cd ../mosala-api && uvicorn app.main:app --reload  # Backend Python
cd ../mosala-cms && npm run develop  # Strapi CMS
```

## 💻 Développement

### Scripts disponibles

```bash
# Développement
npm run dev              # Frontend en mode développement
npm run build            # Build de production
npm run lint             # Linting
npm run preview          # Preview de production

# Backend
cd backend
npm run start:dev        # Mode développement
npm run build            # Build
npm run test             # Tests
npm run test:e2e         # Tests end-to-end
```

### Variables d'environnement

Créez un fichier `.env` à la racine :

```env
# Frontend
VITE_API_URL=http://localhost:4002
VITE_STRAPI_URL=http://localhost:1337

# Backend NestJS
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=mosala
JWT_SECRET=votre-secret-jwt

# Strapi
DATABASE_CLIENT=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=mosala
DATABASE_USERNAME=mosala
DATABASE_PASSWORD=mosala
```

## 🐳 Docker

### Images disponibles

- `mosala-frontend`: Application React
- `mosala-backend`: API NestJS
- `mosala-backend-python`: API Python
- `mosala-strapi`: CMS Strapi
- `mosala-db`: Base de données MySQL
- `mosala-postgres`: Base de données PostgreSQL

### Commandes Docker utiles

```bash
# Build des images
docker-compose build

# Lancer tous les services
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down

# Nettoyer les volumes
docker-compose down -v
```

## 📁 Structure du projet

```
mosala/
├── frontend/                 # Application React
│   ├── src/
│   │   ├── components/       # Composants réutilisables
│   │   ├── pages/           # Pages de l'application
│   │   ├── hooks/           # Hooks personnalisés
│   │   ├── utils/           # Utilitaires
│   │   └── types/           # Types TypeScript
│   ├── public/              # Assets statiques
│   └── package.json
├── backend/                  # API NestJS
│   ├── src/
│   │   ├── modules/         # Modules NestJS
│   │   ├── guards/          # Guards d'authentification
│   │   ├── decorators/      # Décorateurs personnalisés
│   │   └── main.ts          # Point d'entrée
│   └── package.json
├── mosala-api/              # API Python (FastAPI)
├── mosala-cms/              # CMS Strapi
├── docs/                    # Documentation
├── scripts/                 # Scripts utilitaires
├── docker-compose.yml       # Configuration Docker
├── Dockerfile               # Dockerfile principal
└── README.md
```

## 📚 API Documentation

### NestJS API (Port 4002)
- Swagger UI: http://localhost:4002/api
- Documentation complète des endpoints

### Python API (Port 1188)
- Swagger UI: http://localhost:1188/docs
- Documentation ReDoc: http://localhost:1188/redoc

### Strapi CMS (Port 1337)
- Admin panel: http://localhost:1337/admin
- API documentation: http://localhost:1337/documentation

## 🤝 Contribuer

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement

---

**Développé avec ❤️ par l'équipe Mosala**
