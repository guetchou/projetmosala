#!/bin/bash

echo "🧪 Test de connexion API Backend"
echo "================================\n"

# Configuration
API_URL="http://localhost:3000"
ADMIN_EMAIL="admin@mosala.com"
ADMIN_PASSWORD="password123"

# Couleurs pour l'output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "📍 Cible: $API_URL"
echo "👤 Email: $ADMIN_EMAIL\n"

# Test 1: Vérifier si le backend est accessible
echo "Test 1: Vérification de l'accessibilité du backend..."
response=$(curl -s -o /dev/null -w "%{http_code}" -X GET "$API_URL/health" 2>/dev/null)

if [ "$response" == "200" ] || [ "$response" == "000" ]; then
  if [ "$response" == "000" ]; then
    echo -e "${RED}❌ Le backend n'est pas accessible${NC}"
    echo "   Assurez-vous que le backend tourne sur le port 3000"
    echo "   Commande: cd backend && npm run start\n"
    exit 1
  else
    echo -e "${GREEN}✅ Backend accessible${NC}\n"
  fi
fi

# Test 2: Tester la route de connexion superadmin
echo "Test 2: Tentative de connexion superadmin..."
response=$(curl -s -X POST "$API_URL/mosala-api/auth/superadmin/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" \
  -w "\n%{http_code}")

http_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | head -n -1)

echo "Code HTTP: $http_code"
echo "Réponse:"

if [ "$http_code" == "200" ] || [ "$http_code" == "201" ]; then
  echo -e "${GREEN}✅ Connexion réussie!${NC}"
  echo "$body" | jq '.' 2>/dev/null || echo "$body"
elif [ "$http_code" == "401" ] || [ "$http_code" == "403" ]; then
  echo -e "${YELLOW}⚠️  Authentification échouée (code $http_code)${NC}"
  echo "   Les identifiants sont incorrects ou l'utilisateur n'existe pas"
  echo "$body" | jq '.' 2>/dev/null || echo "$body"
elif [ "$http_code" == "000" ]; then
  echo -e "${RED}❌ Impossible de joindre le backend${NC}"
  echo "   Vérifiez que le backend tourne sur $API_URL"
else
  echo -e "${RED}❌ Erreur serveur (code $http_code)${NC}"
  echo "$body" | jq '.' 2>/dev/null || echo "$body"
fi

echo ""
echo "📝 Recommandations:"
echo "   1. Vérifiez que le backend est en écoute: lsof -i :3000"
echo "   2. Vérifiez les logs du backend pour plus de détails"
echo "   3. Assurez-vous que Supabase est configuré correctement"
echo "   4. Vérifiez que l'utilisateur admin existe en base de données"
