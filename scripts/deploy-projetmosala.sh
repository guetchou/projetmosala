#!/bin/bash

# Script de déploiement pour projetmosala.org
# Usage: ./scripts/deploy-projetmosala.sh

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
VPS_HOST="topcenter-ovh"
PROJECT_PATH="/opt/mosala"

log_info "=== Déploiement projetmosala.org ==="

# Vérifier la connexion SSH
log_info "Test de connexion SSH vers $VPS_HOST..."
if ! ssh -o ConnectTimeout=10 -o BatchMode=yes $VPS_HOST "echo 'Connexion OK'" 2>/dev/null; then
    log_error "Impossible de se connecter à $VPS_HOST"
    exit 1
fi

log_success "Connexion SSH établie"

# Copier les fichiers vers le VPS
log_info "📤 Copie des fichiers vers le VPS..."

scp docker-compose-projetmosala.yml $VPS_HOST:/tmp/
scp traefik-projetmosala.yml $VPS_HOST:/tmp/
scp .env-projetmosala $VPS_HOST:/tmp/

# Déployer sur le VPS
log_info "🚀 Déploiement sur le VPS..."

ssh $VPS_HOST << EOF
    cd $PROJECT_PATH
    
    # Copier les fichiers
    sudo cp /tmp/docker-compose-projetmosala.yml docker-compose.yml
    sudo cp /tmp/traefik-projetmosala.yml traefik.yml
    sudo cp /tmp/.env-projetmosala .env
    
    # Créer le fichier acme.json pour Let's Encrypt
    sudo touch acme.json
    sudo chmod 600 acme.json
    
    # Arrêter les services existants
    sudo docker compose down 2>/dev/null || true
    
    # Démarrer les services
    echo "🐳 Démarrage des services avec domaines projetmosala.org..."
    sudo docker compose up -d
    
    # Attendre le démarrage
    echo "⏳ Attente du démarrage..."
    sleep 60
    
    # Vérifier l'état
    echo "📊 État des services:"
    sudo docker compose ps
    
    # Nettoyer
    sudo rm /tmp/docker-compose-projetmosala.yml
    sudo rm /tmp/traefik-projetmosala.yml
    sudo rm /tmp/.env-projetmosala
EOF

log_success "🎉 Déploiement projetmosala.org terminé!"

# Afficher les URLs
echo ""
log_info "🌐 Services disponibles:"
echo "  Frontend: https://projetmosala.org"
echo "  API: https://api.projetmosala.org"
echo "  CMS: https://admin.projetmosala.org"
echo "  Traefik Dashboard: https://traefik.projetmosala.org"
echo ""
log_info "📋 Commandes utiles:"
echo "  Logs: ssh $VPS_HOST 'cd $PROJECT_PATH && sudo docker compose logs -f'"
echo "  Arrêt: ssh $VPS_HOST 'cd $PROJECT_PATH && sudo docker compose down'"
echo "  Redémarrage: ssh $VPS_HOST 'cd $PROJECT_PATH && sudo docker compose restart'"
echo ""
log_warning "⚠️  N'oubliez pas de configurer vos DNS pour pointer vers $VPS_HOST"
echo "   projetmosala.org → Votre IP VPS"
echo "   api.projetmosala.org → Votre IP VPS"
echo "   admin.projetmosala.org → Votre IP VPS"
echo "   traefik.projetmosala.org → Votre IP VPS"
