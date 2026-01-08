#!/bin/bash

# Script de déploiement rapide Mosala
# Usage: ./scripts/quick-deploy.sh

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
PROJECT_PATH="/opt/mosala"

log_info "=== Déploiement Rapide Mosala ==="

# Vérifier la connexion SSH
log_info "Test de connexion SSH vers $VPS_HOST..."
if ! ssh -o ConnectTimeout=10 -o BatchMode=yes $VPS_HOST "echo 'Connexion OK'" 2>/dev/null; then
    log_error "Impossible de se connecter à $VPS_HOST"
    exit 1
fi

log_success "Connexion SSH établie"

# Créer un docker-compose.yml simplifié
log_info "📝 Création du docker-compose.yml simplifié..."

cat > docker-compose-simple.yml << 'EOF'
version: '3.8'

services:
  frontend:
    image: nginx:alpine
    container_name: mosala-frontend
    ports:
      - "1199:80"
    volumes:
      - ./nginx-frontend.conf:/etc/nginx/conf.d/default.conf
    networks:
      - mosala-net

  backend-nestjs:
    image: node:18-alpine
    container_name: mosala-backend-nestjs
    working_dir: /app
    command: sh -c "npm install -g @nestjs/cli && nest new backend --skip-git --package-manager npm && cd backend && npm install && npm run start:dev"
    ports:
      - "4002:3000"
    environment:
      - NODE_ENV=development
    networks:
      - mosala-net

  strapi:
    image: node:20-alpine
    container_name: mosala-strapi
    working_dir: /app
    command: sh -c "npx create-strapi-app@latest cms --quickstart --no-run && cd cms && npm run develop"
    ports:
      - "1337:1337"
    environment:
      - NODE_ENV=development
    networks:
      - mosala-net

  db:
    image: mysql:8.0
    container_name: mosala-db
    restart: always
    environment:
      MYSQL_DATABASE: mosala
      MYSQL_USER: mosala
      MYSQL_PASSWORD: mosala
      MYSQL_ROOT_PASSWORD: root
    ports:
      - "3326:3306"
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - mosala-net

  postgres:
    image: postgres:15
    container_name: mosala-postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: mosala
    ports:
      - "5433:5432"
    volumes:
      - pg_data:/var/lib/postgresql/data
    networks:
      - mosala-net

volumes:
  db_data:
  pg_data:

networks:
  mosala-net:
    driver: bridge
EOF

# Créer la configuration nginx pour le frontend
cat > nginx-frontend.conf << 'EOF'
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend-nestjs:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /strapi {
        proxy_pass http://strapi:1337;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
EOF

# Créer une page HTML simple pour le frontend
mkdir -p frontend-simple
cat > frontend-simple/index.html << 'EOF'
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mosala - Plateforme</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        h1 {
            font-size: 3em;
            margin-bottom: 20px;
        }
        .status {
            background: rgba(255,255,255,0.1);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
        .services {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        .service {
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 8px;
        }
        .service h3 {
            margin: 0 0 10px 0;
        }
        .service a {
            color: #fff;
            text-decoration: none;
        }
        .service a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Mosala</h1>
        <div class="status">
            <h2>Plateforme de Développement</h2>
            <p>Bienvenue sur la plateforme Mosala en cours de développement</p>
        </div>
        
        <div class="services">
            <div class="service">
                <h3>Frontend</h3>
                <p>Application React</p>
                <a href="/">Accéder</a>
            </div>
            <div class="service">
                <h3>Backend NestJS</h3>
                <p>API REST</p>
                <a href="/api">API</a>
            </div>
            <div class="service">
                <h3>Strapi CMS</h3>
                <p>Gestion de contenu</p>
                <a href="/strapi">Admin</a>
            </div>
            <div class="service">
                <h3>Base de données</h3>
                <p>MySQL & PostgreSQL</p>
                <p>Ports: 3326, 5433</p>
            </div>
        </div>
    </div>
</body>
</html>
EOF

# Copier les fichiers vers le VPS
log_info "📤 Copie des fichiers vers le VPS..."

scp docker-compose-simple.yml $VPS_HOST:/tmp/
scp nginx-frontend.conf $VPS_HOST:/tmp/
scp -r frontend-simple $VPS_HOST:/tmp/

# Déployer sur le VPS
log_info "🚀 Déploiement sur le VPS..."

ssh $VPS_HOST << EOF
    cd $PROJECT_PATH
    
    # Copier les fichiers
    sudo cp /tmp/docker-compose-simple.yml docker-compose.yml
    sudo cp /tmp/nginx-frontend.conf nginx-frontend.conf
    sudo cp -r /tmp/frontend-simple/* /tmp/frontend-simple/
    
    # Créer le volume pour nginx
    sudo mkdir -p /opt/mosala-frontend
    sudo cp -r /tmp/frontend-simple/* /opt/mosala-frontend/
    
    # Modifier docker-compose pour utiliser le volume local
    sudo sed -i 's|./nginx-frontend.conf|/opt/mosala/nginx-frontend.conf|g' docker-compose.yml
    sudo sed -i 's|image: nginx:alpine|image: nginx:alpine\n    volumes:\n      - /opt/mosala-frontend:/usr/share/nginx/html|g' docker-compose.yml
    
    # Arrêter les services existants
    sudo docker compose down 2>/dev/null || true
    
    # Démarrer les services
    echo "🐳 Démarrage des services..."
    sudo docker compose up -d
    
    # Attendre le démarrage
    echo "⏳ Attente du démarrage..."
    sleep 30
    
    # Vérifier l'état
    echo "📊 État des services:"
    sudo docker compose ps
    
    # Nettoyer
    sudo rm -rf /tmp/frontend-simple
    sudo rm /tmp/docker-compose-simple.yml
    sudo rm /tmp/nginx-frontend.conf
EOF

# Nettoyer les fichiers locaux
rm -f docker-compose-simple.yml nginx-frontend.conf
rm -rf frontend-simple

log_success "🎉 Déploiement rapide terminé!"

# Afficher les URLs
echo ""
log_info "🌐 Services disponibles sur $VPS_HOST:"
echo "  Frontend: http://$VPS_HOST:1199"
echo "  Backend NestJS: http://$VPS_HOST:4002"
echo "  Strapi CMS: http://$VPS_HOST:1337"
echo "  MySQL: localhost:3326"
echo "  PostgreSQL: localhost:5433"
echo ""
log_info "📋 Commandes utiles:"
echo "  Logs: ssh $VPS_HOST 'cd $PROJECT_PATH && sudo docker compose logs -f'"
echo "  Arrêt: ssh $VPS_HOST 'cd $PROJECT_PATH && sudo docker compose down'"
echo "  Redémarrage: ssh $VPS_HOST 'cd $PROJECT_PATH && sudo docker compose restart'"
