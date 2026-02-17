# Exemples de Tests API - Système d'Administration Mosala

Cette collection contient des exemples cURL pour tester tous les endpoints API.

## Configuration préalable

```bash
# Définir des variables pour faciliter les tests
BASE_URL="http://localhost:4002/mosala-api"
TOKEN=""  # Sera rempli après connexion
```

## 1. Authentification

### Inscription Superadmin

```bash
curl -X POST "$BASE_URL/auth/superadmin/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin Principal",
    "email": "superadmin@mosala.com",
    "password": "SuperAdmin123!"
  }'

# Réponse attendue :
# {
#   "id": 1,
#   "name": "Admin Principal",
#   "email": "superadmin@mosala.com",
#   "role": "superadmin",
#   "isActive": true,
#   "password": "$2a$10$..."
# }
```

### Connexion Superadmin

```bash
curl -X POST "$BASE_URL/auth/superadmin/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "superadmin@mosala.com",
    "password": "SuperAdmin123!"
  }'

# Réponse attendue :
# {
#   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
#   "user": {
#     "id": 1,
#     "name": "Admin Principal",
#     "email": "superadmin@mosala.com",
#     "role": "superadmin",
#     "isActive": true
#   }
# }

# Sauvegardez le token pour les requêtes suivantes
export TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Inscription Admin Contenu

```bash
curl -X POST "$BASE_URL/auth/admin-content/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin Contenu",
    "email": "admin.contenu@mosala.com",
    "password": "AdminContent123!"
  }'
```

### Connexion Admin Contenu

```bash
curl -X POST "$BASE_URL/auth/admin-content/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin.contenu@mosala.com",
    "password": "AdminContent123!"
  }'
```

### Vérifier son profil

```bash
curl -X GET "$BASE_URL/auth/me" \
  -H "Authorization: Bearer $TOKEN"
```

## 2. Gestion des Utilisateurs (Superadmin)

### Récupérer tous les utilisateurs

```bash
curl -X GET "$BASE_URL/admin/users" \
  -H "Authorization: Bearer $TOKEN"

# Réponse attendue :
# [
#   {
#     "id": 1,
#     "name": "Admin Principal",
#     "email": "superadmin@mosala.com",
#     "role": "superadmin",
#     "isActive": true,
#     "createdAt": "2024-02-10T...",
#     "updatedAt": "2024-02-10T..."
#   },
#   ...
# ]
```

### Récupérer tous les administrateurs

```bash
curl -X GET "$BASE_URL/admin/users/admins" \
  -H "Authorization: Bearer $TOKEN"
```

### Récupérer un utilisateur par ID

```bash
curl -X GET "$BASE_URL/admin/users/1" \
  -H "Authorization: Bearer $TOKEN"
```

### Désactiver un utilisateur

```bash
curl -X PATCH "$BASE_URL/admin/users/2/deactivate" \
  -H "Authorization: Bearer $TOKEN"
```

### Activer un utilisateur

```bash
curl -X PATCH "$BASE_URL/admin/users/2/activate" \
  -H "Authorization: Bearer $TOKEN"
```

### Changer le rôle d'un utilisateur

```bash
curl -X PATCH "$BASE_URL/admin/users/2/role" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "role": "admin_content"
  }'
```

### Supprimer un utilisateur

```bash
curl -X DELETE "$BASE_URL/admin/users/2" \
  -H "Authorization: Bearer $TOKEN"
```

## 3. Gestion des Actualités

### Créer une actualité

```bash
curl -X POST "$BASE_URL/news" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nouvelle actualité",
    "description": "Une description brève de l'\''actualité",
    "content": "Contenu détaillé de l'\''actualité...",
    "imageUrl": "https://example.com/image.jpg",
    "isPublished": true,
    "category": "news"
  }'

# Réponse attendue :
# {
#   "id": 1,
#   "title": "Nouvelle actualité",
#   "description": "Une description brève...",
#   "content": "Contenu détaillé...",
#   "imageUrl": "https://example.com/image.jpg",
#   "isPublished": true,
#   "category": "news",
#   "authorId": 1,
#   "createdAt": "2024-02-10T...",
#   "updatedAt": "2024-02-10T..."
# }
```

### Récupérer les actualités publiées (sans authentification)

```bash
curl -X GET "$BASE_URL/news"

# Récupérer toutes les actualités (avec authentification)
curl -X GET "$BASE_URL/news?published=false" \
  -H "Authorization: Bearer $TOKEN"
```

### Récupérer une actualité par ID

```bash
curl -X GET "$BASE_URL/news/1"
```

### Mettre à jour une actualité

```bash
curl -X PATCH "$BASE_URL/news/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Titre modifié",
    "description": "Description modifiée"
  }'
```

### Publier une actualité

```bash
curl -X PATCH "$BASE_URL/news/1/publish" \
  -H "Authorization: Bearer $TOKEN"
```

### Dépublier une actualité

```bash
curl -X PATCH "$BASE_URL/news/1/unpublish" \
  -H "Authorization: Bearer $TOKEN"
```

### Supprimer une actualité

```bash
curl -X DELETE "$BASE_URL/news/1" \
  -H "Authorization: Bearer $TOKEN"
```

## 4. Gestion des Formations

### Créer une formation

```bash
curl -X POST "$BASE_URL/formations-advanced" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Formation complète",
    "description": "Une formation détaillée",
    "content": "Contenu pédagogique...",
    "imageUrl": "https://example.com/formation.jpg",
    "level": "intermediate",
    "duration": 12,
    "maxParticipants": 50,
    "price": 150,
    "prerequisites": "Connaissances de base requises"
  }'

