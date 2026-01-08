#!/bin/bash

# Script de déploiement final avec les images Docker personnalisées
# À utiliser une fois que les images sont construites par GitHub Actions

set -e

echo "🚀 Déploiement final sur le VPS avec les images personnalisées..."

# Copier les fichiers de configuration vers le VPS
echo "📤 Copie des fichiers vers le VPS..."
scp docker-compose-projetmosala.yml almalinux@topcenter-ovh:/opt/mosala/
scp traefik-projetmosala.yml almalinux@topcenter-ovh:/opt/mosala/
scp .env-projetmosala almalinux@topcenter-ovh:/opt/mosala/.env

# Se connecter au VPS et déployer
echo "🔧 Déploiement sur le VPS..."
ssh almalinux@topcenter-ovh << 'EOF'
    cd /opt/mosala
    
    echo "🛑 Arrêt des services existants..."
    docker compose down 2>/dev/null || true
    docker compose -f docker-compose-projetmosala.yml down 2>/dev/null || true
    
    echo "🐳 Pull des dernières images Docker..."
    docker compose -f docker-compose-projetmosala.yml pull
    
    echo "🚀 Démarrage des services avec domaines projetmosala.org..."
    docker compose -f docker-compose-projetmosala.yml up -d
    
    echo "⏳ Attente du démarrage..."
    sleep 15
    
    echo "📊 Statut des services:"
    docker compose -f docker-compose-projetmosala.yml ps
    
    echo "🔍 Vérification des services:"
    echo "Frontend: http://projetmosala.org"
    echo "API: http://api.projetmosala.org"
    echo "Admin: http://admin.projetmosala.org"
    echo "Traefik Dashboard: http://traefik.projetmosala.org"
    
    echo "🧹 Nettoyage des images non utilisées..."
    docker image prune -f
EOF

echo "✅ Déploiement final terminé!"
echo "🌐 Site principal: http://projetmosala.org"
echo "🔧 API: http://api.projetmosala.org"
echo "📊 Admin: http://admin.projetmosala.org"
echo "📈 Traefik: http://traefik.projetmosala.org"
