#!/bin/bash

# Script pour configurer les secrets GitHub
# Usage: ./scripts/setup-github-secrets.sh

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

# Vérifier que gh CLI est installé
if ! command -v gh &> /dev/null; then
    log_error "GitHub CLI (gh) n'est pas installé"
    log_info "Installez-le depuis: https://cli.github.com/"
    exit 1
fi

# Vérifier l'authentification
if ! gh auth status --hostname github.com &> /dev/null; then
    log_error "Vous n'êtes pas connecté à GitHub CLI"
    log_info "Connectez-vous avec: gh auth login"
    exit 1
fi

log_info "=== Configuration des Secrets GitHub ==="

# Demander les informations
echo ""
log_info "Configuration des secrets pour le CI/CD"
echo ""

read -p "Nom d'utilisateur Docker Hub: " DOCKER_USERNAME
read -s -p "Token Docker Hub: " DOCKER_PASSWORD
echo ""

echo ""
log_warning "Configuration optionnelle pour le déploiement automatique:"
read -p "Voulez-vous configurer le déploiement automatique? (y/n): " SETUP_DEPLOY

# Configuration automatique pour topcenter-ovh
if [[ $SETUP_DEPLOY == "y" || $SETUP_DEPLOY == "Y" ]]; then
    SERVER_HOST="topcenter-ovh"
    SERVER_USER="root"
    
    log_info "Configuration automatique pour VPS topcenter-ovh"
    log_info "Serveur: $SERVER_HOST"
    log_info "Utilisateur: $SERVER_USER"
    
    # Tester la connexion SSH
    log_info "Test de connexion SSH..."
    if ssh -o ConnectTimeout=10 -o BatchMode=yes $SERVER_HOST "echo 'Connexion SSH réussie'" 2>/dev/null; then
        log_success "Connexion SSH testée avec succès"
    else
        log_warning "Impossible de tester la connexion SSH automatiquement"
        log_info "Assurez-vous que la clé SSH est configurée pour topcenter-ovh"
    fi
fi

# Configurer les secrets
log_info "Configuration des secrets..."

# Secrets obligatoires
gh secret set DOCKER_USERNAME --body "$DOCKER_USERNAME"
gh secret set DOCKER_PASSWORD --body "$DOCKER_PASSWORD"

log_success "Secrets Docker configurés"

# Secrets optionnels
if [[ $SETUP_DEPLOY == "y" || $SETUP_DEPLOY == "Y" ]]; then
    gh secret set SERVER_HOST --body "$SERVER_HOST"
    gh secret set SERVER_USER --body "$SERVER_USER"
    
    log_success "Secrets de déploiement configurés"
    log_info "Note: La clé SSH sera utilisée depuis la configuration locale"
fi

echo ""
log_success "✅ Configuration terminée!"
echo ""

# Afficher les secrets configurés
log_info "Secrets configurés:"
gh secret list

echo ""
log_info "Prochaines étapes:"
echo "1. Poussez votre code sur GitHub"
echo "2. Le CI/CD se déclenchera automatiquement"
echo "3. Vérifiez les actions dans l'onglet 'Actions' de votre repo"
echo ""

# Instructions pour Docker Hub
echo ""
log_info "Instructions Docker Hub:"
echo "1. Créez un compte sur https://hub.docker.com"
echo "2. Créez un token d'accès dans Account Settings > Security"
echo "3. Utilisez ce token comme DOCKER_PASSWORD"
echo ""

# Instructions pour le serveur
if [[ $SETUP_DEPLOY == "y" || $SETUP_DEPLOY == "Y" ]]; then
    echo ""
    log_info "Instructions serveur de production:"
    echo "1. Assurez-vous que Docker et Docker Compose sont installés"
    echo "2. Clonez le repo dans /opt/mosala"
    echo "3. Configurez les variables d'environnement"
    echo "4. L'utilisateur $SERVER_USER doit avoir les permissions sudo"
    echo ""
fi
