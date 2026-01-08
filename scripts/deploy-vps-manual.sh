#!/bin/bash

# Script de déploiement manuel sur le VPS
# Utilise les images Docker Hub pré-construites

set -e

echo "🚀 Déploiement manuel sur le VPS..."

# Copier les fichiers de configuration vers le VPS
echo "📤 Copie des fichiers de configuration..."
scp docker-compose-projetmosala.yml root@topcenter-ovh:/opt/mosala/
scp traefik-projetmosala.yml root@topcenter-ovh:/opt/mosala/
scp .env-projetmosala root@topcenter-ovh:/opt/mosala/.env

# Se connecter au VPS et déployer
echo "🔧 Déploiement sur le VPS..."
ssh root@topcenter-ovh << 'EOF'
    echo "🔄 Déploiement manuel du site..."
    
    # Créer le répertoire s'il n'existe pas
    mkdir -p /opt/mosala
    cd /opt/mosala
    
    # Arrêter les services existants
    echo "🛑 Arrêt des services existants..."
    docker compose down 2>/dev/null || true
    docker compose -f docker-compose-projetmosala.yml down 2>/dev/null || true
    
    # Pull des dernières images Docker Hub
    echo "🐳 Pull des dernières images Docker Hub..."
    docker pull galoycg/mosala-frontend:latest
    docker pull galoycg/mosala-backend:latest
    docker pull galoycg/mosala-api:latest
    
    # Démarrer les services
    echo "🚀 Démarrage des services..."
    docker compose -f docker-compose-projetmosala.yml up -d
    
    # Attendre que les services démarrent
    echo "⏳ Attente du démarrage des services..."
    sleep 15
    
    # Vérification des services
    echo "📊 Statut des services:"
    docker compose -f docker-compose-projetmosala.yml ps
    
    # Nettoyage
    echo "🧹 Nettoyage des images non utilisées..."
    docker image prune -f
    
    echo "✅ Déploiement manuel terminé!"
    echo "🌐 Site principal: http://projetmosala.org"
    echo "🔧 API: http://api.projetmosala.org"
    echo "📊 Admin: http://admin.projetmosala.org"
    echo "📈 Traefik: http://traefik.projetmosala.org"
EOF

echo "✅ Déploiement manuel terminé!"
echo "🌐 Vérifiez votre site: http://projetmosala.org"
