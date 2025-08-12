#!/bin/bash

# Script de déploiement Mosala
# Usage: ./scripts/deploy.sh [production|staging|development]

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-development}
PROJECT_NAME="mosala"
DOCKER_COMPOSE_FILE="docker-compose.yml"

# Fonction pour afficher les messages
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

# Vérifier l'environnement
case $ENVIRONMENT in
    production|staging|development)
        log_info "Déploiement en mode: $ENVIRONMENT"
        ;;
    *)
        log_error "Environnement invalide. Utilisez: production, staging, ou development"
        exit 1
        ;;
esac

# Vérifier que Docker est installé
if ! command -v docker &> /dev/null; then
    log_error "Docker n'est pas installé"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    log_error "Docker Compose n'est pas installé"
    exit 1
fi

# Fonction de sauvegarde
backup_database() {
    log_info "Sauvegarde de la base de données..."
    
    if [ "$ENVIRONMENT" = "production" ]; then
        # Sauvegarde MySQL
        docker-compose exec -T db mysqldump -u mosala -pmosala mosala > backup_$(date +%Y%m%d_%H%M%S).sql
        
        # Sauvegarde PostgreSQL
        docker-compose exec -T postgres pg_dump -U postgres mosala > backup_pg_$(date +%Y%m%d_%H%M%S).sql
        
        log_success "Sauvegarde terminée"
    fi
}

# Fonction de build
build_images() {
    log_info "Build des images Docker..."
    
    if [ "$ENVIRONMENT" = "production" ]; then
        docker-compose build --no-cache
    else
        docker-compose build
    fi
    
    log_success "Build terminé"
}

# Fonction de déploiement
deploy() {
    log_info "Déploiement de $PROJECT_NAME..."
    
    # Arrêter les services existants
    log_info "Arrêt des services existants..."
    docker-compose down
    
    # Pull des dernières images (production uniquement)
    if [ "$ENVIRONMENT" = "production" ]; then
        log_info "Pull des dernières images..."
        docker-compose pull
    fi
    
    # Démarrer les services
    log_info "Démarrage des services..."
    docker-compose up -d
    
    # Attendre que les services soient prêts
    log_info "Attente du démarrage des services..."
    sleep 30
    
    # Vérifier l'état des services
    log_info "Vérification de l'état des services..."
    docker-compose ps
    
    log_success "Déploiement terminé avec succès!"
}

# Fonction de rollback
rollback() {
    log_warning "Rollback en cours..."
    
    # Arrêter les services
    docker-compose down
    
    # Restaurer la dernière sauvegarde
    if [ -f "backup_$(date +%Y%m%d)*.sql" ]; then
        log_info "Restauration de la base de données..."
        # docker-compose exec -T db mysql -u mosala -pmosala mosala < backup_$(date +%Y%m%d)*.sql
    fi
    
    # Redémarrer avec les anciennes images
    docker-compose up -d
    
    log_success "Rollback terminé"
}

# Fonction de nettoyage
cleanup() {
    log_info "Nettoyage des ressources Docker..."
    
    # Supprimer les images non utilisées
    docker image prune -f
    
    # Supprimer les conteneurs arrêtés
    docker container prune -f
    
    # Supprimer les volumes non utilisés (attention!)
    # docker volume prune -f
    
    log_success "Nettoyage terminé"
}

# Menu principal
case $2 in
    backup)
        backup_database
        ;;
    build)
        build_images
        ;;
    rollback)
        rollback
        ;;
    cleanup)
        cleanup
        ;;
    *)
        # Déploiement complet
        log_info "=== Déploiement $PROJECT_NAME ==="
        
        if [ "$ENVIRONMENT" = "production" ]; then
            backup_database
        fi
        
        build_images
        deploy
        
        if [ "$ENVIRONMENT" = "production" ]; then
            cleanup
        fi
        
        log_success "Déploiement complet terminé!"
        ;;
esac

# Afficher les URLs
if [ "$2" != "backup" ] && [ "$2" != "build" ] && [ "$2" != "rollback" ] && [ "$2" != "cleanup" ]; then
    echo ""
    log_info "Services disponibles:"
    echo "  Frontend: http://localhost:1199"
    echo "  Backend NestJS: http://localhost:4002"
    echo "  Backend Python: http://localhost:1188"
    echo "  Strapi CMS: http://localhost:1337"
    echo "  MySQL: localhost:3326"
    echo "  PostgreSQL: localhost:5433"
    echo ""
    log_info "Logs: docker-compose logs -f"
    log_info "Arrêt: docker-compose down"
fi
