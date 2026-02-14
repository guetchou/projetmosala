#!/bin/bash

# Script de Test Rapide - Restructuration Formations & Actualités
# Usage: bash quick-test-restructuring.sh

echo "🧪 Test Rapide de la Restructuration"
echo "===================================="
echo ""

# Vérifier les fichiers modifiés
echo "📋 Vérification des fichiers modifiés..."
echo ""

FILES=(
  "frontend/src/api/formations.ts"
  "frontend/src/api/actualites.ts"
  "frontend/src/pages/admin/components/FormationForm.tsx"
  "frontend/src/pages/admin/components/FormationCard.tsx"
  "frontend/src/pages/admin/components/ActualiteForm.tsx"
  "frontend/src/pages/admin/components/ActualiteCard.tsx"
  "frontend/src/pages/admin/components/FormationsSection.tsx"
  "frontend/src/pages/admin/components/ActualitesSection.tsx"
  "migrations/20260211_update_formations_news.sql"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ $file - MANQUANT"
  fi
done

echo ""
echo "📄 Vérification des guides créés..."
echo ""

DOCS=(
  "MIGRATION_EXECUTION_GUIDE.md"
  "RESTRUCTURING_SUMMARY.md"
)

for doc in "${DOCS[@]}"; do
  if [ -f "$doc" ]; then
    echo "✅ $doc"
  else
    echo "❌ $doc - MANQUANT"
  fi
done

echo ""
echo "🔍 Vérification des champs dans les fichiers..."
echo ""

# Vérifier imageUrl dans formations.ts
if grep -q "imageUrl" frontend/src/api/formations.ts; then
  echo "✅ formations.ts contient imageUrl"
else
  echo "❌ formations.ts ne contient pas imageUrl"
fi

# Vérifier date dans formations.ts
if grep -q "date" frontend/src/api/formations.ts; then
  echo "✅ formations.ts contient date"
else
  echo "❌ formations.ts ne contient pas date"
fi

# Vérifier imageUrl dans actualites.ts
if grep -q "imageUrl" frontend/src/api/actualites.ts; then
  echo "✅ actualites.ts contient imageUrl"
else
  echo "❌ actualites.ts ne contient pas imageUrl"
fi

# Vérifier lien dans actualites.ts
if grep -q "lien" frontend/src/api/actualites.ts; then
  echo "✅ actualites.ts contient lien"
else
  echo "❌ actualites.ts ne contient pas lien"
fi

# Vérifier suppression de "Niveau" dans FormationForm
if ! grep -q "Niveau" frontend/src/pages/admin/components/FormationForm.tsx; then
  echo "✅ FormationForm.tsx n'a plus de champ Niveau"
else
  echo "❌ FormationForm.tsx contient encore le champ Niveau"
fi

# Vérifier ajout de date dans FormationForm
if grep -q "type=\"date\"" frontend/src/pages/admin/components/FormationForm.tsx; then
  echo "✅ FormationForm.tsx a un date picker"
else
  echo "❌ FormationForm.tsx n'a pas de date picker"
fi

# Vérifier ajout de lien dans ActualiteForm
if grep -q "name=\"lien\"" frontend/src/pages/admin/components/ActualiteForm.tsx; then
  echo "✅ ActualiteForm.tsx a un champ lien"
else
  echo "❌ ActualiteForm.tsx n'a pas de champ lien"
fi

# Vérifier image dans FormationCard
if grep -q "imageUrl" frontend/src/pages/admin/components/FormationCard.tsx; then
  echo "✅ FormationCard.tsx affiche les images"
else
  echo "❌ FormationCard.tsx n'affiche pas les images"
fi

# Vérifier image dans ActualiteCard
if grep -q "imageUrl" frontend/src/pages/admin/components/ActualiteCard.tsx; then
  echo "✅ ActualiteCard.tsx affiche les images"
else
  echo "❌ ActualiteCard.tsx n'affiche pas les images"
fi

# Vérifier lien externe dans ActualiteCard
if grep -q "ExternalLink" frontend/src/pages/admin/components/ActualiteCard.tsx; then
  echo "✅ ActualiteCard.tsx a un bouton lien externe"
else
  echo "❌ ActualiteCard.tsx n'a pas de bouton lien externe"
fi

echo ""
echo "📊 Résumé de la Migration SQL..."
echo ""

if [ -f "migrations/20260211_update_formations_news.sql" ]; then
  echo "Migration SQL créée ✅"
  
  # Vérifier les changements majeurs
  if grep -q "DROP COLUMN.*level" migrations/20260211_update_formations_news.sql; then
    echo "  ✅ Suppression de la colonne level"
  fi
  
  if grep -q "ADD COLUMN.*image_url" migrations/20260211_update_formations_news.sql; then
    echo "  ✅ Ajout de image_url"
  fi
  
  if grep -q "ADD COLUMN.*published_date" migrations/20260211_update_formations_news.sql; then
    echo "  ✅ Ajout de published_date"
  fi
  
  if grep -q "ADD COLUMN.*link" migrations/20260211_update_formations_news.sql; then
    echo "  ✅ Ajout de link"
  fi
else
  echo "❌ Migration SQL non trouvée"
fi

echo ""
echo "🎯 PROCHAINES ÉTAPES"
echo "==================="
echo "1. ⏳ Exécuter la migration SQL dans Supabase Console"
echo "2. 🔄 Actualiser le navigateur (Ctrl+F5)"
echo "3. 🧪 Tester la création d'une formation avec image et date"
echo "4. 🧪 Tester la création d'une actualité avec image, date et lien"
echo "5. ✅ Vérifier l'affichage et fonctionnalité"
echo ""
echo "📖 Consultez MIGRATION_EXECUTION_GUIDE.md pour les détails"
echo ""
