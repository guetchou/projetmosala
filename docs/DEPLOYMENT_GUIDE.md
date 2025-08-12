# 🚀 Guide de Déploiement Mosala

Ce guide vous explique comment déployer Mosala sur votre VPS avec Docker et GitHub Actions.

## 📋 Prérequis

- VPS avec accès SSH
- Compte GitHub
- Compte Docker Hub
- Configuration SSH pour votre VPS

## 🔧 Configuration Initiale

### 1. Configuration SSH

Assurez-vous que votre VPS est accessible via SSH :

```bash
# Test de connexion
ssh topcenter-ovh

# Ou avec votre configuration
ssh user@your-vps-ip
```

### 2. Configuration GitHub

```bash
# Installer GitHub CLI
# Ubuntu/Debian
sudo apt install gh

# macOS
brew install gh

# Se connecter
gh auth login

# Configurer les secrets
./scripts/setup-github-secrets.sh
```

## 🚀 Déploiement Automatique

### Option 1: Initialisation Complète du VPS

```bash
# Initialiser le VPS (première fois uniquement)
./scripts/init-vps.sh
```

Ce script va :
- ✅ Installer Docker et Docker Compose
- ✅ Cloner le projet
- ✅ Configurer les variables d'environnement
- ✅ Lancer le premier déploiement

### Option 2: Déploiement Manuel

```bash
# Déploiement simple
./scripts/deploy-vps.sh production

# Avec sauvegarde
./scripts/deploy-vps.sh production backup

# Vérification de santé
./scripts/deploy-vps.sh production health

# Rollback
./scripts/deploy-vps.sh production rollback
```

## 🔄 CI/CD avec GitHub Actions

### Configuration Automatique

Le projet est configuré pour un déploiement automatique via GitHub Actions :

1. **Push sur `main`** → Déploiement production
2. **Push sur `develop`** → Déploiement staging
3. **Pull Request** → Tests automatiques

### Secrets GitHub Requis

| Secret | Description | Exemple |
|--------|-------------|---------|
| `DOCKER_USERNAME` | Nom d'utilisateur Docker Hub | `monnomutilisateur` |
| `DOCKER_PASSWORD` | Token Docker Hub | `dckr_pat_...` |
| `SERVER_HOST` | Adresse du VPS | `topcenter-ovh` |
| `SERVER_USER` | Utilisateur SSH | `root` |

### Workflow CI/CD

Le workflow `.github/workflows/ci-cd.yml` :

1. **Tests** : Linting, tests unitaires
2. **Build** : Construction des images Docker
3. **Push** : Envoi sur Docker Hub
4. **Deploy** : Déploiement sur le VPS

## 🐳 Configuration Docker

### Services Disponibles

| Service | Port | Description |
|---------|------|-------------|
| Frontend | 1199 | Application React |
| Backend NestJS | 4002 | API NestJS |
| Backend Python | 1188 | API FastAPI |
| Strapi CMS | 1337 | CMS Strapi |
| MySQL | 3326 | Base de données MySQL |
| PostgreSQL | 5433 | Base de données PostgreSQL |

### Variables d'Environnement

Copiez `env.example` vers `.env` et configurez :

```env
# Frontend
VITE_API_URL=http://localhost:4002
VITE_STRAPI_URL=http://localhost:1337

# Backend NestJS
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=mosala
JWT_SECRET=votre-secret-jwt

# Strapi
DATABASE_CLIENT=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=mosala
DATABASE_USERNAME=mosala
DATABASE_PASSWORD=mosala
```

## 📊 Monitoring et Maintenance

### Commandes Utiles

