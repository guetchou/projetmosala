#!/bin/bash

# Correction d'urgence VPS Mosala
echo "🚨 Correction d'urgence VPS Mosala"

VPS_HOST="5.196.22.149"
VPS_USER="root"

# Test de connexion
if ! ssh -o ConnectTimeout=10 $VPS_USER@$VPS_HOST "echo 'OK'" > /dev/null 2>&1; then
    echo "❌ Impossible de se connecter au VPS"
    exit 1
fi

echo "✅ Connexion établie"

# Correction d'urgence
ssh $VPS_USER@$VPS_HOST << 'EOF'
    cd /opt/mosala
    
    echo "=== Arrêt complet ==="
    docker compose -f docker-compose-projetmosala.yml down 2>/dev/null || true
    docker stop $(docker ps -q) 2>/dev/null || true
    
    echo "=== Nettoyage ==="
    docker system prune -f
    
    echo "=== Correction du docker-compose ==="
    # Créer un docker-compose simplifié
    cat > docker-compose-simple.yml << 'COMPOSE'
version: '3.8'

services:
  frontend:
    image: galoycg/mosala-frontend:latest
    container_name: mosala-frontend
    restart: unless-stopped
    ports:
      - "3000:80"
    environment:
      - VITE_API_URL=https://api.projetmosala.org
    networks:
      - mosala-network

  mosala-api:
    image: mosala-api:latest
    container_name: mosala-api
    restart: unless-stopped
    ports:
      - "1188:1188"
    environment:
      - DATABASE_URL=mysql+aiomysql://mosala:mosala@db:3306/mosala
    depends_on:
      - db
    networks:
      - mosala-network

  db:
    image: mysql:8.0
    container_name: mosala-db
    restart: unless-stopped
    environment:
      MYSQL_DATABASE: mosala
      MYSQL_USER: mosala
      MYSQL_PASSWORD: mosala
      MYSQL_ROOT_PASSWORD: root
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - mosala-network

  traefik:
    image: traefik:v2.10
    container_name: mosala-traefik
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./traefik-projetmosala.yml:/etc/traefik/traefik.yml:ro
    command:
      - "--configFile=/etc/traefik/traefik.yml"
    networks:
      - mosala-network
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.frontend.rule=Host(`projetmosala.org`)"
      - "traefik.http.routers.frontend.service=frontend@docker"
      - "traefik.http.routers.frontend.tls=true"
      - "traefik.http.routers.frontend.tls.certresolver=letsencrypt"
      - "traefik.http.routers.api.rule=Host(`api.projetmosala.org`)"
      - "traefik.http.routers.api.service=api@docker"
      - "traefik.http.routers.api.tls=true"
      - "traefik.http.routers.api.tls.certresolver=letsencrypt"

volumes:
  db_data:

networks:
  mosala-network:
    driver: bridge
COMPOSE
    
    echo "=== Démarrage avec configuration simplifiée ==="
    docker compose -f docker-compose-simple.yml up -d
    
    echo "=== Attente du démarrage ==="
    sleep 20
    
    echo "=== Test des services ==="
    echo "Frontend local:"
    curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:3000 || echo "Frontend inaccessible"
    
    echo "API local:"
    curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:1188 || echo "API inaccessible"
    
    echo "API docs:"
    curl -s http://localhost:1188/docs | head -3 || echo "API docs inaccessible"
    
    echo "=== État des conteneurs ==="
    docker compose -f docker-compose-simple.yml ps
    
    echo "=== Test des domaines ==="
    echo "Test HTTP (devrait rediriger vers HTTPS):"
    curl -s -o /dev/null -w "Status: %{http_code}\n" http://projetmosala.org || echo "Site inaccessible"
EOF

echo "✅ Correction d'urgence appliquée"
