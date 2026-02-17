# Implémentation Rapide - Système d'Administration Mosala

## Étapes d'implémentation

### 1. Configuration Supabase (5 minutes)

```bash
# 1. Allez sur https://supabase.com et créez un nouveau projet
# 2. Attendez que le projet soit créé
# 3. Allez dans Settings > Database > Connection pooling
# 4. Copiez votre DATABASE_URL

# 5. Remplissez le fichier .env à la racine du projet :
DB_HOST=your-project.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASS=your-password
DB_NAME=postgres
DATABASE_URL=postgresql://postgres:your-password@your-project.supabase.co:5432/postgres

JWT_SECRET=your-secret-key-at-least-32-characters
JWT_EXPIRES_IN=7d
PORT=4002
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

### 2. Démarrer le backend

```bash
# Allez dans le répertoire backend
cd backend

# Installez les dépendances
npm install

# Démarrez le serveur en mode développement
npm run start:dev

# Le backend devrait être accessible à http://localhost:4002
# La documentation Swagger : http://localhost:4002/mosala-api/docs
```

### 3. Démarrer le frontend

```bash
# Dans une nouvelle fenêtre terminal, allez dans le répertoire frontend
cd frontend

# Installez les dépendances
npm install

# Démarrez le serveur Vite
npm run dev

# Le frontend devrait être accessible à http://localhost:5173
```

### 4. Accès initial

Une fois les deux serveurs démarrés :

#### Superadmin
- **Inscription** : http://localhost:5173/superadmin/register
- **Connexion** : http://localhost:5173/superadmin/login
- **Dashboard** : http://localhost:5173/superadmin/dashboard

Fonctionnalités :
- 👥 Gérer les administrateurs
- 📰 Gérer les actualités
- 📚 Gérer les formations

#### Admin Contenu
- **Inscription** : http://localhost:5173/admin-content/register
- **Connexion** : http://localhost:5173/admin-content/login
- **Dashboard** : http://localhost:5173/admin-content/dashboard

Fonctionnalités :
- 📰 Gérer les actualités
- 📚 Gérer les formations

## Données de test

Vous pouvez créer des comptes de test via les pages d'inscription.

### Exemple de création Superadmin :

1. Allez à : http://localhost:5173/superadmin/register
2. Remplissez le formulaire :
   - Nom : Jean Dupont
   - Email : admin@mosala.com
   - Mot de passe : SecurePassword123! (minimum 8 caractères)
   - Confirmation : SecurePassword123!
3. Cliquez sur "Créer mon compte"
4. Vous serez redirigé vers le dashboard

### Exemple de création Admin Contenu :

1. Allez à : http://localhost:5173/admin-content/register
2. Remplissez le formulaire :
   - Nom : Marie Dubois
   - Email : content@mosala.com
   - Mot de passe : SecurePassword456! (minimum 8 caractères)
   - Confirmation : SecurePassword456!
3. Cliquez sur "Créer mon compte"
4. Vous serez redirigé vers le dashboard

## API Testing avec cURL

### Test de connexion Superadmin

```bash
curl -X POST http://localhost:4002/mosala-api/auth/superadmin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mosala.com",
    "password": "SecurePassword123!"
  }'

# Réponse attendue :
# {
#   "access_token": "eyJhbGc...",
#   "user": {
#     "id": 1,
#     "name": "Jean Dupont",
#     "email": "admin@mosala.com",
#     "role": "superadmin",
#     "isActive": true
#   }
# }
```

### Créer une actualité

```bash
TOKEN="your-access-token"

curl -X POST http://localhost:4002/mosala-api/news \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Nouvelle actualité",
    "description": "Description brève",
    "content": "Contenu détaillé de l'actualité",
    "imageUrl": "https://example.com/image.jpg",
    "isPublished": true,
    "category": "news"
  }'
```

### Récupérer les actualités

```bash
curl -X GET http://localhost:4002/mosala-api/news
```

### Créer une formation

```bash
TOKEN="your-access-token"

curl -X POST http://localhost:4002/mosala-api/formations-advanced \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Nouvelle formation",
    "description": "Description brève",
    "content": "Contenu détaillé",
    "level": "beginner",
    "duration": 12,
    "maxParticipants": 50,
    "price": 150
  }'
```

## Vérification de l'installation

### Checklist de vérification

- [ ] Backend démarre sans erreurs (npm run start:dev)
- [ ] Frontend démarre sans erreurs (npm run dev)
- [ ] Swagger doc accessible : http://localhost:4002/mosala-api/docs
- [ ] Page d'inscription Superadmin charge : http://localhost:5173/superadmin/register
- [ ] Vous pouvez créer un compte Superadmin
- [ ] Vous pouvez vous connecter avec ce compte
- [ ] Le dashboard Superadmin s'affiche
- [ ] La page d'inscription Admin Contenu charge : http://localhost:5173/admin-content/register
- [ ] Vous pouvez créer un compte Admin Contenu
- [ ] Vous pouvez vous connecter avec ce compte
- [ ] Le dashboard Admin Contenu s'affiche

## Troubleshooting rapide

| Problème | Solution |
|----------|----------|
| Port 4002 déjà utilisé | Changez le PORT dans .env ou tuez le processus |
| Port 5173 déjà utilisé | Changez le port dans frontend ou tuez le processus |
| Erreur PostgreSQL | Vérifiez DATABASE_URL et la connexion Supabase |
| CORS error | Vérifiez CORS_ORIGIN dans .env |
| Mot de passe non accepté | Doit faire min 8 caractères |
| Token invalide | Le JWT_SECRET a peut-être changé, reconnectez-vous |

## Prochaines étapes

1. **Personnaliser les couleurs** : Modifiez `index.css` pour adapter au brand
2. **Ajouter des images** : Mettez à jour les logos dans les pages d'authentification
3. **Configurer les e-mails** : Intégrez un service d'email pour l'inscription
4. **Ajouter la validation** : Enrichissez les validations côté frontend et backend
5. **Mettre en place les logs** : Configurez un système de logging
6. **Déployer en production** : Configurez le CI/CD avec GitHub Actions

## Ressources

- [Documentation Supabase PostgreSQL](https://supabase.com/docs/guides/database)
- [Documentation NestJS](https://docs.nestjs.com)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation React Router](https://reactrouter.com)
