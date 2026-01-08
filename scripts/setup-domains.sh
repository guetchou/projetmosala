#!/bin/bash

# Script de configuration des domaines spécifiques pour Mosala
# Usage: ./scripts/setup-domains.sh

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

log_info "=== Configuration des Domaines Mosala ==="

# Configuration par défaut
DEFAULT_MAIN_DOMAIN="mosala.com"
DEFAULT_API_DOMAIN="api.mosala.com"
DEFAULT_CMS_DOMAIN="admin.mosala.com"
DEFAULT_TRAEFIK_DOMAIN="traefik.mosala.com"

echo ""
log_info "Configuration des domaines pour Mosala"
echo ""

# Demander les domaines
read -p "Domaine principal [$DEFAULT_MAIN_DOMAIN]: " MAIN_DOMAIN
MAIN_DOMAIN=${MAIN_DOMAIN:-$DEFAULT_MAIN_DOMAIN}

read -p "Sous-domaine API [$DEFAULT_API_DOMAIN]: " API_DOMAIN
API_DOMAIN=${API_DOMAIN:-$DEFAULT_API_DOMAIN}

read -p "Sous-domaine CMS [$DEFAULT_CMS_DOMAIN]: " CMS_DOMAIN
CMS_DOMAIN=${CMS_DOMAIN:-$DEFAULT_CMS_DOMAIN}

read -p "Sous-domaine Traefik [$DEFAULT_TRAEFIK_DOMAIN]: " TRAEFIK_DOMAIN
TRAEFIK_DOMAIN=${TRAEFIK_DOMAIN:-$DEFAULT_TRAEFIK_DOMAIN}

read -p "Email pour Let's Encrypt (admin@$MAIN_DOMAIN): " EMAIL
EMAIL=${EMAIL:-"admin@$MAIN_DOMAIN"}

# Afficher la configuration
echo ""
log_info "Configuration des domaines:"
echo "  🌐 Frontend: https://$MAIN_DOMAIN"
echo "  🔌 API: https://$API_DOMAIN"
echo "  📝 CMS: https://$CMS_DOMAIN"
echo "  ⚙️  Traefik: https://$TRAEFIK_DOMAIN"
echo "  📧 Email: $EMAIL"
echo ""

read -p "Confirmer cette configuration ? (y/n): " CONFIRM
if [[ $CONFIRM != "y" && $CONFIRM != "Y" ]]; then
    log_warning "Configuration annulée"
    exit 0
fi

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
      email: $EMAIL
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
      - "traefik.http.routers.frontend.rule=Host(\`$MAIN_DOMAIN\`)"
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
      - "traefik.http.routers.api.rule=Host(\`$API_DOMAIN\`)"
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
      - "traefik.http.routers.cms.rule=Host(\`$CMS_DOMAIN\`)"
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
      - "traefik.http.routers.traefik.rule=Host(\`$TRAEFIK_DOMAIN\`)"
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

# Créer le fichier .env avec les domaines
log_info "📝 Création du fichier .env..."

cat > .env.domains << EOF
# Configuration des domaines
MAIN_DOMAIN=$MAIN_DOMAIN
API_DOMAIN=$API_DOMAIN
CMS_DOMAIN=$CMS_DOMAIN
TRAEFIK_DOMAIN=$TRAEFIK_DOMAIN
EMAIL=$EMAIL

# Configuration Docker
DOCKER_USERNAME=galoycg

# Configuration des bases de données
MYSQL_ROOT_PASSWORD=root
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Configuration Frontend
VITE_API_URL=https://$API_DOMAIN
VITE_STRAPI_URL=https://$CMS_DOMAIN
VITE_APP_NAME=Mosala
VITE_APP_VERSION=1.0.0
EOF

log_success "✅ Configuration des domaines terminée!"

# Afficher les instructions
echo ""
log_info "📋 Instructions de déploiement:"
echo ""
echo "1. Configurez vos DNS pour pointer vers votre VPS:"
echo "   $MAIN_DOMAIN → Votre IP VPS"
echo "   $API_DOMAIN → Votre IP VPS"
echo "   $CMS_DOMAIN → Votre IP VPS"
echo "   $TRAEFIK_DOMAIN → Votre IP VPS"
echo ""
echo "2. Déployez avec les domaines:"
echo "   ./scripts/deploy-with-domains.sh production"
echo ""
echo "3. Ou copiez les fichiers manuellement:"
echo "   scp traefik.yml docker-compose-domains.yml .env.domains topcenter-ovh:/opt/mosala/"
echo ""
echo "4. Lancez le déploiement:"
echo "   ssh topcenter-ovh 'cd /opt/mosala && sudo docker compose -f docker-compose-domains.yml up -d'"
echo ""

log_info "🌐 URLs finales:"
echo "  Frontend: https://$MAIN_DOMAIN"
echo "  API: https://$API_DOMAIN"
echo "  CMS: https://$CMS_DOMAIN"
echo "  Traefik Dashboard: https://$TRAEFIK_DOMAIN"
echo ""

log_warning "⚠️  N'oubliez pas de configurer vos DNS avant de déployer!"
