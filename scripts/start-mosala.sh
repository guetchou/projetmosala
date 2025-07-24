#!/bin/bash

# Script de lancement Mosala Job Hub avec ports personnalisés
# Basé sur la configuration docker-compose.yml

echo "🚀 Démarrage de Mosala Job Hub avec ports personnalisés..."
echo ""

# Couleurs pour l'affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration des ports
FRONTEND_PORT=1199
BACKEND_PORT=4002
API_PORT=1188
MYSQL_PORT=3326
POSTGRES_PORT=5433

echo -e "${BLUE}📋 Configuration des ports :${NC}"
echo -e "  Frontend (React) : ${GREEN}http://localhost:$FRONTEND_PORT${NC}"
echo -e "  Backend NestJS   : ${GREEN}http://localhost:$BACKEND_PORT${NC}"
echo -e "  API FastAPI      : ${GREEN}http://localhost:$API_PORT${NC}"
echo -e "  MySQL            : ${GREEN}localhost:$MYSQL_PORT${NC}"
echo -e "  PostgreSQL       : ${GREEN}localhost:$POSTGRES_PORT${NC}"
echo ""

# Vérifier si les ports sont disponibles
check_port() {
    local port=$1
    local service=$2
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${YELLOW}⚠️  Port $port déjà utilisé par $service${NC}"
        return 1
    else
        echo -e "${GREEN}✅ Port $port disponible pour $service${NC}"
        return 0
    fi
}

echo -e "${BLUE}🔍 Vérification des ports...${NC}"
check_port $FRONTEND_PORT "Frontend"
check_port $BACKEND_PORT "Backend NestJS"
check_port $API_PORT "API FastAPI"
echo ""

# Fonction pour démarrer le frontend
start_frontend() {
    echo -e "${BLUE}🎨 Démarrage du Frontend (React + Vite)...${NC}"
    cd frontend
    echo -e "  Port: ${GREEN}$FRONTEND_PORT${NC}"
    echo -e "  URL: ${GREEN}http://localhost:$FRONTEND_PORT${NC}"
    echo ""
    npm run dev &
    FRONTEND_PID=$!
    echo -e "${GREEN}✅ Frontend démarré (PID: $FRONTEND_PID)${NC}"
    cd ..
}

# Fonction pour démarrer le backend NestJS
start_backend() {
    echo -e "${BLUE}⚙️  Démarrage du Backend NestJS...${NC}"
    cd backend
    echo -e "  Port: ${GREEN}$BACKEND_PORT${NC}"
    echo -e "  API: ${GREEN}http://localhost:$BACKEND_PORT/mosala-api${NC}"
    echo -e "  Docs: ${GREEN}http://localhost:$BACKEND_PORT/mosala-api/docs${NC}"
    echo ""
    npm run start:dev &
    BACKEND_PID=$!
    echo -e "${GREEN}✅ Backend NestJS démarré (PID: $BACKEND_PID)${NC}"
    cd ..
}

# Fonction pour démarrer l'API FastAPI
start_api() {
    echo -e "${BLUE}🐍 Démarrage de l'API FastAPI...${NC}"
    cd mosala-api
    echo -e "  Port: ${GREEN}$API_PORT${NC}"
    echo -e "  URL: ${GREEN}http://localhost:$API_PORT${NC}"
    echo ""
    uvicorn app.main:app --host 0.0.0.0 --port $API_PORT --reload &
    API_PID=$!
    echo -e "${GREEN}✅ API FastAPI démarrée (PID: $API_PID)${NC}"
    cd ..
}

