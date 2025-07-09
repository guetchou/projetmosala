# Mosala - Authentification, Rôles et Dashboards

## Fonctionnalités principales
- Inscription et connexion sécurisées (backend FastAPI)
- Gestion des rôles : `candidat`, `recruteur`, `admin`
- Dashboards dédiés pour chaque rôle
- Redirection automatique après connexion
- Protection des routes frontend selon le rôle
- Navbar dynamique selon l'état de connexion et le rôle

---

## Backend (FastAPI)
- **Inscription** : `/users/` (POST)
  - Champs : `name`, `email`, `password`, `role`
- **Connexion** : `/users/login` (POST)
  - Champs : `email`, `password`
  - Retourne : `access_token` (JWT), `role`
- **Rôles disponibles** : `candidat`, `recruteur`, `admin`
- **Utilisateurs de test** :
  - `jean@mosala.org` / `test1234` (candidat)
  - `aissa@mosala.org` / `test1234` (recruteur)
  - `pauline@mosala.org` / `test1234` (admin)

---

## Frontend (React)

### Installation
```bash
npm install jwt-decode
```

### Pages protégées et dashboards
- `/profile-creation` : Dashboard candidat (protégé)
- `/recruiter-space` : Dashboard recruteur (protégé)
- `/admin-dashboard` : Dashboard admin (protégé)
- `/login` : Page de connexion

### Redirection automatique
- Après connexion, l'utilisateur est redirigé vers le dashboard correspondant à son rôle.
- Si un utilisateur tente d'accéder à un dashboard qui ne correspond pas à son rôle, il est redirigé automatiquement.

### Navbar dynamique
- Affiche le dashboard adapté au rôle connecté
- Affiche un bouton de déconnexion si connecté
- Cache les boutons "Connexion" et "S'inscrire" si connecté

### Utilisation du token
- Le token JWT est stocké dans le localStorage (`mosala_token`)
- Les helpers dans `src/utils/auth.ts` permettent de :
  - Stocker/récupérer/supprimer le token
  - Décoder le rôle utilisateur
  - Vérifier l'authentification

### Exemple d'appel API protégé
```js
import { getToken } from "@/utils/auth";

fetch("/api/protected-route", {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});
```

---

## Tester le flux complet
1. Lancer le backend FastAPI (voir scripts d'automatisation)
2. Lancer le frontend React
3. Aller sur `/login`, se connecter avec un utilisateur de test
4. Vérifier la redirection automatique et l'accès aux dashboards
5. Tester la déconnexion et la protection des routes

---

## Personnalisation
- Pour ajouter d'autres rôles ou dashboards, dupliquer la logique de `ProtectedRoute` et des helpers auth.
- Pour ajouter des liens dans la Navbar selon le rôle, adapter le code dans `src/components/Navbar.tsx`.

---

**Pour toute question, voir la documentation dans les fichiers ou contacter l'équipe technique Mosala.**
