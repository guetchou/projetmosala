#!/bin/bash

# Script de diagnostic VPS pour Mosala
# Usage: ./scripts/diagnose-vps.sh

set -e

echo "🔍 Diagnostic VPS Mosala"
echo "========================"

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

# Diagnostic complet
log_info "Diagnostic complet du VPS..."
ssh $VPS_USER@$VPS_HOST << 'EOF'
    echo "=== État des conteneurs ==="
    cd /opt/mosala
    docker compose -f docker-compose-projetmosala.yml ps
    
    echo ""
    echo "=== Logs Traefik ==="
    docker logs mosala-traefik --tail 20
    
    echo ""
    echo "=== Logs Frontend ==="
    docker logs mosala-frontend --tail 10
    
    echo ""
    echo "=== Logs API ==="
    docker logs mosala-api --tail 10
    
    echo ""
    echo "=== Configuration Traefik ==="
    cat traefik-projetmosala.yml
    
    echo ""
    echo "=== Vérification des ports ==="
    netstat -tlnp | grep -E ':(80|443|1188|3000)'
    
    echo ""
    echo "=== Test local des services ==="
    echo "Frontend local:"
    curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:3000 || echo "Frontend inaccessible"
    
    echo "API local:"
    curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:1188 || echo "API inaccessible"
    
    echo ""
    echo "=== Certificats SSL ==="
    ls -la /opt/mosala/acme.json 2>/dev/null || echo "Aucun certificat trouvé"
    
    echo ""
    echo "=== Variables d'environnement ==="
    cat .env | head -10
EOF

log_success "Diagnostic terminé !"
