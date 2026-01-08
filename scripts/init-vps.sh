#!/bin/bash

# Script d'initialisation du VPS topcenter-ovh
# Usage: ./scripts/init-vps.sh

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
VPS_USER="root"
PROJECT_PATH="/opt/mosala"

log_info "=== Initialisation du VPS topcenter-ovh ==="

# Vérifier la connexion SSH
log_info "Test de connexion SSH vers $VPS_HOST..."
if ! ssh -o ConnectTimeout=10 -o BatchMode=yes $VPS_HOST "echo 'Connexion OK'" 2>/dev/null; then
    log_error "Impossible de se connecter à $VPS_HOST"
    exit 1
fi

log_success "Connexion SSH établie"

# Initialiser le VPS
log_info "🚀 Initialisation du VPS..."

ssh $VPS_HOST << 'EOF'
    echo "📦 Mise à jour du système..."
    dnf update -y
    
    echo "🐳 Installation de Docker..."
    dnf install -y docker docker-compose git
    
    echo "🚀 Démarrage de Docker..."
    systemctl enable docker
    systemctl start docker
    
    echo "👥 Ajout de l'utilisateur au groupe docker..."
    usermod -aG docker root
    
    echo "📁 Création du répertoire du projet..."
    mkdir -p /opt/mosala
    cd /opt/mosala
    
    echo "📋 Vérification de l'installation..."
    docker --version
    docker-compose --version
    git --version
    
    echo "✅ Initialisation terminée!"
EOF

log_success "VPS initialisé avec succès"

# Cloner le projet
log_info "📥 Clonage du projet Mosala..."

ssh $VPS_HOST << EOF
    cd $PROJECT_PATH
    
    if [ ! -d ".git" ]; then
        echo "📥 Clonage du repository..."
        git clone https://github.com/guetchou/projetmosala.git .
    else
        echo "🔄 Mise à jour du repository..."
        git pull origin main
    fi
    
    echo "📋 Vérification du projet..."
    ls -la
    echo "📄 Contenu du docker-compose.yml:"
    head -20 docker-compose.yml
EOF

log_success "Projet cloné avec succès"

# Configurer les variables d'environnement
log_info "⚙️ Configuration des variables d'environnement..."

ssh $VPS_HOST << EOF
    cd $PROJECT_PATH
    
    if [ ! -f ".env" ]; then
        echo "📝 Création du fichier .env..."
        cp env.example .env
        echo "✅ Fichier .env créé"
    else
        echo "📝 Fichier .env existe déjà"
    fi
    
    echo "📋 Contenu du fichier .env:"
    head -10 .env
EOF

log_success "Variables d'environnement configurées"

# Premier déploiement
log_info "🚀 Premier déploiement..."

ssh $VPS_HOST << EOF
    cd $PROJECT_PATH
    
    echo "🐳 Build des images Docker..."
    docker-compose build
    
    echo "🚀 Démarrage des services..."
    docker-compose up -d
    
    echo "⏳ Attente du démarrage..."
    sleep 30
    
    echo "📊 État des services:"
    docker-compose ps
    
    echo "📈 Logs récents:"
    docker-compose logs --tail=10
EOF

log_success "Déploiement initial terminé!"

# Afficher les informations
echo ""
log_info "🌐 Services disponibles sur $VPS_HOST:"
echo "  Frontend: http://$VPS_HOST:1199"
echo "  Backend NestJS: http://$VPS_HOST:4002"
echo "  Backend Python: http://$VPS_HOST:1188"
echo "  Strapi CMS: http://$VPS_HOST:1337"
echo ""
log_info "📋 Commandes utiles:"
echo "  Déploiement: ./scripts/deploy-vps.sh production"
echo "  Logs: ssh $VPS_HOST 'cd $PROJECT_PATH && docker-compose logs -f'"
echo "  Arrêt: ssh $VPS_HOST 'cd $PROJECT_PATH && docker-compose down'"
echo "  Health check: ./scripts/deploy-vps.sh production health"
echo ""
log_success "🎉 Initialisation du VPS terminée avec succès!"
