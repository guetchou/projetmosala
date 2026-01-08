#!/bin/bash

# Script de mise à jour rapide pour le site Mosala
set -e

echo "🚀 Mise à jour rapide du site Mosala..."

# Variables
VPS_HOST="5.196.22.149"
VPS_USER="root"
VPS_PATH="/opt/mosala"

# Test de connexion SSH
echo "🔍 Test de connexion SSH vers $VPS_HOST..."
ssh -i ~/.ssh/mosala_vps_key -o ConnectTimeout=10 $VPS_USER@$VPS_HOST "echo '✅ Connexion SSH établie'"

# Copier les fichiers mis à jour
echo "📤 Copie des fichiers mis à jour..."
scp -i ~/.ssh/mosala_vps_key docker-compose-projetmosala.yml $VPS_USER@$VPS_HOST:$VPS_PATH/

# Redémarrer les services
echo "🔄 Redémarrage des services..."
ssh -i ~/.ssh/mosala_vps_key $VPS_USER@$VPS_HOST "cd $VPS_PATH && docker compose -f docker-compose-projetmosala.yml down"
ssh -i ~/.ssh/mosala_vps_key $VPS_USER@$VPS_HOST "cd $VPS_PATH && docker compose -f docker-compose-projetmosala.yml up -d"

# Vérifier le statut
echo "✅ Vérification du statut des services..."
ssh -i ~/.ssh/mosala_vps_key $VPS_USER@$VPS_HOST "cd $VPS_PATH && docker compose ps"

echo "🎉 Mise à jour terminée !"
echo "🌐 Site accessible sur : https://projetmosala.org"
