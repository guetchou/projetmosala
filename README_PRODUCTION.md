# 🚀 Configuration Production Mosala

Ce document décrit la configuration complète pour déployer Mosala en production avec Docker, Traefik et les domaines spécifiés.

## 📋 Architecture

### Domaines configurés
- **Site principal**: `https://projetmosala.org`
- **API Backend**: `https://api.projetmosala.org`
- **CMS Strapi**: `https://cms.projetmosala.org`
- **Admin Panel**: `https://admin.projetmosala.org`
- **Support**: `https://support.projetmosala.org`
- **Dashboard Traefik**: `https://traefik.projetmosala.org`

### Services
- **Traefik**: Reverse proxy avec SSL automatique (Let's Encrypt)
- **Frontend**: Application React (Vite)
- **Backend**: API NestJS
- **Strapi CMS**: Gestion de contenu
- **PostgreSQL**: Base de données principale
- **MySQL**: Base de données pour Strapi

## 🛠️ Prérequis

### Serveur
- **OS**: Linux (Ubuntu 20.04+ / CentOS 8+ / AlmaLinux 8+)
- **RAM**: Minimum 4GB (recommandé 8GB)
- **CPU**: 2 cores minimum
- **Stockage**: 20GB minimum
- **Ports**: 80, 443, 8080

### Logiciels
- Docker 20.10+
- Docker Compose 2.0+
- Git

## 📁 Structure des fichiers

```
/opt/mosala/
├── docker-compose.prod.yml    # Configuration Docker Compose production
├── traefik.yml               # Configuration Traefik
├── env.production            # Variables d'environnement
├── traefik/
│   ├── acme.json             # Certificats SSL (créé automatiquement)
│   └── logs/                 # Logs Traefik
├── frontend/
│   ├── Dockerfile            # Image Frontend
│   ├── Dockerfile.admin      # Image Admin Panel
│   └── nginx.admin.conf      # Configuration Nginx Admin
├── backend/
│   └── Dockerfile            # Image Backend
├── mosala-cms/
│   └── Dockerfile            # Image Strapi CMS
└── scripts/
    ├── deploy-production.sh  # Script de déploiement
    └── test-production.sh    # Script de test
```

## 🔧 Configuration

### 1. Variables d'environnement

Copiez et modifiez `env.production` selon vos besoins :

```bash
# Secrets de sécurité (CHANGEZ CES VALEURS!)
JWT_SECRET=votre-super-secret-jwt-key
STRAPI_JWT_SECRET=strapi-jwt-secret
STRAPI_ADMIN_JWT_SECRET=strapi-admin-jwt-secret
MYSQL_ROOT_PASSWORD=root-password-securise

# Email pour Let's Encrypt
LETSENCRYPT_EMAIL=votre-email@projetmosala.org
```

### 2. Configuration DNS

Configurez vos DNS pour pointer vers votre serveur :

```
A    projetmosala.org        → IP_SERVEUR
A    api.projetmosala.org    → IP_SERVEUR
A    cms.projetmosala.org    → IP_SERVEUR
A    admin.projetmosala.org  → IP_SERVEUR
A    support.projetmosala.org → IP_SERVEUR
```

### 3. Firewall

Ouvrez les ports nécessaires :

```bash
# UFW (Ubuntu)
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 8080/tcp

# Firewalld (CentOS/RHEL)
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --permanent --add-port=8080/tcp
sudo firewall-cmd --reload
```

## 🚀 Déploiement

### 1. Test de la configuration

```bash
cd /opt/mosala
./scripts/test-production.sh
```

### 2. Déploiement complet

```bash
cd /opt/mosala
./scripts/deploy-production.sh
```

### 3. Vérification

```bash
# Vérifier les conteneurs
docker ps

# Vérifier les logs
docker-compose -f docker-compose.prod.yml logs -f

# Tester les endpoints
curl -I https://projetmosala.org
curl -I https://api.projetmosala.org/health
```

## 🔍 Monitoring et Maintenance

### Logs

```bash
# Logs Traefik
docker logs mosala-traefik

# Logs Frontend
docker logs mosala-frontend

# Logs Backend
docker logs mosala-backend-nestjs

# Logs Strapi
docker logs mosala-strapi
```

### Sauvegardes

```bash
# Sauvegarde automatique (configurée dans le script)
/opt/backups/mosala/

# Sauvegarde manuelle
docker exec mosala-postgres pg_dump -U postgres mosala > backup.sql
docker exec mosala-db mysqldump -u mosala -p mosala > backup.sql
```

### Mise à jour

```bash
# Arrêter les services
docker-compose -f docker-compose.prod.yml down

# Pull des nouvelles images
docker-compose -f docker-compose.prod.yml pull

# Redémarrer
docker-compose -f docker-compose.prod.yml up -d
```

## 🔒 Sécurité

### Certificats SSL
- Automatiques avec Let's Encrypt
- Renouvellement automatique
- Redirection HTTP → HTTPS

### Headers de sécurité
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Content-Security-Policy
- HSTS

### Conteneurs
- Exécution en tant qu'utilisateur non-root
- Images optimisées (multi-stage builds)
- Health checks configurés

## 🐛 Dépannage

### Problèmes courants

1. **Certificats SSL non générés**
   ```bash
   # Vérifier les logs Traefik
   docker logs mosala-traefik
   
   # Vérifier les DNS
   nslookup projetmosala.org
   ```

2. **Services non démarrés**
   ```bash
   # Vérifier les logs
   docker-compose -f docker-compose.prod.yml logs
   
   # Redémarrer un service
   docker-compose -f docker-compose.prod.yml restart frontend
   ```

3. **Base de données inaccessible**
   ```bash
   # Vérifier la connectivité
   docker exec mosala-backend-nestjs ping postgres
   
   # Vérifier les variables d'environnement
   docker exec mosala-backend-nestjs env | grep DB
   ```

### Commandes utiles

```bash
# Voir l'utilisation des ressources
docker stats

# Nettoyer les images non utilisées
docker system prune -f

# Voir les volumes
docker volume ls

# Accéder à un conteneur
docker exec -it mosala-backend-nestjs sh
```

## 📞 Support

En cas de problème :
1. Vérifiez les logs : `docker-compose -f docker-compose.prod.yml logs`
2. Consultez ce README
3. Vérifiez la configuration DNS
4. Testez la connectivité réseau

## 📝 Notes importantes

- **Secrets** : Changez tous les secrets par défaut en production
- **Sauvegardes** : Configurez des sauvegardes automatiques
- **Monitoring** : Surveillez l'utilisation des ressources
- **Mises à jour** : Maintenez les images Docker à jour
- **Sécurité** : Auditez régulièrement la configuration
