#!/bin/bash

# Script de correction rapide VPS pour Mosala
# Usage: ./scripts/fix-vps.sh

set -e

echo "🔧 Correction rapide VPS Mosala"
echo "==============================="

# Variables
VPS_HOST="5.196.22.149"
VPS_USER="root"

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

# Correction sur le VPS
log_info "Application des corrections sur le VPS..."
ssh $VPS_USER@$VPS_HOST << 'EOF'
    cd /opt/mosala
    
    echo "=== Mise à jour de la configuration Traefik ==="
    # Mise à jour de la configuration Traefik
    cat > traefik-projetmosala.yml << 'TRAEFIK_CONFIG'
# Configuration Traefik statique pour projetmosala.org
http:
  routers:
    frontend:
      rule: "Host(`projetmosala.org`)"
      service: frontend-static
      tls: {}
      entryPoints:
        - websecure
    
    api:
      rule: "Host(`api.projetmosala.org`)"
      service: api-static
      tls: {}
      entryPoints:
        - websecure

  services:
    frontend-static:
      loadBalancer:
        servers:
          - url: "http://mosala-frontend:80"
    
    api-static:
      loadBalancer:
        servers:
          - url: "http://mosala-api:1188"

entryPoints:
  web:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https
  
  websecure:
    address: ":443"

certificatesResolvers:
  letsencrypt:
    acme:
      email: admin@projetmosala.org
      storage: /data/acme.json
      httpChallenge:
        entryPoint: web
TRAEFIK_CONFIG
    
    echo "=== Redémarrage des services ==="
    docker compose -f docker-compose-projetmosala.yml restart traefik
    
    echo "=== Vérification de l'API ==="
    sleep 5
    curl -s http://localhost:1188/docs || echo "API non accessible"
    
    echo "=== Vérification du Frontend ==="
    curl -s http://localhost:3000 | head -5 || echo "Frontend non accessible"
    
    echo "=== État des conteneurs ==="
    docker compose -f docker-compose-projetmosala.yml ps
EOF

log_success "Corrections appliquées !"
log_info "Test des domaines dans quelques minutes..."
echo "  - Frontend: https://projetmosala.org"
echo "  - API: https://api.projetmosala.org"
