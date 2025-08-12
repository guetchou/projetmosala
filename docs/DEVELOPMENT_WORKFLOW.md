# Workflow de Développement - Projet Mosala

## 🚀 Workflow Automatisé

### 1. Développement Local
- Développez en local sur votre machine
- Testez vos modifications
- Committez et poussez vers GitHub

### 2. Déploiement Automatique
- À chaque push sur `main`, GitHub Actions :
  - Construit les images Docker
  - Les pousse sur Docker Hub
  - Déploie automatiquement sur le VPS

### 3. Mise à Jour du Site
- Le VPS récupère automatiquement les nouvelles images
- Redémarre les services avec les nouvelles versions
- Le site est mis à jour sans interruption

## 📋 Commandes Utiles

### Développement Local
```bash
# Démarrer le développement local
cd frontend && npm run dev
cd backend && npm run start:dev

# Construire les images localement
docker build -t galoycg/mosala-frontend:latest ./frontend
docker build -t galoycg/mosala-backend:latest ./backend
docker build -t galoycg/mosala-api:latest ./mosala-api

# Pousser les images sur Docker Hub
docker push galoycg/mosala-frontend:latest
docker push galoycg/mosala-backend:latest
docker push galoycg/mosala-api:latest
```

### Déploiement Manuel
```bash
# Déployer manuellement sur le VPS
./scripts/deploy-vps-manual.sh

# Vérifier le statut des services
ssh root@topcenter-ovh "cd /opt/mosala && docker compose -f docker-compose-projetmosala.yml ps"
```

### Monitoring
```bash
# Voir les logs des services
ssh root@topcenter-ovh "cd /opt/mosala && docker compose -f docker-compose-projetmosala.yml logs -f"

# Redémarrer un service spécifique
ssh root@topcenter-ovh "cd /opt/mosala && docker compose -f docker-compose-projetmosala.yml restart frontend"
```

## 🌐 URLs du Site

- **Site Principal**: http://projetmosala.org
- **API**: http://api.projetmosala.org
- **Admin**: http://admin.projetmosala.org
- **Traefik Dashboard**: http://traefik.projetmosala.org

## 🔧 Configuration

### Variables d'Environnement
- `.env-projetmosala` : Configuration pour le VPS
- `.env` : Configuration locale

### Docker Compose
- `docker-compose-projetmosala.yml` : Configuration de production
- `docker-compose.yml` : Configuration de développement

## 📝 Workflow Recommandé

1. **Développement** : Travaillez en local
2. **Test** : Testez vos modifications
3. **Commit** : Committez avec un message descriptif
4. **Push** : Poussez vers GitHub
5. **Déploiement** : GitHub Actions déploie automatiquement
6. **Vérification** : Vérifiez le site en production

## 🚨 En Cas de Problème

### Images Docker
```bash
# Reconstruire et pousser une image spécifique
docker build -t galoycg/mosala-frontend:latest ./frontend
docker push galoycg/mosala-frontend:latest
```

### Services sur le VPS
```bash
# Redémarrer tous les services
ssh root@topcenter-ovh "cd /opt/mosala && docker compose -f docker-compose-projetmosala.yml down && docker compose -f docker-compose-projetmosala.yml up -d"

# Voir les logs d'erreur
ssh root@topcenter-ovh "cd /opt/mosala && docker compose -f docker-compose-projetmosala.yml logs --tail=50"
```

### Rollback
```bash
# Utiliser une version précédente
ssh root@topcenter-ovh "cd /opt/mosala && docker pull galoycg/mosala-frontend:previous && docker compose -f docker-compose-projetmosala.yml up -d"
```
