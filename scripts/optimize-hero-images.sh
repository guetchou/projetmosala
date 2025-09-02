#!/bin/bash

# Script d'optimisation des images Hero
# Ratio recommandé : 16:9 (1920x1080px)

echo "🎨 Optimisation des images Hero..."

# Dossier source et destination
SRC_DIR="/opt/topcenter/projetmosala/frontend/public/topcenter-uploads/carrousel"
DEST_DIR="/opt/topcenter/projetmosala/frontend/public/topcenter-uploads/carrousel/optimized"

# Créer le dossier de destination
mkdir -p "$DEST_DIR"

# Dimensions recommandées
DESKTOP_WIDTH=1920
DESKTOP_HEIGHT=1080
MOBILE_WIDTH=750
MOBILE_HEIGHT=1334

# Fonction pour optimiser une image
optimize_image() {
    local input="$1"
    local filename=$(basename "$input")
    local name="${filename%.*}"
    local ext="${filename##*.}"
    
    echo "📸 Optimisation de $filename..."
    
    # Version desktop 16:9
    convert "$input" \
        -resize "${DESKTOP_WIDTH}x${DESKTOP_HEIGHT}^" \
        -gravity center \
        -extent "${DESKTOP_WIDTH}x${DESKTOP_HEIGHT}" \
        -quality 85 \
        "$DEST_DIR/${name}-desktop.${ext}"
    
    # Version mobile 9:16 (pour les images importantes)
    if [[ "$filename" == "mosala-jeunes1.png" || "$filename" == "mosala5-ministre-jeunesse-ambassadeur-france-congo.jpeg" ]]; then
        convert "$input" \
            -resize "${MOBILE_WIDTH}x${MOBILE_HEIGHT}^" \
            -gravity center \
            -extent "${MOBILE_WIDTH}x${MOBILE_HEIGHT}" \
            -quality 85 \
            "$DEST_DIR/${name}-mobile.${ext}"
    fi
    
    # Version WebP desktop
    cwebp -q 85 -m 6 "$DEST_DIR/${name}-desktop.${ext}" -o "$DEST_DIR/${name}-desktop.webp"
}

# Optimiser les images principales
optimize_image "$SRC_DIR/mosala-jeunes1.png"
optimize_image "$SRC_DIR/mosala5-ministre-jeunesse-ambassadeur-france-congo.jpeg"
optimize_image "$SRC_DIR/mosala1.jpeg"
optimize_image "$SRC_DIR/mosala2.jpeg"

echo "✅ Optimisation terminée !"
echo "📁 Images optimisées dans : $DEST_DIR"
echo "📊 Taille recommandée : 1920x1080px (16:9)"
