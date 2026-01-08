# Cahier des charges – Migration et refonte du projet Mosala

## 1. Objectifs

- Migrer le backend Python/FastAPI vers NestJS (TypeScript).
- Nettoyer et réorganiser le projet pour séparer clairement frontend et backend.
- Appliquer les architectures recommandées (modularité, sécurité, maintenabilité).
- Mettre à jour le docker-compose pour orchestrer la nouvelle stack.
- Documenter l’architecture et les conventions pour faciliter la maintenance.

---

## 2. Architecture cible

### 2.1. Organisation des dossiers

```
/mosala-job-hub
│
├── backend/                # NestJS (API, Auth, Business logic)
│   ├── src/
│   ├── test/
│   ├── Dockerfile
│   ├── package.json
│   └── ...
│
├── frontend/               # React/Vite (UI, SPA)
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── package.json
│   └── ...
│
├── docs/                   # Documentation technique et fonctionnelle
│
├── docker-compose.yml      # Orchestration des services
│
└── README.md               # Documentation projet
```

---

### 2.2. Backend (NestJS)

- **Framework** : [NestJS](https://docs.nestjs.com/)
- **ORM** : [TypeORM](https://typeorm.io/) ou [Prisma](https://www.prisma.io/)
- **Authentification** : JWT, bcrypt, Passport.js
- **Structure** :
  - `modules/` : un dossier par domaine métier (users, auth, caravane, jobs…)
  - `dto/` : Data Transfer Objects pour validation/sérialisation
  - `entities/` : Entités TypeORM/Prisma
  - `services/` : Logique métier
  - `controllers/` : Endpoints REST
  - `guards/` : Sécurité, rôles, permissions
  - `config/` : Configuration centralisée (env, base, JWT, etc.)
- **Tests** : Jest, tests unitaires et d’intégration

---

### 2.3. Frontend (React/Vite)

- **Framework** : [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **State management** : Zustand, Redux ou Context API
- **Routing** : React Router
- **Structure** :
  - `components/` : composants réutilisables
  - `pages/` : pages de l’application
  - `hooks/` : hooks personnalisés
  - `api/` : gestion des appels API (fetcher, services)
  - `styles/` : fichiers CSS/SCSS ou Tailwind
  - `types/` : types TypeScript partagés
  - `utils/` : utilitaires
- **Tests** : Vitest, React Testing Library

---

## 3. Étapes de migration

### 3.1. Nettoyage du projet

- Supprimer les anciens dossiers et fichiers inutiles (FastAPI, scripts Python, anciens Dockerfile, etc.).
- Archiver l’ancien backend si besoin (dans `/legacy`).

### 3.2. Migration Backend

1. **Initialisation du projet NestJS**
   - `nest new backend`
   - Configuration TypeScript, Prettier, ESLint

2. **Modélisation des entités et DTOs**
   - Traduire les modèles Pydantic/SQLAlchemy en entités TypeORM/DTOs

3. **Implémentation des modules**
   - `users`, `auth`, `caravane`, `jobs`…
   - Services, controllers, guards, validation

4. **Gestion de l’authentification**
   - JWT, bcrypt, Passport.js
   - Rôles et permissions

5. **Connexion à la base de données**
   - PostgreSQL/MySQL via TypeORM/Prisma
   - Variables d’environnement pour la config

6. **Tests**
   - Écrire des tests unitaires et d’intégration

7. **Dockerisation**
   - Dockerfile optimisé pour NestJS
   - Exposition du port 3000

### 3.3. Migration Frontend

1. **Initialisation du projet React/Vite**
   - `npm create vite@latest frontend -- --template react-ts`
   - Configuration Prettier, ESLint

2. **Organisation des dossiers**
   - Déplacer/adapter les composants, pages, hooks, etc.

3. **Connexion à la nouvelle API**
   - Adapter les appels API (URL, endpoints, headers JWT)

4. **Gestion de l’authentification côté client**
   - Stockage du token JWT (localStorage, cookies sécurisés)
   - Redirections selon le rôle

5. **Tests**
   - Écrire des tests unitaires et d’intégration

6. **Dockerisation**
   - Dockerfile optimisé pour React/Vite
   - Exposition du port 5173 (par défaut)

### 3.4. Orchestration Docker

- Mettre à jour le `docker-compose.yml` :
  - Services : `backend`, `frontend`, `db` (PostgreSQL/MySQL), autres services nécessaires
  - Réseaux, volumes, variables d’environnement
  - Healthchecks

---

## 4. Bonnes pratiques et conventions

- **Séparation stricte frontend/backend**
- **Utilisation de variables d’environnement pour toute config sensible**
- **Validation systématique des entrées (DTOs, pipes)**
- **Gestion centralisée des erreurs**
- **Tests automatisés**
- **Documentation API (Swagger pour NestJS)**
- **CI/CD (GitHub Actions, GitLab CI, etc.)**
- **Respect des conventions de nommage et de structure recommandées par la communauté**

---

## 5. Livrables attendus

- Projet réorganisé selon la structure ci-dessus
- Backend NestJS fonctionnel, dockerisé, testé
- Frontend React/Vite fonctionnel, dockerisé, testé
- Documentation technique et fonctionnelle à jour (`/docs`)
- Fichier `README.md` détaillé à la racine
- Fichier `docker-compose.yml` orchestrant l’ensemble

---

## 6. Documentation à produire

- **Schéma d’architecture** (diagramme)
- **Guide d’installation et de démarrage**
- **Guide de contribution**
- **Documentation API (Swagger)**
- **Exemples d’appels API**
- **Procédures de déploiement**

---

## 7. Exigences techniques

- **Node.js ≥ 18**
- **TypeScript ≥ 5**
- **NestJS ≥ 10**
- **React ≥ 18**
- **Vite ≥ 4**
- **Docker ≥ 20**
- **Base de données : PostgreSQL ou MySQL**

---

## 8. Planning indicatif

1. **Semaine 1** : Nettoyage, initialisation des nouveaux projets, modélisation
2. **Semaine 2** : Migration backend (modules principaux, auth, tests)
3. **Semaine 3** : Migration frontend, adaptation UI, connexion API
4. **Semaine 4** : Dockerisation, orchestration, documentation, tests finaux

---

## 9. Critères de réussite

- Architecture claire, modulaire, maintenable
- API sécurisée, documentée, testée
- Frontend moderne, réactif, bien organisé
- Déploiement et démarrage simples via Docker Compose
- Documentation complète 