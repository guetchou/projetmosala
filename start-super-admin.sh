#!/bin/bash

# Configuration rapide du Super Admin Dashboard
# Lance tous les services nécessaires

echo "╔════════════════════════════════════════════════════════════╗"
echo "║        DÉMARRAGE - SUPER ADMIN DASHBOARD MOSALA             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
PROJECT_ROOT="/Users/francklinetoka/Documents/GitHub/projetmosala"
FRONTEND_DIR="$PROJECT_ROOT/frontend"
BACKEND_DIR="$PROJECT_ROOT/backend"

# Étape 1: Vérifier les variables d'environnement
echo -e "${BLUE}1. Vérification des variables d'environnement...${NC}"
if [ -f "$BACKEND_DIR/.env" ]; then
  if grep -q "VITE_SUPABASE_URL" "$BACKEND_DIR/.env"; then
    echo -e "${GREEN}✓ Variables Supabase trouvées${NC}"
  else
    echo "⚠️  Variables Supabase non configurées"
    echo "   Assurez-vous d'avoir configuré .env"
  fi
else
  echo "⚠️  Fichier .env non trouvé"
fi
echo ""

# Étape 2: Instancer les dépendances frontend
echo -e "${BLUE}2. Préparation du frontend...${NC}"
if [ ! -d "$FRONTEND_DIR/node_modules" ]; then
  echo "   Installation des dépendances..."
  cd "$FRONTEND_DIR" && npm install
  echo -e "${GREEN}✓ Frontend préparé${NC}"
else
  echo -e "${GREEN}✓ Frontend prêt${NC}"
fi
echo ""

# Étape 3: Résumé de démarrage
echo -e "${BLUE}3. Résumé des commandes à exécuter${NC}"
echo ""
echo "Dans un nouveau terminal 1 - Frontend:"
echo -e "${GREEN}  cd $FRONTEND_DIR${NC}"
echo -e "${GREEN}  npm run dev${NC}"
echo ""
echo "Le dashboard sera disponible à:"
echo -e "${GREEN}  http://localhost:5173/superadmin/dashboard${NC}"
echo ""
echo "Pour accéder:"
echo -e "  Email: superadmin@mosala.com${NC}"
echo -e "  (ou votre compte Supabase configuré)${NC}"
echo ""

# Étape 4: Afficher les informations utiles
echo -e "${BLUE}4. Informations utiles${NC}"
echo ""
echo "Documentation:"
echo "  - Guide utilisateur: $PROJECT_ROOT/ADMIN_SUPER_DASHBOARD_GUIDE.md"
echo "  - Implémentation: $PROJECT_ROOT/SUPER_ADMIN_IMPLEMENTATION_COMPLETE.md"
echo ""
echo "Tests:"
echo "  bash $PROJECT_ROOT/test-super-admin.sh"
echo ""
echo "Modules gérés:"
echo "  ✅ Formations (créer, modifier, supprimer)"
echo "  ✅ Actualités (créer, modifier, mettre en avant)"
echo "  ✅ Administrateurs (créer, modifier, supprimer)"
echo ""

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}Prêt à démarrer! Lancez le frontend avec:${NC}"
echo -e "${GREEN}  cd frontend && npm run dev${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""
