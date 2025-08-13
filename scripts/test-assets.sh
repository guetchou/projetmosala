#!/bin/bash

# 🧪 Script de test des assets pour vérifier que tout fonctionne
# Teste favicon, images carousel, et autres assets critiques

set -e

# Configuration
VPS_HOST="topcenter-ovh"
PORT="3000"

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Fonction pour tester une URL
test_url() {
    local url=$1
    local description=$2
    local expected_code=${3:-200}
    
    local http_code=$(ssh $VPS_HOST "curl -s -o /dev/null -w '%{http_code}' http://localhost:$PORT$url" 2>/dev/null || echo "000")
    
    if [ "$http_code" = "$expected_code" ]; then
        log_success "$description (HTTP $http_code)"
        return 0
    else
        log_error "$description (HTTP $http_code, attendu $expected_code)"
        return 1
    fi
}

log_info "🧪 Test des assets sur $VPS_HOST:$PORT..."

# Tests des assets critiques
echo ""
log_info "📄 Assets de base :"
test_url "/" "Page d'accueil"
test_url "/favicon.ico" "Favicon"
test_url "/robots.txt" "Robots.txt"

echo ""
log_info "🖼️ Images carousel :"
test_url "/topcenter-uploads/carrousel/mosala1.jpeg" "Image carousel 1"
test_url "/topcenter-uploads/carrousel/mosala2.jpeg" "Image carousel 2"
test_url "/topcenter-uploads/carrousel/mosala3.jpeg" "Image carousel 3"
test_url "/topcenter-uploads/carrousel/mosala5-ministre-jeunesse-ambassadeur-france-congo.jpeg" "Image carousel 5"

echo ""
log_info "📁 Dossiers d'images :"
test_url "/topcenter-uploads/" "Dossier uploads"
test_url "/images-mosala/" "Dossier images Mosala"

echo ""
log_info "📊 Résumé :"
echo "🌐 Application: http://$VPS_HOST:$PORT"
echo "🖼️ Images: http://$VPS_HOST:$PORT/topcenter-uploads/carrousel/"
echo "📄 Favicon: http://$VPS_HOST:$PORT/favicon.ico"

echo ""
log_info "📋 Commandes utiles :"
echo "  Logs: ssh $VPS_HOST 'cd /opt/mosala && docker compose -f docker-compose-projetmosala.yml logs frontend'"
echo "  Shell: ssh $VPS_HOST 'cd /opt/mosala && docker exec -it mosala-frontend sh'"
echo "  Assets: ssh $VPS_HOST 'cd /opt/mosala && docker exec mosala-frontend ls -la /usr/share/nginx/html/'"
