#!/bin/sh

# Script de démarrage pour Docker
# Démarre nginx et le backend NestJS

echo "🚀 Démarrage de Mosala..."

# Démarrer le backend NestJS en arrière-plan
echo "📡 Démarrage du backend NestJS..."
cd /app/backend
node dist/main.js &
BACKEND_PID=$!

# Attendre que le backend soit prêt
echo "⏳ Attente du backend..."
sleep 5

# Démarrer nginx
echo "🌐 Démarrage de nginx..."
nginx -g "daemon off;" &
NGINX_PID=$!

# Fonction de nettoyage
cleanup() {
    echo "🛑 Arrêt des services..."
    kill $BACKEND_PID
    kill $NGINX_PID
    exit 0
}

# Capturer les signaux d'arrêt
trap cleanup SIGTERM SIGINT

# Attendre que les processus se terminent
wait $BACKEND_PID $NGINX_PID
