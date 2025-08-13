#!/bin/bash

# Script de rollback pour les changements dark mode
# Restaure les fichiers depuis le backup

set -e

BACKUP_DIR="backups/dark_mode_2025-08-12_2321"

echo "🔄 Début du rollback des changements dark mode..."

if [ ! -d "$BACKUP_DIR" ]; then
    echo "❌ Erreur: Le répertoire de backup $BACKUP_DIR n'existe pas"
    exit 1
fi

echo "📁 Restauration depuis: $BACKUP_DIR"

# Restaurer les fichiers
echo "📄 Restauration des fichiers..."

# Tailwind config
if [ -f "$BACKUP_DIR/tailwind.config.ts" ]; then
    cp "$BACKUP_DIR/tailwind.config.ts" "frontend/tailwind.config.ts"
    echo "✅ tailwind.config.ts restauré"
fi

# Index HTML
if [ -f "$BACKUP_DIR/index.html" ]; then
    cp "$BACKUP_DIR/index.html" "frontend/index.html"
    echo "✅ index.html restauré"
fi

# Navbar component
if [ -f "$BACKUP_DIR/Navbar.tsx" ]; then
    cp "$BACKUP_DIR/Navbar.tsx" "frontend/src/components/Navbar.tsx"
    echo "✅ Navbar.tsx restauré"
fi

# Hero component
if [ -f "$BACKUP_DIR/Hero.tsx" ]; then
    cp "$BACKUP_DIR/Hero.tsx" "frontend/src/components/ui/Hero.tsx"
    echo "✅ Hero.tsx restauré"
fi

# Styles directory
if [ -d "$BACKUP_DIR/styles" ]; then
    rm -rf "frontend/src/styles"
    cp -r "$BACKUP_DIR/styles" "frontend/src/"
    echo "✅ Styles restaurés"
fi

echo "🎉 Rollback terminé avec succès!"
echo "💡 N'oubliez pas de redémarrer le serveur de développement si nécessaire"
