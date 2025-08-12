#!/bin/bash

# Script de déploiement avec domaines personnalisés
# Usage: ./scripts/deploy-with-domains.sh [production|staging]

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
ENVIRONMENT=${1:-production}
VPS_HOST="topcenter-ovh"
PROJECT_PATH="/opt/mosala"

# Demander les domaines
echo ""
log_info "=== Configuration des Domaines ==="
read -p "Domaine principal (ex: mosala.com): " MAIN_DOMAIN
read -p "Sous-domaine API (ex: api.mosala.com): " API_DOMAIN
read -p "Sous-domaine CMS (ex: admin.mosala.com): " CMS_DOMAIN
read -p "Sous-domaine Traefik (ex: traefik.mosala.com): " TRAEFIK_DOMAIN

# Créer la configuration Traefik
log_info "📝 Création de la configuration Traefik..."

cat > traefik.yml << EOF
api:
  dashboard: true
  insecure: true

entryPoints:
  web:
    address: ":80"
    http:
      redirections:
        entrypoint:
          to: websecure
          scheme: https
  websecure:
    address: ":443"

providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false

certificatesResolvers:
  letsencrypt:
    acme:
      email: admin@${MAIN_DOMAIN}
      storage: acme.json
      httpChallenge:
        entryPoint: web
EOF

# Créer le docker-compose avec domaines
log_info "📝 Création du docker-compose avec domaines..."

cat > docker-compose-domains.yml << EOF
version: '3.8'

services:
  frontend:
    image: \${DOCKER_USERNAME:-galoycg}/mosala-frontend:latest
    container_name: mosala-frontend
    restart: unless-stopped
    networks:
      - mosala-net
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.frontend.rule=Host(\`${MAIN_DOMAIN}\`)"
      - "traefik.http.routers.frontend.entrypoints=websecure"
      - "traefik.http.routers.frontend.tls.certresolver=letsencrypt"
      - "traefik.http.services.frontend.loadbalancer.server.port=80"

  backend-nestjs:
    image: \${DOCKER_USERNAME:-galoycg}/mosala-backend:latest
    container_name: mosala-backend-nestjs
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_USER=postgres
      - DB_PASS=postgres
      - DB_NAME=mosala
      - JWT_SECRET=\${JWT_SECRET:-your-super-secret-jwt-key}
      - PORT=4002
    depends_on:
      - postgres
    networks:
      - mosala-net
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.api.rule=Host(\`${API_DOMAIN}\`)"
      - "traefik.http.routers.api.entrypoints=websecure"
      - "traefik.http.routers.api.tls.certresolver=letsencrypt"
      - "traefik.http.services.api.loadbalancer.server.port=4002"

  strapi:
    image: node:20-alpine
    container_name: mosala-strapi
    restart: unless-stopped
    working_dir: /app
    volumes:
      - strapi_data:/app
    command: sh -c "npx create-strapi-app@latest cms --quickstart --no-run --dbclient=mysql --dbhost=db --dbport=3306 --dbname=mosala --dbusername=mosala --dbpassword=mosala && cd cms && npm run develop"
    environment:
      - NODE_ENV=development
      - DATABASE_CLIENT=mysql
      - DATABASE_HOST=db
      - DATABASE_PORT=3306
      - DATABASE_NAME=mosala
      - DATABASE_USERNAME=mosala
      - DATABASE_PASSWORD=mosala
    depends_on:
      - db
    networks:
      - mosala-net
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.cms.rule=Host(\`${CMS_DOMAIN}\`)"
      - "traefik.http.routers.cms.entrypoints=websecure"
      - "traefik.http.routers.cms.tls.certresolver=letsencrypt"
      - "traefik.http.services.cms.loadbalancer.server.port=1337"

  db:
    image: mysql:8.0
    container_name: mosala-db
    restart: unless-stopped
    environment:
      MYSQL_DATABASE: mosala
      MYSQL_USER: mosala
      MYSQL_PASSWORD: mosala
      MYSQL_ROOT_PASSWORD: \${MYSQL_ROOT_PASSWORD:-root}
    volumes:
      - db_data:/var/lib/mysql
      - ./backup:/backup
    networks:
      - mosala-net
    command: --default-authentication-plugin=mysql_native_password

  postgres:
    image: postgres:15
    container_name: mosala-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: mosala
    volumes:
      - pg_data:/var/lib/postgresql/data
      - ./backup:/backup
    networks:
      - mosala-net

  traefik:
    image: traefik:v2.10
    container_name: mosala-traefik
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./traefik.yml:/etc/traefik/traefik.yml:ro
      - ./acme.json:/acme.json
    networks:
      - mosala-net
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.traefik.rule=Host(\`${TRAEFIK_DOMAIN}\`)"
      - "traefik.http.routers.traefik.service=api@internal"
      - "traefik.http.routers.traefik.entrypoints=websecure"
      - "traefik.http.routers.traefik.tls.certresolver=letsencrypt"

volumes:
  db_data:
  pg_data:
  strapi_data:

networks:
  mosala-net:
    driver: bridge
EOF

# Copier les fichiers vers le VPS
log_info "📤 Copie des fichiers vers le VPS..."

scp traefik.yml $VPS_HOST:/tmp/
scp docker-compose-domains.yml $VPS_HOST:/tmp/

# Déployer sur le VPS
log_info "🚀 Déploiement avec domaines sur le VPS..."

ssh $VPS_HOST << EOF
    cd $PROJECT_PATH
    
    # Copier les fichiers
    sudo cp /tmp/traefik.yml traefik.yml
    sudo cp /tmp/docker-compose-domains.yml docker-compose.yml
    
    # Créer le fichier acme.json pour Let's Encrypt
    sudo touch acme.json
    sudo chmod 600 acme.json
    
    # Arrêter les services existants
    sudo docker compose down 2>/dev/null || true
    
    # Démarrer les services
    echo "🐳 Démarrage des services avec domaines..."
    sudo docker compose up -d
    
    # Attendre le démarrage
    echo "⏳ Attente du démarrage..."
    sleep 60
    
    # Vérifier l'état
    echo "📊 État des services:"
    sudo docker compose ps
    
    # Nettoyer
    sudo rm /tmp/traefik.yml
    sudo rm /tmp/docker-compose-domains.yml
EOF

# Nettoyer les fichiers locaux
rm -f traefik.yml docker-compose-domains.yml

log_success "🎉 Déploiement avec domaines terminé!"

# Afficher les URLs
echo ""
log_info "🌐 Services disponibles:"
echo "  Frontend: https://${MAIN_DOMAIN}"
echo "  API: https://${API_DOMAIN}"
echo "  CMS: https://${CMS_DOMAIN}"
echo "  Traefik Dashboard: https://${TRAEFIK_DOMAIN}"
echo ""
log_info "📋 Commandes utiles:"
echo "  Logs: ssh $VPS_HOST 'cd $PROJECT_PATH && sudo docker compose logs -f'"
echo "  Arrêt: ssh $VPS_HOST 'cd $PROJECT_PATH && sudo docker compose down'"
echo "  Redémarrage: ssh $VPS_HOST 'cd $PROJECT_PATH && sudo docker compose restart'"
echo ""
log_warning "⚠️  N'oubliez pas de configurer vos DNS pour pointer vers $VPS_HOST"
