#!/bin/bash

# Script de vérification VPS pour Mosala
# Usage: ./scripts/check-vps.sh

set -e

echo "🔍 Vérification VPS Mosala"
echo "=========================="

# Variables
VPS_HOST="projetmosala.org"
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
if ! ssh -o ConnectTimeout=10 -o BatchMode=yes ${VPS_USER}@${VPS_HOST} exit 2>/dev/null; then
    log_error "Impossible de se connecter au VPS ${VPS_HOST}"
    exit 1
fi
log_success "Connexion au VPS établie"

# Vérification des services
log_info "Vérification des services Mosala..."
ssh ${VPS_USER}@${VPS_HOST} << 'EOF'
    echo "=== État des conteneurs ==="
    cd /opt/mosala
    if [ -f "docker-compose.prod.yml" ]; then
        docker-compose -f docker-compose.prod.yml ps
    else
        echo "Aucun docker-compose.prod.yml trouvé"
    fi
    
    echo ""
    echo "=== Utilisation des ressources ==="
    echo "CPU et mémoire:"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"
    
    echo ""
    echo "=== Espace disque ==="
    df -h /opt/mosala
    
    echo ""
    echo "=== Logs récents ==="
    echo "Frontend (dernières 5 lignes):"
    docker logs mosala-frontend --tail 5 2>/dev/null || echo "Frontend non démarré"
    
    echo ""
    echo "Backend API (dernières 5 lignes):"
    docker logs mosala-api --tail 5 2>/dev/null || echo "API non démarrée"
    
    echo ""
    echo "Base de données (dernières 3 lignes):"
    docker logs mosala-db --tail 3 2>/dev/null || echo "DB non démarrée"
    
    echo ""
    echo "=== Vérification des ports ==="
    netstat -tlnp | grep -E ':(80|443|1188|1199|1337|3326|5433)' || echo "Aucun port Mosala trouvé"
    
    echo ""
    echo "=== Certificats SSL ==="
    if [ -f "/opt/mosala/acme.json" ]; then
        echo "Certificats Traefik présents"
        ls -la /opt/mosala/acme.json
    else
        echo "Aucun certificat Traefik trouvé"
    fi
EOF

# Vérification des domaines
log_info "Vérification des domaines..."
echo "Frontend: https://projetmosala.org"
curl -s -o /dev/null -w "Status: %{http_code}\n" https://projetmosala.org || echo "Frontend inaccessible"

echo "API: https://api.projetmosala.org"
curl -s -o /dev/null -w "Status: %{http_code}\n" https://api.projetmosala.org || echo "API inaccessible"

echo "CMS: https://admin.projetmosala.org"
curl -s -o /dev/null -w "Status: %{http_code}\n" https://admin.projetmosala.org || echo "CMS inaccessible"

log_success "Vérification VPS terminée !"
