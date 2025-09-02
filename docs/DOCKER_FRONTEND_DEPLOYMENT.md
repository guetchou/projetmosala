# 🐳 Déploiement Frontend Docker - Solution Optimisée

## 📋 Vue d'ensemble

Cette documentation décrit la solution optimisée pour le déploiement Docker du frontend Mosala, basée sur les recommandations officielles des experts pnpm et Vite.

## 🎯 Problème Résolu

- ✅ **Workspace pnpm** : Gestion correcte des dépendances dans un workspace
- ✅ **Multi-stage build** : Optimisation de la taille d'image
- ✅ **Cache Docker** : Optimisation des performances de build
- ✅ **Dépendances manquantes** : Résolution des modules non trouvés

## 🏗️ Architecture de la Solution

### Dockerfile Optimisé (`Dockerfile.frontend.final`)

```dockerfile
# Build stage
FROM node:20-alpine AS deps

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build stage
FROM node:20-alpine AS builder

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=deps /app/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Copy frontend source
COPY frontend/ ./frontend/

# Install frontend dependencies specifically
WORKDIR /app/frontend
RUN pnpm install --frozen-lockfile

# Build the application
RUN pnpm run build

# Production stage
FROM nginx:alpine AS runner

# Copy built application
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Copy nginx configuration
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

## 🚀 Commandes de Déploiement

### 1. Build de l'Image

```bash
# Build depuis la racine du projet
docker build --no-cache -f Dockerfile.frontend.final -t galoycg/mosala-frontend:latest .
```

### 2. Test Local

```bash
# Lancer le conteneur de test
docker run -d -p 8081:80 --name mosala-frontend-test galoycg/mosala-frontend:latest

# Vérifier le statut
docker ps | grep mosala-frontend-test

# Tester l'accès
curl -I http://localhost:8081
```

### 3. Déploiement avec Docker Compose

```bash
# Lancer le frontend
docker-compose up -d frontend

# Vérifier les services
docker-compose ps

# Voir les logs
docker-compose logs frontend
```

## 📊 Configuration Docker Compose

```yaml
services:
  frontend:
    image: galoycg/mosala-frontend:latest
    container_name: mosala-frontend
    build:
      context: .
      dockerfile: Dockerfile.frontend.final
    ports:
      - "1200:80"  # Port modifié pour éviter les conflits
    depends_on:
      - backend
    networks:
      - mosala-net
    restart: unless-stopped
```

## 🎯 Bonnes Pratiques Implémentées

### 1. **Multi-stage Build**
- **Stage deps** : Installation des dépendances workspace
- **Stage builder** : Build de l'application
- **Stage runner** : Image de production légère

### 2. **Optimisation du Cache Docker**
- Copie des fichiers de dépendances avant le code source
- Utilisation de `--frozen-lockfile` pour la reproductibilité
- Séparation des étapes d'installation et de build

### 3. **Gestion des Workspaces pnpm**
- Copie des fichiers workspace (package.json, pnpm-lock.yaml, pnpm-workspace.yaml)
- Installation des dépendances au niveau workspace
- Installation spécifique des dépendances frontend

### 4. **Sécurité et Performance**
- Image de base alpine pour réduire la taille
- Utilisation de nginx pour servir les fichiers statiques
- Configuration de sécurité nginx

## 🔧 Configuration Nginx

Le fichier `frontend/nginx.conf` inclut :
- Gestion des routes SPA (Single Page Application)
- Headers de sécurité
- Compression gzip
- Cache des assets statiques

## 📈 Métriques de Performance

- **Taille de l'image finale** : ~50MB (nginx:alpine + assets)
- **Temps de build** : ~2-3 minutes
- **Temps de démarrage** : <5 secondes
- **Optimisation des chunks** : Configuration Vite pour le code splitting

## 🐛 Résolution des Problèmes Courants

### Problème : Module non trouvé (react-leaflet)
**Solution** : Installation spécifique des dépendances frontend dans le stage builder

### Problème : Cache Docker inefficace
**Solution** : Ordre optimisé des instructions Dockerfile

### Problème : Port déjà utilisé
**Solution** : Modification du port dans docker-compose.yml (1200 au lieu de 1199)

## 🔄 Workflow de Développement

1. **Développement local** : `pnpm dev` dans le dossier frontend
2. **Test de build** : `pnpm run build` pour vérifier la compilation
3. **Build Docker** : `docker build -f Dockerfile.frontend.final`
4. **Test conteneur** : `docker run` pour validation
5. **Déploiement** : `docker-compose up -d frontend`

## 📚 Références

- [Documentation officielle pnpm](https://pnpm.io/docker)
- [Best practices Docker](https://docs.docker.com/develop/dev-best-practices/)
- [Documentation Vite](https://vitejs.dev/guide/static-deploy.html)
- [Nginx configuration](https://nginx.org/en/docs/)

## ✅ Checklist de Validation

- [x] Build Docker réussi
- [x] Conteneur démarre correctement
- [x] Application accessible sur le port configuré
- [x] Assets statiques servis correctement
- [x] Configuration nginx optimisée
- [x] Multi-stage build fonctionnel
- [x] Cache Docker optimisé
- [x] Workspace pnpm géré correctement

---

**Statut** : ✅ **PRODUCTION READY**
**Dernière mise à jour** : 13 Août 2025
**Version** : 1.0.0
