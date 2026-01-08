#!/bin/bash

# Script de déploiement Production Mosala
# Usage: ./scripts/deploy-production.sh

set -e

echo "🚀 Déploiement Production Mosala"
echo "================================"

# Variables
PROJECT_DIR="/opt/mosala"
BACKUP_DIR="/opt/backups/mosala"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Vérification des prérequis
log_info "Vérification des prérequis..."

# Vérifier Docker
if ! command -v docker &> /dev/null; then
    log_error "Docker n'est pas installé"
    exit 1
fi

# Vérifier Docker Compose
if ! command -v docker-compose &> /dev/null; then
    log_error "Docker Compose n'est pas installé"
    exit 1
fi

log_success "Prérequis vérifiés"

# Création de la sauvegarde
log_info "Création de la sauvegarde..."
mkdir -p $BACKUP_DIR
cd $PROJECT_DIR
if [ -d "mosala-api" ]; then
    tar -czf $BACKUP_DIR/mosala-backup-$(date +%Y%m%d-%H%M%S).tar.gz \
        --exclude=node_modules --exclude=.git --exclude=dist .
    log_success "Sauvegarde créée"
else
    log_warning "Aucun projet existant à sauvegarder"
fi

# Arrêt des services existants
log_info "Arrêt des services existants..."
if [ -f "docker-compose.prod.yml" ]; then
    docker-compose -f docker-compose.prod.yml down
    log_success "Services arrêtés"
else
    log_warning "Aucun docker-compose.prod.yml trouvé"
fi

# Nettoyage des images Docker
log_info "Nettoyage des images Docker..."
docker system prune -f
docker volume prune -f

# Build des images
log_info "Build des images Docker..."

# Build Frontend
log_info "Build Frontend..."
cd frontend
docker build -t mosala-frontend:latest .
cd ..

# Build Backend
log_info "Build Backend..."
cd backend
docker build -t mosala-backend:latest .
cd ..

# Build Strapi CMS
log_info "Build Strapi CMS..."
cd mosala-cms
docker build -t mosala-strapi:latest .
cd ..

log_success "Images Docker construites"

# Démarrage des services
log_info "Démarrage des services..."
docker-compose -f docker-compose.prod.yml up -d

# Vérification des services
log_info "Vérification des services..."
sleep 30

# Vérifier Traefik
if docker ps | grep -q mosala-traefik; then
    log_success "Traefik démarré"
else
    log_error "Traefik n'a pas démarré"
fi

# Vérifier Frontend
if docker ps | grep -q mosala-frontend; then
    log_success "Frontend démarré"
else
    log_error "Frontend n'a pas démarré"
fi

# Vérifier Backend
if docker ps | grep -q mosala-backend-nestjs; then
    log_success "Backend démarré"
else
    log_error "Backend n'a pas démarré"
fi

# Vérifier Strapi
if docker ps | grep -q mosala-strapi; then
    log_success "Strapi CMS démarré"
else
    log_error "Strapi CMS n'a pas démarré"
fi

# Vérifier les bases de données
if docker ps | grep -q mosala-postgres; then
    log_success "PostgreSQL démarré"
else
    log_error "PostgreSQL n'a pas démarré"
fi

if docker ps | grep -q mosala-db; then
    log_success "MySQL démarré"
else
    log_error "MySQL n'a pas démarré"
fi

# Affichage des URLs
echo ""
log_success "🎉 Déploiement terminé avec succès!"
echo ""
echo "📋 URLs des services:"
echo "  • Site principal: https://projetmosala.org"
echo "  • API: https://api.projetmosala.org"
echo "  • CMS Strapi: https://cms.projetmosala.org"
echo "  • Admin Panel: https://admin.projetmosala.org"
echo "  • Support: https://support.projetmosala.org"
echo "  • Dashboard Traefik: https://traefik.projetmosala.org"
echo ""
echo "🔧 Commandes utiles:"
echo "  • Voir les logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "  • Arrêter: docker-compose -f docker-compose.prod.yml down"
echo "  • Redémarrer: docker-compose -f docker-compose.prod.yml restart"
echo ""
