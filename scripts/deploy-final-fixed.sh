#!/bin/bash

# Script de déploiement final amélioré pour Mosala
# Gère les permissions et les erreurs

set -e

echo "🚀 Déploiement final sur le VPS avec les images personnalisées..."

# Variables
VPS_HOST="topcenter-ovh"
VPS_USER="root"
VPS_PATH="/opt/mosala"

# Test de connexion SSH
echo "🔍 Test de connexion SSH vers $VPS_HOST..."
if ! ssh -o ConnectTimeout=10 $VPS_USER@$VPS_HOST "echo 'Connexion OK'" > /dev/null 2>&1; then
    echo "❌ Impossible de se connecter au VPS"
    exit 1
fi
echo "✅ Connexion SSH établie"

# Créer le dossier sur le VPS s'il n'existe pas
echo "📁 Vérification du dossier de déploiement..."
ssh $VPS_USER@$VPS_HOST "mkdir -p $VPS_PATH"

# Copier les fichiers vers /tmp d'abord, puis les déplacer
echo "📤 Copie des fichiers vers le VPS..."
scp docker-compose-projetmosala.yml $VPS_USER@$VPS_HOST:/tmp/
scp traefik-projetmosala.yml $VPS_USER@$VPS_HOST:/tmp/
scp .env-projetmosala $VPS_USER@$VPS_HOST:/tmp/

# Déplacer les fichiers vers le bon emplacement
echo "📂 Déplacement des fichiers..."
ssh $VPS_USER@$VPS_HOST "mv /tmp/docker-compose-projetmosala.yml $VPS_PATH/ && mv /tmp/traefik-projetmosala.yml $VPS_PATH/ && mv /tmp/.env-projetmosala $VPS_PATH/"

# Arrêter les services existants
echo "🛑 Arrêt des services existants..."
ssh $VPS_USER@$VPS_HOST "cd $VPS_PATH && docker compose -f docker-compose-projetmosala.yml down || true"

# Nettoyer les conteneurs et images
echo "🧹 Nettoyage des conteneurs et images..."
ssh $VPS_USER@$VPS_HOST "docker system prune -f || true"

# Pull des dernières images
echo "📥 Pull des dernières images Docker..."
ssh $VPS_USER@$VPS_HOST "docker pull galoycg/mosala-frontend:latest"
ssh $VPS_USER@$VPS_HOST "docker pull galoycg/mosala-backend:latest"
ssh $VPS_USER@$VPS_HOST "docker pull galoycg/mosala-api:latest"

# Démarrer les services
echo "🚀 Démarrage des services..."
ssh $VPS_USER@$VPS_HOST "cd $VPS_PATH && docker compose -f docker-compose-projetmosala.yml up -d"

# Attendre que les services démarrent
echo "⏳ Attente du démarrage des services..."
sleep 30

# Vérifier le statut des services
echo "🔍 Vérification du statut des services..."
ssh $VPS_USER@$VPS_HOST "cd $VPS_PATH && docker compose -f docker-compose-projetmosala.yml ps"

# Vérifier les logs pour détecter les erreurs
echo "📋 Vérification des logs..."
ssh $VPS_USER@$VPS_HOST "cd $VPS_PATH && docker compose -f docker-compose-projetmosala.yml logs --tail=10"

echo "✅ Déploiement terminé !"
echo "🌐 Sites disponibles :"
echo "   - Frontend: https://projetmosala.org"
echo "   - API: https://api.projetmosala.org"
echo "   - Admin: https://admin.projetmosala.org"
echo "   - Traefik: https://traefik.projetmosala.org"
