#!/bin/bash

# Script de test complet du Super Admin Dashboard
# Teste les trois modules: Formations, Actualités, Administrateurs

echo "╔════════════════════════════════════════════════════════════╗"
echo "║    TEST COMPLET - SUPER ADMIN DASHBOARD MOSALA             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
API_URL="${VITE_API_URL:-http://localhost:3000}"
SUPABASE_URL="${VITE_SUPABASE_URL}"
SUPABASE_KEY="${VITE_SUPABASE_ANON_KEY}"

# Compteurs
TESTS_PASSED=0
TESTS_FAILED=0

# Fonction pour afficher les résultats
test_result() {
  local test_name="$1"
  local status="$2"
  
  if [ "$status" == "pass" ]; then
    echo -e "${GREEN}✓ PASS${NC} - $test_name"
    ((TESTS_PASSED++))
  else
    echo -e "${RED}✗ FAIL${NC} - $test_name"
    ((TESTS_FAILED++))
  fi
}

# Test 1: Vérifier les variables d'environnement
echo -e "${BLUE}1. Vérification des variables d'environnement${NC}"
if [ -n "$SUPABASE_URL" ] && [ -n "$SUPABASE_KEY" ]; then
  test_result "Variables Supabase configurées" "pass"
else
  test_result "Variables Supabase configurées" "fail"
fi
echo ""

# Test 2: Vérifier la connexion à Supabase
echo -e "${BLUE}2. Vérification de la connexion Supabase${NC}"
if curl -s -H "apikey: $SUPABASE_KEY" "$SUPABASE_URL/rest/v1/formations_advanced?limit=1" > /dev/null 2>&1; then
  test_result "Connexion à formations_advanced" "pass"
else
  test_result "Connexion à formations_advanced" "fail"
fi

if curl -s -H "apikey: $SUPABASE_KEY" "$SUPABASE_URL/rest/v1/news?limit=1" > /dev/null 2>&1; then
  test_result "Connexion à news" "pass"
else
  test_result "Connexion à news" "fail"
fi

if curl -s -H "apikey: $SUPABASE_KEY" "$SUPABASE_URL/rest/v1/users?limit=1" > /dev/null 2>&1; then
  test_result "Connexion à users" "pass"
else
  test_result "Connexion à users" "fail"
fi
echo ""

# Test 3: Récupérer les formations
echo -e "${BLUE}3. Test API - Formations${NC}"
FORMATIONS=$(curl -s -H "apikey: $SUPABASE_KEY" "$SUPABASE_URL/rest/v1/formations_advanced?select=id,title,description" 2>/dev/null)
if echo "$FORMATIONS" | grep -q "title"; then
  FORMATIONS_COUNT=$(echo "$FORMATIONS" | grep -o "title" | wc -l)
  test_result "Récupérer formations (trouvées: $FORMATIONS_COUNT)" "pass"
else
  test_result "Récupérer formations" "fail"
fi
echo ""

# Test 4: Récupérer les actualités
echo -e "${BLUE}4. Test API - Actualités${NC}"
NEWS=$(curl -s -H "apikey: $SUPABASE_KEY" "$SUPABASE_URL/rest/v1/news?select=id,title,is_featured" 2>/dev/null)
if echo "$NEWS" | grep -q "title"; then
  NEWS_COUNT=$(echo "$NEWS" | grep -o "title" | wc -l)
  test_result "Récupérer actualités (trouvées: $NEWS_COUNT)" "pass"
else
  test_result "Récupérer actualités" "fail"
fi
echo ""

# Test 5: Récupérer les administrateurs
echo -e "${BLUE}5. Test API - Administrateurs${NC}"
ADMINS=$(curl -s -H "apikey: $SUPABASE_KEY" "$SUPABASE_URL/rest/v1/users?select=id,name,email,role&is_active=eq.true" 2>/dev/null)
if echo "$ADMINS" | grep -q "name"; then
  ADMINS_COUNT=$(echo "$ADMINS" | grep -o "name" | wc -l)
  test_result "Récupérer administrateurs (trouvés: $ADMINS_COUNT)" "pass"
else
  test_result "Récupérer administrateurs" "fail"
fi
echo ""

# Test 6: Vérifier les fichiers composants
echo -e "${BLUE}6. Vérification des fichiers composants${NC}"
COMPONENTS=(
  "frontend/src/pages/admin/components/FormationsSection.tsx"
  "frontend/src/pages/admin/components/ActualitesSection.tsx"
  "frontend/src/pages/admin/components/AdministrateursSection.tsx"
  "frontend/src/pages/admin/components/FormationForm.tsx"
  "frontend/src/pages/admin/components/ActualiteForm.tsx"
  "frontend/src/pages/admin/components/AdminForm.tsx"
  "frontend/src/pages/admin/components/AdminTable.tsx"
  "frontend/src/pages/admin/components/DashboardSection.tsx"
)

for component in "${COMPONENTS[@]}"; do
  if [ -f "$component" ]; then
    test_result "Fichier $component existe" "pass"
  else
    test_result "Fichier $component existe" "fail"
  fi
done
echo ""

# Test 7: Vérifier les APIs
echo -e "${BLUE}7. Vérification des fichiers API${NC}"
APIS=(
  "frontend/src/api/formations.ts"
  "frontend/src/api/actualites.ts"
  "frontend/src/api/admins.ts"
)

for api in "${APIS[@]}"; do
  if [ -f "$api" ]; then
    test_result "Fichier $api existe" "pass"
  else
    test_result "Fichier $api existe" "fail"
  fi
done
echo ""

# Résumé
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                     RÉSUMÉ DES TESTS                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}Tests réussis: $TESTS_PASSED${NC}"
echo -e "${RED}Tests échoués: $TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
  echo -e "${GREEN}✓ TOUS LES TESTS SONT PASSÉS!${NC}"
  echo ""
  echo "Prochaines étapes:"
  echo "1. Lancez le frontend:   cd frontend && npm run dev"
  echo "2. Accédez au dashboard: http://localhost:5173/superadmin/dashboard"
  echo "3. Connectez-vous avec vos identifiants superadmin"
  exit 0
else
  echo -e "${RED}✗ CERTAINS TESTS ONT ÉCHOUÉ${NC}"
  echo ""
  echo "Veuillez vérifier:"
  echo "1. Les variables d'environnement sont configurées"
  echo "2. Supabase est accessible"
  echo "3. Les tables existent dans la base de données"
  exit 1
fi
