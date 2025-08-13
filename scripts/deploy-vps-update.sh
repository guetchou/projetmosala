#!/bin/bash

# Script de mise à jour VPS pour Mosala
# Met à jour le VPS avec les modifications locales
# Usage: ./scripts/deploy-vps-update.sh

set -e

echo "🚀 Mise à jour VPS Mosala"
echo "========================"

# Variables
VPS_HOST="5.196.22.149"
VPS_USER="root"
VPS_PATH="/opt/mosala"
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
if ! ssh -o ConnectTimeout=10 $VPS_USER@$VPS_HOST "echo 'Connexion OK'" > /dev/null 2>&1; then
    log_error "Impossible de se connecter au VPS ${VPS_HOST}"
    exit 1
fi
log_success "Connexion au VPS établie"

# Création de la sauvegarde sur le VPS
log_info "Création de la sauvegarde sur le VPS..."
ssh $VPS_USER@$VPS_HOST << 'EOF'
    mkdir -p /opt/backups/mosala
    cd /opt/mosala
    if [ -d "mosala-api" ] || [ -d "frontend" ]; then
        tar -czf /opt/backups/mosala/mosala-backup-$(date +%Y%m%d-%H%M%S).tar.gz \
            --exclude=node_modules --exclude=.git --exclude=dist .
        echo "Sauvegarde créée"
    else
        echo "Aucun projet existant à sauvegarder"
    fi
EOF

# Arrêt des services existants
log_info "Arrêt des services existants..."
ssh $VPS_USER@$VPS_HOST "cd $VPS_PATH && docker compose -f docker-compose-projetmosala.yml down || true"

# Création de l'archive des modifications
log_info "Création de l'archive des modifications..."
ARCHIVE_NAME="mosala-update-$(date +%Y%m%d-%H%M%S).tar.gz"
tar -czf "$ARCHIVE_NAME" \
    --exclude=node_modules --exclude=.git --exclude=dist --exclude=backups \
    --exclude=mosala-dist.tar.gz --exclude=mosala-project.tar.gz \
    mosala-api/ frontend/ docker-compose-projetmosala.yml traefik-static.yml .env-vps-simple

# Transfert de l'archive
log_info "Transfert de l'archive vers le VPS..."
scp "$ARCHIVE_NAME" $VPS_USER@$VPS_HOST:/tmp/
log_success "Archive transférée: $ARCHIVE_NAME"

# Déploiement sur le VPS
log_info "Déploiement sur le VPS..."
ssh $VPS_USER@$VPS_HOST << EOF
    # Sauvegarde de l'ancienne configuration
    cd /opt
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
        cp .env-vps-simple .env
    fi
    
    # Mise à jour de la configuration Traefik
    if [ -f "traefik-static.yml" ]; then
        cp traefik-static.yml traefik-projetmosala.yml
    fi
    
    # Build des images Docker si nécessaire
    log_info "Vérification des images Docker..."
    
    # Pull des images existantes
    docker pull galoycg/mosala-frontend:latest || echo "Image frontend non trouvée"
    docker pull galoycg/mosala-backend:latest || echo "Image backend non trouvée"
    docker pull galoycg/mosala-api:latest || echo "Image API non trouvée"
    
    # Démarrage des services
    log_info "Démarrage des services..."
    docker compose -f docker-compose-projetmosala.yml up -d
    
    # Vérification des services
    log_info "Vérification des services..."
    sleep 15
    docker compose -f docker-compose-projetmosala.yml ps
    
    # Nettoyage des anciennes images
    docker image prune -f
    
    echo "Déploiement terminé"
EOF

log_success "Déploiement terminé avec succès !"
log_info "Services disponibles :"
echo "  - Frontend: https://projetmosala.org"
echo "  - API: https://api.projetmosala.org"
echo "  - CMS: https://admin.projetmosala.org"

# Vérification finale
log_info "Vérification finale des services..."
ssh $VPS_USER@$VPS_HOST << 'EOF'
    echo "=== État des conteneurs ==="
    cd /opt/mosala
    docker compose -f docker-compose-projetmosala.yml ps
    
    echo ""
    echo "=== Logs des services ==="
    echo "Frontend:"
    docker logs mosala-frontend --tail 5 2>/dev/null || echo "Frontend non démarré"
    
    echo ""
    echo "Backend API:"
    docker logs mosala-api --tail 5 2>/dev/null || echo "API non démarrée"
    
    echo ""
    echo "Base de données:"
    docker logs mosala-db --tail 3 2>/dev/null || echo "DB non démarrée"
EOF

# Nettoyage local
rm -f "$ARCHIVE_NAME"

log_success "Mise à jour VPS terminée ! 🎉"