# Fonction pour démarrer les bases de données
start_databases() {
    echo -e "${BLUE}🗄️  Démarrage des bases de données...${NC}"
    echo -e "  MySQL: ${GREEN}localhost:$MYSQL_PORT${NC}"
    echo -e "  PostgreSQL: ${GREEN}localhost:$POSTGRES_PORT${NC}"
    echo ""
    
    # Démarrer MySQL
    docker run -d \
        --name mosala-mysql \
        -e MYSQL_DATABASE=mosala \
        -e MYSQL_USER=mosala \
        -e MYSQL_PASSWORD=mosala \
        -e MYSQL_ROOT_PASSWORD=root \
        -p $MYSQL_PORT:3306 \
        mysql:8.0 > /dev/null 2>&1
    
    # Démarrer PostgreSQL
    docker run -d \
        --name mosala-postgres \
        -e POSTGRES_USER=postgres \
        -e POSTGRES_PASSWORD=postgres \
        -e POSTGRES_DB=mosala \
        -p $POSTGRES_PORT:5432 \
        postgres:15 > /dev/null 2>&1
    
    echo -e "${GREEN}✅ Bases de données démarrées${NC}"
}

# Fonction pour afficher les URLs
show_urls() {
    echo ""
    echo -e "${BLUE}🌐 URLs d'accès :${NC}"
    echo -e "  ${GREEN}Frontend (Application principale)${NC}"
    echo -e "    → ${YELLOW}http://localhost:$FRONTEND_PORT${NC}"
    echo ""
    echo -e "  ${GREEN}Backend NestJS (API + Documentation)${NC}"
    echo -e "    → API: ${YELLOW}http://localhost:$BACKEND_PORT/mosala-api${NC}"
    echo -e "    → Docs: ${YELLOW}http://localhost:$BACKEND_PORT/mosala-api/docs${NC}"
    echo ""
    echo -e "  ${GREEN}API FastAPI${NC}"
    echo -e "    → ${YELLOW}http://localhost:$API_PORT${NC}"
    echo ""
    echo -e "  ${GREEN}Bases de données${NC}"
    echo -e "    → MySQL: ${YELLOW}localhost:$MYSQL_PORT${NC}"
    echo -e "    → PostgreSQL: ${YELLOW}localhost:$POSTGRES_PORT${NC}"
    echo ""
}

# Fonction pour arrêter tous les services
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Arrêt des services...${NC}"
    
    # Arrêter les processus Node.js
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
        echo -e "${GREEN}✅ Frontend arrêté${NC}"
    fi
    
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
        echo -e "${GREEN}✅ Backend NestJS arrêté${NC}"
    fi
    
    if [ ! -z "$API_PID" ]; then
        kill $API_PID 2>/dev/null
        echo -e "${GREEN}✅ API FastAPI arrêtée${NC}"
    fi
    
    # Arrêter les conteneurs Docker
    docker stop mosala-mysql mosala-postgres 2>/dev/null
    docker rm mosala-mysql mosala-postgres 2>/dev/null
    echo -e "${GREEN}✅ Bases de données arrêtées${NC}"
    
    echo -e "${GREEN}🎉 Tous les services ont été arrêtés${NC}"
    exit 0
}

# Gestionnaire de signal pour arrêter proprement
trap cleanup SIGINT SIGTERM

# Menu principal
echo -e "${BLUE}🎯 Que souhaitez-vous démarrer ?${NC}"
echo "1) Frontend uniquement"
echo "2) Backend NestJS uniquement"
echo "3) API FastAPI uniquement"
echo "4) Bases de données uniquement"
echo "5) Tout démarrer (recommandé)"
echo "6) Arrêter tous les services"
echo ""

read -p "Votre choix (1-6) : " choice

case $choice in
    1)
        start_frontend
        show_urls
        ;;
    2)
        start_backend
        show_urls
        ;;
    3)
        start_api
        show_urls
        ;;
    4)
        start_databases
        show_urls
        ;;
    5)
        echo -e "${BLUE}🚀 Démarrage complet de Mosala Job Hub...${NC}"
        echo ""
        start_databases
        sleep 5
        start_backend
        sleep 3
        start_api
        sleep 3
        start_frontend
        show_urls
        ;;
    6)
        cleanup
        ;;
    *)
        echo -e "${YELLOW}❌ Choix invalide${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}🎉 Mosala Job Hub est prêt !${NC}"
echo -e "${YELLOW}Appuyez sur Ctrl+C pour arrêter tous les services${NC}"

# Attendre que l'utilisateur appuie sur Ctrl+C
wait 