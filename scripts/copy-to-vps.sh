#!/bin/bash

# Script pour copier les fichiers vers le VPS
# Usage: ./scripts/copy-to-vps.sh

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

log_info "=== Copie des fichiers vers le VPS ==="

# Créer une archive du projet
log_info "📦 Création de l'archive du projet..."
tar --exclude='.git' --exclude='node_modules' --exclude='dist' --exclude='build' -czf mosala-project.tar.gz .

# Copier l'archive vers le VPS
log_info "📤 Copie de l'archive vers le VPS..."
scp mosala-project.tar.gz $VPS_HOST:/tmp/

# Extraire sur le VPS
log_info "📥 Extraction sur le VPS..."
ssh $VPS_HOST << EOF
    cd $PROJECT_PATH
    sudo tar -xzf /tmp/mosala-project.tar.gz
    sudo chown -R root:root .
    sudo chmod -R 755 .
    rm /tmp/mosala-project.tar.gz
    echo "✅ Fichiers copiés avec succès"
    ls -la
EOF

# Nettoyer l'archive locale
rm mosala-project.tar.gz

log_success "Fichiers copiés avec succès!"
