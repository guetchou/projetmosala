# Configuration des Ports - Mosala Job Hub

## 🚀 Ports personnalisés configurés

Mosala Job Hub utilise des ports personnalisés pour éviter les conflits avec d'autres services et faciliter le développement.

### 📋 Configuration des ports

| Service | Port Externe | Port Interne | URL d'accès |
|---------|-------------|--------------|-------------|
| **Frontend (React + Vite)** | 1199 | 80 | http://localhost:1199 |
| **Backend NestJS** | 4002 | 4002 | http://localhost:4002 |
| **API FastAPI** | 1188 | 1188 | http://localhost:1188 |
| **MySQL** | 3326 | 3306 | localhost:3326 |
| **PostgreSQL** | 5433 | 5432 | localhost:5433 |

## 🎯 Démarrage rapide

### Option 1 : Script automatisé (recommandé)

```bash
# Rendre le script exécutable (une seule fois)
chmod +x start-mosala.sh

# Lancer Mosala Job Hub
./start-mosala.sh
```

Le script propose un menu interactif :
- **1** : Frontend uniquement
- **2** : Backend NestJS uniquement  
- **3** : API FastAPI uniquement
- **4** : Bases de données uniquement
- **5** : Tout démarrer (recommandé)
- **6** : Arrêter tous les services

### Option 2 : Démarrage manuel

#### Frontend (React + Vite)
```bash
cd frontend
npm run dev
# Accessible sur http://localhost:1199
```

#### Backend NestJS
```bash
cd backend
npm run start:dev
# Accessible sur http://localhost:4002
# API: http://localhost:4002/mosala-api
# Docs: http://localhost:4002/mosala-api/docs
```

#### API FastAPI
```bash
cd mosala-api
uvicorn app.main:app --host 0.0.0.0 --port 1188 --reload
# Accessible sur http://localhost:1188
```

#### Bases de données (Docker)
```bash
# MySQL
docker run -d \
  --name mosala-mysql \
  -e MYSQL_DATABASE=mosala \
  -e MYSQL_USER=mosala \
  -e MYSQL_PASSWORD=mosala \
  -e MYSQL_ROOT_PASSWORD=root \
  -p 3326:3306 \
  mysql:8.0

# PostgreSQL
docker run -d \
  --name mosala-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=mosala \
  -p 5433:5432 \
  postgres:15
```

## 🔧 Configuration des ports

### Frontend (Vite)
Le port est configuré dans `frontend/vite.config.ts` :
```typescript
export default defineConfig({
  server: {
    port: 1199,
    host: true,
    strictPort: true,
    watch: {
      usePolling: true
    }
  },
  // ...
})
```

### Backend NestJS
Le port est configuré dans `backend/src/main.ts` :
```typescript
// Port personnalisé (par défaut 4002)
await app.listen(process.env.PORT ?? 4002);
```

### Docker Compose
Les ports sont configurés dans `docker-compose.yml` :
```yaml
services:
  frontend:
    ports:
      - "1199:80"
  
  backend-nestjs:
    ports:
      - "4002:4002"
  
  backend:
    ports:
      - "1188:1188"
  
  db:
    ports:
      - "3326:3306"
  
  postgres:
    ports:
      - "5433:5432"
```

## 🌐 URLs d'accès principales

### Application principale
- **Frontend** : http://localhost:1199
  - Page d'accueil avec toutes les fonctionnalités
  - Interface utilisateur complète

### APIs et Documentation
- **Backend NestJS API** : http://localhost:4002/mosala-api
- **Documentation Swagger** : http://localhost:4002/mosala-api/docs
- **API FastAPI** : http://localhost:1188

### Bases de données
- **MySQL** : localhost:3326
  - Utilisateur : mosala
  - Mot de passe : mosala
  - Base : mosala

- **PostgreSQL** : localhost:5433
  - Utilisateur : postgres
  - Mot de passe : postgres
  - Base : mosala

## 🔍 Vérification des ports

### Vérifier si un port est utilisé
```bash
# Vérifier le port 1199
lsof -i :1199

# Vérifier tous les ports utilisés
netstat -tulpn | grep LISTEN
```

### Libérer un port si nécessaire
```bash
# Trouver le processus utilisant le port
lsof -ti:1199

# Tuer le processus
kill -9 $(lsof -ti:1199)
```

## 🛠️ Dépannage

### Port déjà utilisé
Si un port est déjà utilisé, le script `start-mosala.sh` vous avertira. Vous pouvez :
1. Arrêter le service qui utilise le port
2. Modifier le port dans la configuration
3. Utiliser un autre port disponible

### Erreur de connexion
Si vous ne pouvez pas accéder à un service :
1. Vérifiez que le service est démarré
2. Vérifiez que le port est correct
3. Vérifiez les logs du service

### Arrêt propre
Pour arrêter tous les services :
```bash
# Avec le script
./start-mosala.sh
# Puis choisir l'option 6

# Ou manuellement
pkill -f "vite"
pkill -f "nest"
pkill -f "uvicorn"
docker stop mosala-mysql mosala-postgres
```

## 📝 Notes importantes

- Les ports sont configurés pour éviter les conflits avec les services par défaut
- Le script `start-mosala.sh` gère automatiquement le démarrage et l'arrêt
- Tous les services peuvent fonctionner en parallèle
- Les bases de données sont persistantes grâce aux volumes Docker

## 🔄 Mise à jour des ports

Pour changer un port :
1. Modifier la configuration dans le fichier approprié
2. Mettre à jour le script `start-mosala.sh`
3. Mettre à jour ce document
4. Redémarrer les services 