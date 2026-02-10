# Guide d'utilisation - Système d'Administration Mosala

## Vue d'ensemble

Le système Mosala comprend deux rôles d'administrateurs :

1. **Superadmin** - Gère les administrateurs, les actualités et les formations
2. **Admin Contenu** - Gère uniquement les actualités et les formations

## Configuration Supabase

### 1. Créer un projet Supabase
1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez vos identifiants

### 2. Configurer le fichier .env

Ouvrez `.env` et remplissez les informations Supabase :

```env
# Informations de votre projet Supabase
DB_HOST=your-project-id.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASS=your-postgres-password
DB_NAME=postgres
DATABASE_URL=postgresql://postgres:your-password@your-project-id.supabase.co:5432/postgres

# Clé JWT (générez une nouvelle clé sécurisée)
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRES_IN=7d

# Port du backend
PORT=4002
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

## Points d'accès

### Frontend
- **Superadmin Inscription** : `http://localhost:5173/superadmin/register`
- **Superadmin Connexion** : `http://localhost:5173/superadmin/login`
- **Superadmin Dashboard** : `http://localhost:5173/superadmin/dashboard`

- **Admin Contenu Inscription** : `http://localhost:5173/admin-content/register`
- **Admin Contenu Connexion** : `http://localhost:5173/admin-content/login`
- **Admin Contenu Dashboard** : `http://localhost:5173/admin-content/dashboard`

### Backend API
- **Base URL** : `http://localhost:4002/mosala-api`
- **Swagger Documentation** : `http://localhost:4002/mosala-api/docs`

## Endpoints API

### Authentification

```bash
# Superadmin - Inscription
POST /mosala-api/auth/superadmin/register
Content-Type: application/json

{
  "name": "Admin Name",
  "email": "admin@mosala.com",
  "password": "SecurePassword123!"
}

# Superadmin - Connexion
POST /mosala-api/auth/superadmin/login
Content-Type: application/json

{
  "email": "admin@mosala.com",
  "password": "SecurePassword123!"
}

# Admin Contenu - Inscription
POST /mosala-api/auth/admin-content/register
Content-Type: application/json

{
  "name": "Content Admin",
  "email": "admin@mosala.com",
  "password": "SecurePassword123!"
}

# Admin Contenu - Connexion
POST /mosala-api/auth/admin-content/login
Content-Type: application/json

{
  "email": "admin@mosala.com",
  "password": "SecurePassword123!"
}
```

### Gestion des utilisateurs (Superadmin)

```bash
# Récupérer tous les utilisateurs
GET /mosala-api/admin/users
Authorization: Bearer <token>

# Récupérer tous les administrateurs
GET /mosala-api/admin/users/admins
Authorization: Bearer <token>

# Récupérer un utilisateur
GET /mosala-api/admin/users/:id
Authorization: Bearer <token>

# Supprimer un utilisateur
DELETE /mosala-api/admin/users/:id
Authorization: Bearer <token>

# Désactiver un utilisateur
PATCH /mosala-api/admin/users/:id/deactivate
Authorization: Bearer <token>

# Activer un utilisateur
PATCH /mosala-api/admin/users/:id/activate
Authorization: Bearer <token>

# Changer le rôle d'un utilisateur
PATCH /mosala-api/admin/users/:id/role
Authorization: Bearer <token>
Content-Type: application/json

{
  "role": "admin_content"
}
```

### Gestion des Actualités

```bash
# Créer une actualité
POST /mosala-api/news
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Titre de l'actualité",
  "description": "Description brève",
  "content": "Contenu détaillé",
  "imageUrl": "https://example.com/image.jpg",
  "isPublished": true,
  "category": "news"
}

# Récupérer toutes les actualités publiées
GET /mosala-api/news

# Récupérer une actualité
GET /mosala-api/news/:id

# Mettre à jour une actualité
PATCH /mosala-api/news/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Nouveau titre",
  "description": "Nouvelle description"
}

# Publier une actualité
PATCH /mosala-api/news/:id/publish
Authorization: Bearer <token>

# Dépublier une actualité
PATCH /mosala-api/news/:id/unpublish
Authorization: Bearer <token>

# Supprimer une actualité
DELETE /mosala-api/news/:id
Authorization: Bearer <token>
```

### Gestion des Formations