```bash
# Vérifier l'état des services
ssh topcenter-ovh 'cd /opt/mosala && docker-compose ps'

# Voir les logs
ssh topcenter-ovh 'cd /opt/mosala && docker-compose logs -f'

# Arrêter les services
ssh topcenter-ovh 'cd /opt/mosala && docker-compose down'

# Redémarrer un service
ssh topcenter-ovh 'cd /opt/mosala && docker-compose restart frontend'

# Sauvegarder la base de données
ssh topcenter-ovh 'cd /opt/mosala && docker-compose exec db mysqldump -u mosala -pmosala mosala > backup.sql'
```

### Sauvegarde Automatique

```bash
# Sauvegarde complète
./scripts/deploy-vps.sh production backup

# Restauration
ssh topcenter-ovh 'cd /opt/mosala && docker-compose exec db mysql -u mosala -pmosala mosala < backup.sql'
```

## 🔒 Sécurité

### Bonnes Pratiques

1. **Changer les mots de passe par défaut**
2. **Configurer un firewall**
3. **Utiliser HTTPS avec un certificat SSL**
4. **Mettre à jour régulièrement Docker et les images**
5. **Sauvegarder régulièrement les données**

### Configuration Firewall

```bash
# Sur le VPS
firewall-cmd --permanent --add-port=1199/tcp  # Frontend
firewall-cmd --permanent --add-port=4002/tcp  # Backend NestJS
firewall-cmd --permanent --add-port=1188/tcp  # Backend Python
firewall-cmd --permanent --add-port=1337/tcp  # Strapi
firewall-cmd --reload
```

## 🛠️ Dépannage

### Problèmes Courants

#### Service ne démarre pas
```bash
# Vérifier les logs
ssh topcenter-ovh 'cd /opt/mosala && docker-compose logs service-name'

# Redémarrer le service
ssh topcenter-ovh 'cd /opt/mosala && docker-compose restart service-name'
```

#### Problème de base de données
```bash
# Vérifier la connexion
ssh topcenter-ovh 'cd /opt/mosala && docker-compose exec db mysql -u mosala -pmosala mosala'

# Restaurer depuis une sauvegarde
ssh topcenter-ovh 'cd /opt/mosala && docker-compose exec db mysql -u mosala -pmosala mosala < backup.sql'
```

#### Problème de mémoire
```bash
# Nettoyer les images non utilisées
ssh topcenter-ovh 'docker image prune -f'

# Nettoyer les volumes non utilisés
ssh topcenter-ovh 'docker volume prune -f'
```

### Logs de Debug

```bash
# Logs détaillés
ssh topcenter-ovh 'cd /opt/mosala && docker-compose logs --tail=100'

# Logs en temps réel
ssh topcenter-ovh 'cd /opt/mosala && docker-compose logs -f --tail=50'
```

## 📈 Performance

### Optimisations

1. **Utiliser un reverse proxy** (nginx) pour le frontend
2. **Configurer un CDN** pour les assets statiques
3. **Optimiser les images Docker** avec multi-stage builds
4. **Utiliser un cache Redis** pour les sessions
5. **Configurer la compression gzip**

### Monitoring

```bash
# Utilisation des ressources
ssh topcenter-ovh 'docker stats'

# Espace disque
ssh topcenter-ovh 'df -h'

# Utilisation mémoire
ssh topcenter-ovh 'free -h'
```

## 🔄 Mise à Jour

### Mise à Jour Manuelle

```bash
# Pull des dernières modifications
ssh topcenter-ovh 'cd /opt/mosala && git pull origin main'

# Rebuild et redémarrage
ssh topcenter-ovh 'cd /opt/mosala && docker-compose down && docker-compose up -d --build'
```

### Mise à Jour Automatique

Le CI/CD se déclenche automatiquement lors d'un push sur `main`.

## 📞 Support

En cas de problème :

1. Vérifiez les logs : `./scripts/deploy-vps.sh production health`
2. Consultez la documentation GitHub Actions
3. Vérifiez la configuration SSH
4. Ouvrez une issue sur GitHub

---

**Note** : Ce guide suppose que vous utilisez le VPS `topcenter-ovh`. Adaptez les commandes selon votre configuration.
