# 1. Authentification & gestion des rôles : Keycloak + Casbin

## Objectif
Mettre en place une authentification centralisée et une gestion fine des rôles/permissions pour l'ensemble de l'application.

## Prérequis
- Docker installé
- Accès au code backend (NestJS)
- Accès au frontend (React)

## Procédure détaillée

### 1. Déploiement de Keycloak (en local via Docker)
```bash
docker run -d --name keycloak \
  -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:24.0.4 start-dev
```

### 2. Configuration initiale Keycloak
- Accéder à http://localhost:8080
- Se connecter avec `admin` / `admin`
- Créer un Realm "mosala"
- Créer un client "frontend" (type public, redirect URI : http://localhost:3000/*)
- Créer des rôles (admin, livreur, client...)
- Créer des utilisateurs de test et leur assigner des rôles

### 3. Intégration côté backend (NestJS)
- Installer le package :
```bash
npm install nest-keycloak-connect keycloak-connect
```
- Configurer le module Keycloak dans `app.module.ts` (voir doc officielle)
- Protéger les routes avec les guards Keycloak

### 4. Intégration côté frontend (React)
- Installer :
```bash
npm install keycloak-js
```
- Initialiser Keycloak dans le provider principal (voir exemple dans la doc keycloak-js)
- Gérer la connexion/déconnexion, récupération du token, etc.

### 5. Gestion fine des permissions avec Casbin (backend)
- Installer :
```bash
npm install casbin @casbin/mongoose-adapter
```
- Définir le modèle RBAC/ABAC dans un fichier `.conf`
- Charger les policies dynamiquement selon les rôles Keycloak

## Points de vigilance
- Bien sécuriser l’accès à Keycloak en production (HTTPS, mots de passe forts)
- Synchroniser les rôles Keycloak et Casbin
- Tester les différents scénarios d’accès (admin, livreur, client)

## Liens utiles
- [Keycloak Docs](https://www.keycloak.org/docs/latest/)
- [nest-keycloak-connect](https://www.npmjs.com/package/nest-keycloak-connect)
- [Casbin Node.js](https://casbin.org/docs/en/nodejs) 