```bash
# Créer une formation
POST /mosala-api/formations-advanced
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Titre de la formation",
  "description": "Description brève",
  "content": "Contenu détaillé",
  "level": "beginner",
  "duration": 12,
  "maxParticipants": 50,
  "price": 150,
  "prerequisites": ""
}

# Récupérer toutes les formations
GET /mosala-api/formations-advanced

# Récupérer une formation
GET /mosala-api/formations-advanced/:id

# Mettre à jour une formation
PATCH /mosala-api/formations-advanced/:id
Authorization: Bearer <token>

# Publier une formation
PATCH /mosala-api/formations-advanced/:id/publish
Authorization: Bearer <token>

# Archiver une formation
PATCH /mosala-api/formations-advanced/:id/archive
Authorization: Bearer <token>

# S'inscrire à une formation
PATCH /mosala-api/formations-advanced/:id/enroll
Authorization: Bearer <token>

# Supprimer une formation
DELETE /mosala-api/formations-advanced/:id
Authorization: Bearer <token>
```

## Architecture et Structure

### Backend (NestJS)
```
src/
├── auth/                          # Module d'authentification
│   ├── auth.controller.ts         # Endpoints d'auth
│   ├── auth.service.ts            # Logique d'authentification
│   ├── jwt-auth.guard.ts          # Guard JWT
│   ├── jwt.strategy.ts            # Stratégie JWT
│   ├── roles.decorator.ts         # Décorateur de rôles
│   └── roles.guard.ts             # Guard de rôles
├── users/                         # Module utilisateurs
│   ├── entities/
│   │   └── user.entity.ts         # Entité User avec rôles
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   ├── login-user.dto.ts
│   │   └── register-admin.dto.ts
│   └── ...
├── admin-users/                   # Gestion des administrateurs
│   ├── admin-users.controller.ts
│   ├── admin-users.service.ts
│   └── admin-users.module.ts
├── news/                          # Gestion des actualités
│   ├── entities/
│   │   └── news.entity.ts
│   ├── dto/
│   │   └── create-news.dto.ts
│   ├── news.controller.ts
│   ├── news.service.ts
│   └── news.module.ts
├── formations-advanced/           # Gestion avancée des formations
│   ├── entities/
│   │   └── formation-advanced.entity.ts
│   ├── dto/
│   │   └── create-formation-advanced.dto.ts
│   ├── formations-advanced.controller.ts
│   ├── formations-advanced.service.ts
│   └── formations-advanced.module.ts
└── app.module.ts                  # Module racine
```

### Frontend (React)
```
src/
├── contexts/
│   └── AuthContext.tsx            # Contexte d'authentification global
├── pages/
│   └── admin/
│       ├── SuperAdminRegister.tsx
│       ├── SuperAdminLogin.tsx
│       ├── SuperAdminDashboard.tsx
│       ├── AdminContentRegister.tsx
│       ├── AdminContentLogin.tsx
│       └── AdminContentDashboard.tsx
├── components/
│   └── AdminSidebar.tsx           # Composant sidebar réutilisable
└── Router.tsx                      # Routes mises à jour
```

## Thème et Couleurs

Le système utilise les couleurs Mosala définies dans `index.css` :

- **Vert Mosala** (Superadmin) : `#2D8A5C`
- **Orange Mosala** (Admin Contenu) : `#E67A00`
- **Jaune Mosala** : `#E6B800`
- **Rouge Mosala** (Actions suppression) : `#CC0510`

### Utilisation dans les composants

```tsx
// Couleurs Tailwind
className="bg-mosala-green-600 text-mosala-green-800"
className="bg-mosala-orange-600 text-mosala-orange-800"

// Gradients
className="bg-gradient-to-r from-mosala-green-600 to-mosala-green-700"
```

## Déploiement en Production

### Avant de déployer :

1. **Changez les variables d'environnement**
   ```env
   NODE_ENV=production
   JWT_SECRET=<generated-secret-key>
   VITE_API_URL=https://api.your-domain.com
   ```

2. **Désactivez la synchronisation TypeORM**
   ```typescript
   synchronize: false, // En production
   ```

3. **Migrez la base de données**
   ```bash
   npm run migration:run
   ```

4. **Build du frontend**
   ```bash
   npm run build
   ```

5. **Build du backend**
   ```bash
   npm run build
   ```

## Dépannage

### Problème : "Erreur de connexion à la base de données"
- Vérifiez que votre `DATABASE_URL` est correcte
- Assurez-vous que vous êtes connecté au VPN si nécessaire
- Vérifiez les pare-feu Supabase

### Problème : "Token invalide"
- Vérifiez que `JWT_SECRET` est identique entre le backend et le .env
- Vérifiez que le token n'a pas expiré

### Problème : "CORS error"
- Vérifiez que `CORS_ORIGIN` dans .env inclut votre domaine frontend
- Le port par défaut est `5173` pour Vite

## Support

Pour toute question ou problème, consultez :
- La documentation Supabase : https://supabase.com/docs
- La documentation NestJS : https://docs.nestjs.com
- La documentation React : https://react.dev
