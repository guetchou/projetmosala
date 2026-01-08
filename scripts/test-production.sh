#!/bin/bash

# Script de test Production Mosala
# Usage: ./scripts/test-production.sh

set -e

echo "🧪 Test Configuration Production Mosala"
echo "========================================"

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

# Test 1: Vérification des fichiers de configuration
log_info "Test 1: Vérification des fichiers de configuration..."

if [ -f "docker-compose.prod.yml" ]; then
    log_success "docker-compose.prod.yml trouvé"
else
    log_error "docker-compose.prod.yml manquant"
    exit 1
fi

if [ -f "traefik.yml" ]; then
    log_success "traefik.yml trouvé"
else
    log_error "traefik.yml manquant"
    exit 1
fi

if [ -f "env.production" ]; then
    log_success "env.production trouvé"
else
    log_error "env.production manquant"
    exit 1
fi

# Test 2: Vérification des Dockerfiles
log_info "Test 2: Vérification des Dockerfiles..."

if [ -f "frontend/Dockerfile" ]; then
    log_success "Frontend Dockerfile trouvé"
else
    log_error "Frontend Dockerfile manquant"
    exit 1
fi

if [ -f "backend/Dockerfile" ]; then
    log_success "Backend Dockerfile trouvé"
else
    log_error "Backend Dockerfile manquant"
    exit 1
fi

if [ -f "mosala-cms/Dockerfile" ]; then
    log_success "Strapi CMS Dockerfile trouvé"
else
    log_error "Strapi CMS Dockerfile manquant"
    exit 1
fi

if [ -f "frontend/Dockerfile.admin" ]; then
    log_success "Admin Dockerfile trouvé"
else
    log_error "Admin Dockerfile manquant"
    exit 1
fi

# Test 3: Vérification des builds
log_info "Test 3: Vérification des builds..."

# Test Frontend
cd frontend
if npm run build > /dev/null 2>&1; then
    log_success "Frontend build réussi"
else
    log_error "Frontend build échoué"
    exit 1
fi
cd ..

# Test Backend
cd backend
if npm run build > /dev/null 2>&1; then
    log_success "Backend build réussi"
else
    log_error "Backend build échoué"
    exit 1
fi
cd ..

# Test 4: Vérification de la syntaxe Docker Compose
log_info "Test 4: Vérification de la syntaxe Docker Compose..."

if docker-compose -f docker-compose.prod.yml config > /dev/null 2>&1; then
    log_success "Docker Compose syntaxe valide"
else
    log_error "Docker Compose syntaxe invalide"
    exit 1
fi

# Test 5: Vérification des domaines dans la configuration
log_info "Test 5: Vérification des domaines..."

DOMAINS=("projetmosala.org" "api.projetmosala.org" "cms.projetmosala.org" "admin.projetmosala.org" "support.projetmosala.org")

for domain in "${DOMAINS[@]}"; do
    if grep -q "$domain" docker-compose.prod.yml; then
        log_success "Domaine $domain configuré"
    else
        log_warning "Domaine $domain non trouvé dans la configuration"
    fi
done

# Test 6: Vérification des volumes et réseaux
log_info "Test 6: Vérification des volumes et réseaux..."

if grep -q "traefik/acme.json" docker-compose.prod.yml; then
    log_success "Volume acme.json configuré"
else
    log_warning "Volume acme.json non configuré"
fi

if grep -q "mosala-net" docker-compose.prod.yml; then
    log_success "Réseau mosala-net configuré"
else
    log_error "Réseau mosala-net non configuré"
    exit 1
fi

# Test 7: Vérification des health checks
log_info "Test 7: Vérification des health checks..."

if grep -q "healthcheck" docker-compose.prod.yml; then
    log_success "Health checks configurés"
else
    log_warning "Health checks non configurés"
fi

# Test 8: Vérification des secrets et variables d'environnement
log_info "Test 8: Vérification des variables d'environnement..."

REQUIRED_VARS=("JWT_SECRET" "STRAPI_JWT_SECRET" "CORS_ORIGIN" "VITE_API_URL")

for var in "${REQUIRED_VARS[@]}"; do
    if grep -q "$var" docker-compose.prod.yml; then
        log_success "Variable $var configurée"
    else
        log_warning "Variable $var non configurée"
    fi
done

echo ""
log_success "🎉 Tous les tests de configuration sont passés!"
echo ""
echo "📋 Prochaines étapes:"
echo "  1. Configurer les DNS pour pointer vers le serveur"
echo "  2. Exécuter: ./scripts/deploy-production.sh"
echo "  3. Vérifier les certificats SSL avec Let's Encrypt"
echo "  4. Tester les endpoints:"
echo "     • https://projetmosala.org"
echo "     • https://api.projetmosala.org/health"
echo "     • https://cms.projetmosala.org"
echo "     • https://admin.projetmosala.org"
echo "     • https://support.projetmosala.org"
echo ""