# Réponse attendue :
# {
#   "id": 1,
#   "title": "Formation complète",
#   "description": "Une formation détaillée",
#   "content": "Contenu pédagogique...",
#   "imageUrl": "https://example.com/formation.jpg",
#   "level": "intermediate",
#   "status": "draft",
#   "duration": 12,
#   "maxParticipants": 50,
#   "currentParticipants": 0,
#   "price": 150,
#   "prerequisites": "Connaissances de base requises",
#   "authorId": 1,
#   "createdAt": "2024-02-10T...",
#   "updatedAt": "2024-02-10T..."
# }
```

### Récupérer les formations publiées (sans authentification)

```bash
curl -X GET "$BASE_URL/formations-advanced"

# Récupérer toutes les formations avec un statut spécifique
curl -X GET "$BASE_URL/formations-advanced?status=draft" \
  -H "Authorization: Bearer $TOKEN"
```

### Récupérer une formation par ID

```bash
curl -X GET "$BASE_URL/formations-advanced/1"
```

### Mettre à jour une formation

```bash
curl -X PATCH "$BASE_URL/formations-advanced/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Formation mise à jour",
    "duration": 16,
    "maxParticipants": 75
  }'
```

### Publier une formation

```bash
curl -X PATCH "$BASE_URL/formations-advanced/1/publish" \
  -H "Authorization: Bearer $TOKEN"
```

### Archiver une formation

```bash
curl -X PATCH "$BASE_URL/formations-advanced/1/archive" \
  -H "Authorization: Bearer $TOKEN"
```

### S'inscrire à une formation

```bash
curl -X PATCH "$BASE_URL/formations-advanced/1/enroll" \
  -H "Authorization: Bearer $TOKEN"
```

### Supprimer une formation

```bash
curl -X DELETE "$BASE_URL/formations-advanced/1" \
  -H "Authorization: Bearer $TOKEN"
```

## 5. Scénarios de test complets

### Scénario 1 : Créer un contenu complet

```bash
#!/bin/bash

# Variables
BASE_URL="http://localhost:4002/mosala-api"
ADMIN_EMAIL="admin.contenu@mosala.com"
ADMIN_PASSWORD="AdminContent123!"

# 1. Connexion
echo "1. Connexion Admin Contenu..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/admin-content/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "'$ADMIN_EMAIL'",
    "password": "'$ADMIN_PASSWORD'"
  }')

TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
echo "Token obtenu: $TOKEN"

# 2. Créer une actualité
echo "2. Création d'une actualité..."
NEWS_RESPONSE=$(curl -s -X POST "$BASE_URL/news" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nouvelle étape pour Mosala",
    "description": "Nous présentons notre nouveau système d'"'"'administration",
    "content": "Lorem ipsum dolor sit amet...",
    "isPublished": true
  }')

NEWS_ID=$(echo $NEWS_RESPONSE | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
echo "Actualité créée avec l'"'"'ID: $NEWS_ID"

# 3. Créer une formation
echo "3. Création d'"'"'une formation..."
FORMATION_RESPONSE=$(curl -s -X POST "$BASE_URL/formations-advanced" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Formation Avancée Mosala",
    "description": "Une formation complète",
    "content": "Contenu détaillé...",
    "level": "advanced",
    "duration": 12,
    "maxParticipants": 50,
    "price": 200
  }')

FORMATION_ID=$(echo $FORMATION_RESPONSE | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
echo "Formation créée avec l'"'"'ID: $FORMATION_ID"

# 4. Publier la formation
echo "4. Publication de la formation..."
curl -s -X PATCH "$BASE_URL/formations-advanced/$FORMATION_ID/publish" \
  -H "Authorization: Bearer $TOKEN"
echo "Formation publiée !"

echo "Scénario terminé avec succès ✓"
```

### Scénario 2 : Gestion des utilisateurs (Superadmin)

```bash
#!/bin/bash

BASE_URL="http://localhost:4002/mosala-api"
SUPERADMIN_EMAIL="superadmin@mosala.com"
SUPERADMIN_PASSWORD="SuperAdmin123!"

# Connexion
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/superadmin/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "'$SUPERADMIN_EMAIL'",
    "password": "'$SUPERADMIN_PASSWORD'"
  }')

TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

# Lister tous les utilisateurs
echo "Utilisateurs dans le système :"
curl -s -X GET "$BASE_URL/admin/users" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

# Lister tous les administrateurs
echo "Administrateurs :"
curl -s -X GET "$BASE_URL/admin/users/admins" \
  -H "Authorization: Bearer $TOKEN" | jq '.'
```

## Résultats attendus

### Codes HTTP
- `200` : Succès
- `201` : Créé
- `400` : Erreur de validation
- `401` : Non authentifié
- `403` : Non autorisé (permission insuffisante)
- `404` : Ressource non trouvée
- `409` : Conflit (email déjà utilisé)

### Structures de réponse

#### Succès
```json
{
  "id": 1,
  "name": "...",
  "email": "...",
  ...
}
```

#### Erreur
```json
{
  "statusCode": 400,
  "message": "Email déjà utilisé",
  "error": "Conflict"
}
```

## Avec Postman

Vous pouvez importer cette collection dans Postman :

1. Créer une nouvelle collection
2. Ajouter les endpoints avec les variables :
   - `{{base_url}}` = http://localhost:4002/mosala-api
   - `{{token}}` = Sauvegardez le token après connexion
3. Utiliser les scripts de test pour automatiser

## Notes importantes

1. **Mots de passe** : Minimum 8 caractères pour les rôles admin
2. **Tokens JWT** : Valides pendant 7 jours (configurable dans .env)
3. **CORS** : Assurez-vous que `CORS_ORIGIN` est configuré correctement
4. **Base de données** : Les modifications sont persistées dans PostgreSQL Supabase
5. **RLS** : Les politiques Row Level Security peuvent affecter l'accès selon les rôles
