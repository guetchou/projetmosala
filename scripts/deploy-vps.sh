#!/bin/bash

# Script de déploiement pour VPS topcenter-ovh
# Usage: ./scripts/deploy-vps.sh [production|staging]

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Configuration
ENVIRONMENT=${1:-production}
VPS_HOST="topcenter-ovh"
VPS_USER="root"
PROJECT_PATH="/opt/mosala"

# Vérifier l'environnement
case $ENVIRONMENT in
    production|staging)
        log_info "Déploiement en mode: $ENVIRONMENT"
        ;;
    *)
        log_error "Environnement invalide. Utilisez: production ou staging"
        exit 1
        ;;
esac

# Vérifier la connexion SSH
log_info "Test de connexion SSH vers $VPS_HOST..."
if ! ssh -o ConnectTimeout=10 -o BatchMode=yes $VPS_HOST "echo 'Connexion OK'" 2>/dev/null; then
    log_error "Impossible de se connecter à $VPS_HOST"
    log_info "Vérifiez votre configuration SSH: ~/.ssh/config"
    exit 1
fi

log_success "Connexion SSH établie"

# Fonction de sauvegarde
backup_database() {
    log_info "Sauvegarde de la base de données..."
    
    ssh $VPS_HOST << EOF
        cd $PROJECT_PATH
        echo "📦 Sauvegarde MySQL..."
        docker-compose exec -T db mysqldump -u mosala -pmosala mosala > backup_mysql_\$(date +%Y%m%d_%H%M%S).sql
        
        echo "📦 Sauvegarde PostgreSQL..."
        docker-compose exec -T postgres pg_dump -U postgres mosala > backup_pg_\$(date +%Y%m%d_%H%M%S).sql
        
        echo "✅ Sauvegardes terminées"
EOF
}

# Fonction de déploiement
deploy() {
    log_info "🚀 Déploiement sur $VPS_HOST..."
    
    ssh $VPS_HOST << EOF
        echo "🔄 Mise à jour du code..."
        cd $PROJECT_PATH
        
        # Sauvegarder les modifications locales
        git stash
        
        # Pull des dernières modifications
        git pull origin main
        
        echo "🐳 Pull des dernières images Docker..."
        docker-compose pull
        
        echo "🛑 Arrêt des services..."
        docker-compose down
        
        echo "🚀 Démarrage des services..."
        docker-compose up -d
        
        echo "⏳ Attente du démarrage..."
        sleep 30
        
        echo "🧹 Nettoyage des images non utilisées..."
        docker image prune -f
        
        echo "✅ Déploiement terminé!"
        docker-compose ps
EOF
}

# Fonction de rollback
rollback() {
    log_warning "🔄 Rollback en cours..."
    
    ssh $VPS_HOST << EOF
        cd $PROJECT_PATH
        
        echo "🛑 Arrêt des services..."
        docker-compose down
        
        echo "🔄 Retour à la version précédente..."
        git reset --hard HEAD~1
        
        echo "🚀 Redémarrage avec l'ancienne version..."
        docker-compose up -d
        
        echo "✅ Rollback terminé"
EOF
}

# Fonction de vérification
health_check() {
    log_info "🔍 Vérification de la santé des services..."
    
    ssh $VPS_HOST << EOF
        cd $PROJECT_PATH
        
        echo "📊 État des conteneurs:"
        docker-compose ps
        
        echo ""
        echo "📈 Logs récents:"
        docker-compose logs --tail=20
EOF
}

# Menu principal
case $2 in
    backup)
        backup_database
        ;;
    rollback)
        rollback
        ;;
    health)
        health_check
        ;;
    *)
        # Déploiement complet
        log_info "=== Déploiement Mosala sur $VPS_HOST ==="
        
        if [ "$ENVIRONMENT" = "production" ]; then
            backup_database
        fi
        
        deploy
        
        if [ "$ENVIRONMENT" = "production" ]; then
            health_check
        fi
        
        log_success "🎉 Déploiement complet terminé!"
        ;;
esac

# Afficher les URLs
if [ "$2" != "backup" ] && [ "$2" != "rollback" ] && [ "$2" != "health" ]; then
    echo ""
    log_info "🌐 Services disponibles sur $VPS_HOST:"
    echo "  Frontend: http://$VPS_HOST:1199"
    echo "  Backend NestJS: http://$VPS_HOST:4002"
    echo "  Backend Python: http://$VPS_HOST:1188"
    echo "  Strapi CMS: http://$VPS_HOST:1337"
    echo ""
    log_info "📋 Commandes utiles:"
    echo "  Logs: ssh $VPS_HOST 'cd $PROJECT_PATH && docker-compose logs -f'"
    echo "  Arrêt: ssh $VPS_HOST 'cd $PROJECT_PATH && docker-compose down'"
    echo "  Health check: ./scripts/deploy-vps.sh $ENVIRONMENT health"
fi
