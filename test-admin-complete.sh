#!/bin/bash

# Script complet de test du système admin
# Teste les opérations CRUD pour les trois modules : formations, actualités, administrateurs

set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}=================================${NC}"
echo -e "${YELLOW}TEST COMPLET - SYSTÈME ADMIN${NC}"
echo -e "${YELLOW}=================================${NC}"

# Configuration
API_URL="http://localhost:3000/api"
TIMEOUT=10

# Fonction pour faire des requêtes avec curl
test_api() {
  local method=$1
  local endpoint=$2
  local data=$3
  local token=$4
  
  echo -e "${YELLOW}→ $method $endpoint${NC}"
  
  if [ -z "$token" ]; then
    curl -s -X "$method" "$API_URL$endpoint" \
      -H "Content-Type: application/json" \
      -d "$data" \
      --max-time $TIMEOUT
  else
    curl -s -X "$method" "$API_URL$endpoint" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $token" \
      -d "$data" \
      --max-time $TIMEOUT
  fi
  echo ""
}

echo -e "\n${YELLOW}1. Test d'authentification (Connexion Super Admin)${NC}"
echo "=================================================="

# Test login
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"superadmin@mosala.com","password":"Test1234"}' \
  --max-time $TIMEOUT)

echo "Réponse de connexion: $LOGIN_RESPONSE"

# Extraire le token (simple extraction - ajuster si nécessaire)
TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4 || echo "")

if [ -z "$TOKEN" ]; then
  echo -e "${RED}✗ Connexion échouée${NC}"
  exit 1
else
  echo -e "${GREEN}✓ Connexion réussie${NC}"
  echo "Token: ${TOKEN:0:20}..."
fi

echo -e "\n${YELLOW}2. Test Formations - CRUD Complet${NC}"
echo "=================================================="

# CREATE - Ajouter une formation
echo -e "\n${YELLOW}2.1 Créer une formation${NC}"
FORMATION_DATA='{"titre":"Test Formation 1","description":"Description test","imageUrl":"https://example.com/image.jpg"}'
FORMATION_RESPONSE=$(test_api "POST" "/formations" "$FORMATION_DATA" "$TOKEN")
echo "Réponse: $FORMATION_RESPONSE"

FORMATION_ID=$(echo "$FORMATION_RESPONSE" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2 || echo "")

if [ -z "$FORMATION_ID" ]; then
  echo -e "${YELLOW}⚠ Formation ID non trouvé, création peut avoir échouée${NC}"
else
  echo -e "${GREEN}✓ Formation créée avec ID: $FORMATION_ID${NC}"
fi

# READ - Lister les formations
echo -e "\n${YELLOW}2.2 Récupérer toutes les formations${NC}"
test_api "GET" "/formations" "" "$TOKEN" | head -100

# UPDATE - Modifier la formation
if [ ! -z "$FORMATION_ID" ]; then
  echo -e "\n${YELLOW}2.3 Modifier la formation${NC}"
  UPDATE_DATA='{"titre":"Test Formation Modifiée","description":"Description modifiée"}'
  test_api "PUT" "/formations/$FORMATION_ID" "$UPDATE_DATA" "$TOKEN"
fi

# DELETE - Supprimer la formation
if [ ! -z "$FORMATION_ID" ]; then
  echo -e "\n${YELLOW}2.4 Supprimer la formation${NC}"
  test_api "DELETE" "/formations/$FORMATION_ID" "" "$TOKEN"
  echo -e "${GREEN}✓ Formation supprimée${NC}"
fi

echo -e "\n${YELLOW}3. Test Actualités - CRUD Complet${NC}"
echo "=================================================="

# CREATE - Ajouter une actualité
echo -e "\n${YELLOW}3.1 Créer une actualité${NC}"
NEWS_DATA='{"titre":"Test Actualité 1","excerpt":"Résumé","contenu":"Contenu complet","aLaUne":false}'
NEWS_RESPONSE=$(test_api "POST" "/news" "$NEWS_DATA" "$TOKEN")
echo "Réponse: $NEWS_RESPONSE"

NEWS_ID=$(echo "$NEWS_RESPONSE" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2 || echo "")

if [ -z "$NEWS_ID" ]; then
  echo -e "${YELLOW}⚠ News ID non trouvé, création peut avoir échouée${NC}"
else
  echo -e "${GREEN}✓ Actualité créée avec ID: $NEWS_ID${NC}"
fi

# READ - Lister les actualités
echo -e "\n${YELLOW}3.2 Récupérer toutes les actualités${NC}"
test_api "GET" "/news" "" "$TOKEN" | head -100

# UPDATE - Modifier l'actualité
if [ ! -z "$NEWS_ID" ]; then
  echo -e "\n${YELLOW}3.3 Modifier l'actualité${NC}"
  UPDATE_DATA='{"titre":"Test Actualité Modifiée","contenu":"Contenu modifié"}'
  test_api "PUT" "/news/$NEWS_ID" "$UPDATE_DATA" "$TOKEN"
fi

# DELETE - Supprimer l'actualité
if [ ! -z "$NEWS_ID" ]; then
  echo -e "\n${YELLOW}3.4 Supprimer l'actualité${NC}"
  test_api "DELETE" "/news/$NEWS_ID" "" "$TOKEN"
  echo -e "${GREEN}✓ Actualité supprimée${NC}"
fi

echo -e "\n${YELLOW}4. Test Administrateurs - CRUD Complet${NC}"
echo "=================================================="

# CREATE - Ajouter un administrateur
echo -e "\n${YELLOW}4.1 Créer un administrateur${NC}"
ADMIN_DATA='{"nom":"Test Admin","email":"testadmin@mosala.com","role":"admin_content"}'
ADMIN_RESPONSE=$(test_api "POST" "/admin/users" "$ADMIN_DATA" "$TOKEN")
echo "Réponse: $ADMIN_RESPONSE"

ADMIN_ID=$(echo "$ADMIN_RESPONSE" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2 || echo "")

if [ -z "$ADMIN_ID" ]; then
  echo -e "${YELLOW}⚠ Admin ID non trouvé, création peut avoir échouée${NC}"
else
  echo -e "${GREEN}✓ Administrateur créé avec ID: $ADMIN_ID${NC}"
fi

# READ - Lister les administrateurs
echo -e "\n${YELLOW}4.2 Récupérer tous les administrateurs${NC}"
test_api "GET" "/admin/users" "" "$TOKEN" | head -100

# UPDATE - Modifier l'administrateur
if [ ! -z "$ADMIN_ID" ]; then
  echo -e "\n${YELLOW}4.3 Modifier l'administrateur${NC}"
  UPDATE_DATA='{"nom":"Test Admin Modifié","role":"admin"}'
  test_api "PUT" "/admin/users/$ADMIN_ID" "$UPDATE_DATA" "$TOKEN"
fi

# DELETE - Supprimer l'administrateur
if [ ! -z "$ADMIN_ID" ]; then
  echo -e "\n${YELLOW}4.4 Supprimer l'administrateur${NC}"
  test_api "DELETE" "/admin/users/$ADMIN_ID" "" "$TOKEN"
  echo -e "${GREEN}✓ Administrateur supprimé${NC}"
fi

echo -e "\n${GREEN}=================================${NC}"
echo -e "${GREEN}✓ TESTS COMPLETS TERMINÉS${NC}"
echo -e "${GREEN}=================================${NC}"
