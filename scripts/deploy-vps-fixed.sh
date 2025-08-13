#!/bin/bash

# 🚀 Script de déploiement VPS corrigé pour les assets statiques
# Résout le problème 404 des images en production

set -e

# Configuration
VPS_HOST="topcenter-ovh"
PROJECT_PATH="/opt/mosala"
DOCKER_IMAGE="galoycg/mosala-frontend:latest"

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

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "docker-compose.yml" ]; then
    log_error "Ce script doit être exécuté depuis la racine du projet"
    exit 1
fi

log_info "🚀 Déploiement VPS avec correction des assets statiques..."

# 1. Build de l'image Docker avec les assets
log_info "📦 Build de l'image Docker..."
docker build -f Dockerfile.frontend.final -t $DOCKER_IMAGE .

# 2. Push vers Docker Hub
log_info "📤 Push vers Docker Hub..."
docker push $DOCKER_IMAGE

# 3. Déploiement sur le VPS
log_info "🌐 Déploiement sur le VPS..."

ssh $VPS_HOST << 'EOF'
    cd /opt/mosala
    
    echo "🔄 Arrêt des services existants..."
    docker compose down 2>/dev/null || true
    
    echo "📥 Pull de la nouvelle image..."
    docker pull galoycg/mosala-frontend:latest
    
    echo "🚀 Démarrage des services..."
    docker compose up -d
    
    echo "⏳ Attente du démarrage..."
    sleep 30
    
    echo "📊 Vérification des services..."
    docker compose ps
    
    echo "🔍 Vérification des assets statiques..."
    docker exec mosala-frontend ls -la /usr/share/nginx/html/topcenter-uploads/carrousel/ || echo "❌ Dossier carrousel non trouvé"
    
    echo "🌐 Test de l'application..."
    curl -s -o /dev/null -w "%{http_code}" http://localhost:1200 || echo "❌ Application non accessible"
EOF

log_success "🎉 Déploiement terminé !"

# 4. Vérification finale
log_info "🔍 Vérification finale..."

# Test de l'application
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://$VPS_HOST:1200 || echo "000")

if [ "$HTTP_CODE" = "200" ]; then
    log_success "✅ Application accessible (HTTP $HTTP_CODE)"
else
    log_error "❌ Application non accessible (HTTP $HTTP_CODE)"
fi

# Test d'une image spécifique
IMAGE_TEST=$(curl -s -o /dev/null -w "%{http_code}" http://$VPS_HOST:1200/topcenter-uploads/carrousel/mosala1.jpeg || echo "000")

if [ "$IMAGE_TEST" = "200" ]; then
    log_success "✅ Images carousel accessibles"
else
    log_warning "⚠️  Images carousel non accessibles (HTTP $IMAGE_TEST)"
    log_info "💡 Vérifiez que les assets sont bien copiés dans le container"
fi

echo ""
log_info "🌐 URLs d'accès :"
echo "  Frontend: http://$VPS_HOST:1200"
echo "  Backend: http://$VPS_HOST:1188"
echo "  Strapi: http://$VPS_HOST:1337"

echo ""
log_info "📋 Commandes utiles :"
echo "  Logs: ssh $VPS_HOST 'cd $PROJECT_PATH && docker compose logs -f frontend'"
echo "  Shell: ssh $VPS_HOST 'cd $PROJECT_PATH && docker exec -it mosala-frontend sh'"
echo "  Assets: ssh $VPS_HOST 'cd $PROJECT_PATH && docker exec mosala-frontend ls -la /usr/share/nginx/html/topcenter-uploads/'"
