#!/bin/bash

# Correction rapide VPS - Solution simple
echo "🔧 Correction rapide VPS Mosala"

VPS_HOST="5.196.22.149"
VPS_USER="root"

# Test de connexion
if ! ssh -o ConnectTimeout=10 $VPS_USER@$VPS_HOST "echo 'OK'" > /dev/null 2>&1; then
    echo "❌ Impossible de se connecter au VPS"
    exit 1
fi

echo "✅ Connexion établie"

# Correction directe
ssh $VPS_USER@$VPS_HOST << 'EOF'
    cd /opt/mosala
    
    echo "=== Arrêt des services ==="
    docker compose -f docker-compose-projetmosala.yml down
    
    echo "=== Correction de la configuration Traefik ==="
    cat > traefik-projetmosala.yml << 'TRAEFIK'
api:
  dashboard: true
  insecure: true

entryPoints:
  web:
    address: ":80"
  websecure:
    address: ":443"

providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false

certificatesResolvers:
  letsencrypt:
    acme:
      email: admin@projetmosala.org
      storage: acme.json
      httpChallenge:
        entryPoint: web
TRAEFIK
    
    echo "=== Redémarrage des services ==="
    docker compose -f docker-compose-projetmosala.yml up -d
    
    echo "=== Attente du démarrage ==="
    sleep 10
    
    echo "=== Test des services ==="
    echo "Frontend local:"
    curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:3000 || echo "Frontend inaccessible"
    
    echo "API local:"
    curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:1188 || echo "API inaccessible"
    
    echo "=== État des conteneurs ==="
    docker compose -f docker-compose-projetmosala.yml ps
EOF

echo "✅ Correction appliquée"
