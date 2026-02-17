#!/bin/bash
# Tests API Mosala - Système d'Actualités
# Usage: bash test-news-api.sh

# Configuration
API_URL=${API_URL:-"http://localhost:4002/api"}
TOKEN=${JWT_TOKEN:-"your-jwt-token"}

# Couleurs pour output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Tests API Actualités Mosala ===${NC}\n"

# Test 1: Récupérer toutes les actualités (public)
echo -e "${YELLOW}[1] GET /news - Toutes les actualités${NC}"
curl -s -X GET "$API_URL/news" \
  -H "Content-Type: application/json" | jq '.' || echo "Erreur"
echo ""

# Test 2: Récupérer l'actualité vedette (public)
echo -e "${YELLOW}[2] GET /news/featured/latest - Actualité à la une${NC}"
curl -s -X GET "$API_URL/news/featured/latest" \
  -H "Content-Type: application/json" | jq '.' || echo "Aucune vedette"
echo ""

# Test 3: Récupérer les 3 dernières (public)
echo -e "${YELLOW}[3] GET /news/latest/3 - 3 dernières actualités${NC}"
curl -s -X GET "$API_URL/news/latest/3" \
  -H "Content-Type: application/json" | jq '.' || echo "Erreur"
echo ""

# Test 4: Créer une actualité (privé)
echo -e "${YELLOW}[4] POST /news - Créer une actualité${NC}"
curl -s -X POST "$API_URL/news" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Test Actualité",
    "description": "Ceci est une actualité de test",
    "content": "Contenu détaillé de l'"'"'actualité de test...",
    "imageUrl": "https://via.placeholder.com/1200x600",
    "link": "https://example.com/article",
    "isPublished": true,
    "isFeatured": false
  }' | jq '.'
echo ""

# Test 5: Récupérer une actualité spécifique (public)
echo -e "${YELLOW}[5] GET /news/1 - Actualité spécifique${NC}"
curl -s -X GET "$API_URL/news/1" \
  -H "Content-Type: application/json" | jq '.'
echo ""

# Test 6: Mettre à jour une actualité (privé)
echo -e "${YELLOW}[6] PATCH /news/1 - Modifier une actualité${NC}"
curl -s -X PATCH "$API_URL/news/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Titre modifié",
    "description": "Description modifiée",
    "isFeatured": true
  }' | jq '.'
echo ""

# Test 7: Mettre en vedette (privé)
echo -e "${YELLOW}[7] PATCH /news/1/set-featured - Mettre à la une${NC}"
curl -s -X PATCH "$API_URL/news/1/set-featured" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

# Test 8: Publier une actualité (privé)
echo -e "${YELLOW}[8] PATCH /news/1/publish - Publier${NC}"
curl -s -X PATCH "$API_URL/news/1/publish" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

# Test 9: Dépublier une actualité (privé)
echo -e "${YELLOW}[9] PATCH /news/1/unpublish - Dépublier${NC}"
curl -s -X PATCH "$API_URL/news/1/unpublish" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

# Test 10: Retirer de la vedette (privé)
echo -e "${YELLOW}[10] PATCH /news/1/unset-featured - Retirer de la une${NC}"
curl -s -X PATCH "$API_URL/news/1/unset-featured" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

# Test 11: Supprimer une actualité (privé)
echo -e "${YELLOW}[11] DELETE /news/1 - Supprimer${NC}"
curl -s -X DELETE "$API_URL/news/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

echo -e "${GREEN}=== Tests terminés ===${NC}"
echo ""
echo "Instructions:"
echo "1. Remplacez \$API_URL par votre URL réelle"
echo "2. Remplacez \$TOKEN par votre JWT valide"
echo "3. Installez jq si vous ne l'avez pas: brew install jq"
echo "4. Exécutez: bash test-news-api.sh"
