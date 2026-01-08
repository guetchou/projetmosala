#!/bin/bash

# Script de déploiement VPS pour Mosala
# Usage: ./scripts/deploy-vps.sh

set -e

echo "🚀 Déploiement Mosala sur VPS"
echo "=============================="

# Variables
VPS_HOST="projetmosala.org"
VPS_USER="root"
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

# Vérification de la connectivité
log_info "Vérification de la connectivité au VPS..."
if ! ssh -o ConnectTimeout=10 -o BatchMode=yes ${VPS_USER}@${VPS_HOST} exit 2>/dev/null; then
    log_error "Impossible de se connecter au VPS ${VPS_HOST}"
    exit 1
fi
log_success "Connexion au VPS établie"

# Création de la sauvegarde sur le VPS
log_info "Création de la sauvegarde sur le VPS..."
ssh ${VPS_USER}@${VPS_HOST} << 'EOF'
    mkdir -p /opt/backups/mosala
    cd /opt/mosala
    if [ -d "mosala-api" ]; then
        tar -czf /opt/backups/mosala/mosala-backup-$(date +%Y%m%d-%H%M%S).tar.gz \
            --exclude=node_modules --exclude=.git --exclude=dist .
        echo "Sauvegarde créée"
    else
        echo "Aucun projet existant à sauvegarder"
    fi
EOF

# Arrêt des services existants
log_info "Arrêt des services existants..."
ssh ${VPS_USER}@${VPS_HOST} << 'EOF'
    cd /opt/mosala
    if [ -f "docker-compose.prod.yml" ]; then
        docker-compose -f docker-compose.prod.yml down
        echo "Services arrêtés"
    else
        echo "Aucun docker-compose.prod.yml trouvé"
    fi
EOF

# Transfert de l'archive
log_info "Transfert de l'archive vers le VPS..."
ARCHIVE_NAME=$(ls -t mosala-update-*.tar.gz | head -1)
if [ -z "$ARCHIVE_NAME" ]; then
    log_error "Aucune archive de mise à jour trouvée"
    exit 1
fi

scp "$ARCHIVE_NAME" ${VPS_USER}@${VPS_HOST}:/tmp/
log_success "Archive transférée: $ARCHIVE_NAME"

# Déploiement sur le VPS
log_info "Déploiement sur le VPS..."
ssh ${VPS_USER}@${VPS_HOST} << EOF
    # Nettoyage et extraction
    cd /opt
    rm -rf mosala.old
    if [ -d "mosala" ]; then
        mv mosala mosala.old
    fi
    mkdir -p mosala
    cd mosala
    
    # Extraction de l'archive
    tar -xzf /tmp/$ARCHIVE_NAME
    rm /tmp/$ARCHIVE_NAME
    
    # Configuration des variables d'environnement
    if [ ! -f ".env" ]; then
        cp .env-projetmosala .env
    fi
    
    # Build des images Docker
    log_info "Build des images Docker..."
    docker-compose -f docker-compose.prod.yml build --no-cache
    
    # Démarrage des services
    log_info "Démarrage des services..."
    docker-compose -f docker-compose.prod.yml up -d
    
    # Vérification des services
    log_info "Vérification des services..."
    sleep 10
    docker-compose -f docker-compose.prod.yml ps
    
    # Nettoyage des anciennes images
    docker image prune -f
    
    echo "Déploiement terminé"
EOF

log_success "Déploiement terminé avec succès !"
log_info "Services disponibles :"
echo "  - Frontend: https://projetmosala.org"
echo "  - API: https://api.projetmosala.org"
echo "  - CMS: https://admin.projetmosala.org"
echo "  - Traefik Dashboard: https://traefik.projetmosala.org"

# Vérification finale
log_info "Vérification finale des services..."
ssh ${VPS_USER}@${VPS_HOST} << 'EOF'
    echo "=== État des conteneurs ==="
    docker-compose -f /opt/mosala/docker-compose.prod.yml ps
    
    echo "=== Logs des services ==="
    echo "Frontend:"
    docker logs mosala-frontend --tail 10 2>/dev/null || echo "Frontend non démarré"
    
    echo "Backend API:"
    docker logs mosala-api --tail 10 2>/dev/null || echo "API non démarrée"
    
    echo "Base de données:"
    docker logs mosala-db --tail 5 2>/dev/null || echo "DB non démarrée"
EOF

log_success "Déploiement VPS terminé ! 🎉"
