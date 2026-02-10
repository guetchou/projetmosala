#!/bin/bash

# Script de test de connexion à la base de données Supabase
# Teste les variables d'environnement et la connexion

echo "╔════════════════════════════════════════════════════════════╗"
echo "║    TEST DE CONNEXION - BASE DE DONNÉES SUPABASE            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Charger les variables d'environnement
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | xargs)
    echo "✅ Fichier .env chargé"
else
    echo "❌ Fichier .env non trouvé"
    exit 1
fi

echo ""
echo "📋 VARIABLES SUPABASE:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -z "$VITE_SUPABASE_URL" ]; then
    echo "❌ VITE_SUPABASE_URL non défini"
else
    echo "✅ VITE_SUPABASE_URL: ${VITE_SUPABASE_URL:0:40}..."
fi

if [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
    echo "❌ VITE_SUPABASE_ANON_KEY non défini"
else
    echo "✅ VITE_SUPABASE_ANON_KEY: ${VITE_SUPABASE_ANON_KEY:0:40}..."
fi

echo ""
echo "🌐 TEST DE CONNECTIVITÉ RÉSEAU:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Extraire le hostname
HOSTNAME=$(echo $VITE_SUPABASE_URL | sed 's|https://||' | cut -d'.' -f1)
DOMAIN="ikugkkubbyoohfpqcoum.supabase.co"

echo "Hostname: $DOMAIN"

# Test ping/curl
if curl -s -I "$VITE_SUPABASE_URL" > /dev/null 2>&1; then
    echo "✅ Réponse HTTP du serveur Supabase: OK"
else
    echo "⚠️  Vérification HTTP: Pas de réponse"
fi

# Test DNS
if nslookup $DOMAIN > /dev/null 2>&1; then
    echo "✅ Résolution DNS: OK"
else
    echo "❌ Résolution DNS: ÉCHOUÉE"
fi

echo ""
echo "🔐 TEST D'AUTHENTIFICATION SUPABASE:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test avec curl/API REST
RESPONSE=$(curl -s -X GET \
  "${VITE_SUPABASE_URL}/rest/v1/news?limit=1" \
  -H "apikey: ${VITE_SUPABASE_ANON_KEY}" \
  -H "Authorization: Bearer ${VITE_SUPABASE_ANON_KEY}" \
  2>&1)

echo "Réponse API: $RESPONSE" | head -c 100
echo "..."
echo ""

if echo "$RESPONSE" | grep -q "error\|not found\|invalid"; then
    echo "⚠️  Réponse: Peut contenir une erreur"
elif echo "$RESPONSE" | grep -q "\[\|error_code"; then
    echo "✅ Réponse JSON reçue - Connexion établie!"
else
    echo "✅ Réponse reçue du serveur"
fi

echo ""
echo "📊 TEST DÉTAILLÉ (Node.js):"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Créer un script Node.js de test
cat > /tmp/test-supabase.js << 'EOF'
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log("📌 Configuration:");
console.log("  URL: " + supabaseUrl);
console.log("  Key: " + supabaseKey.substring(0, 30) + "...");

const { createClient } = require("@supabase/supabase-js");

try {
  const supabase = createClient(supabaseUrl, supabaseKey);
  console.log("\n✅ Client Supabase créé avec succès");
  
  // Test simple: récupérer 1 enregistrement
  console.log("\n🔍 Test de requête simple...");
  supabase
    .from("news")
    .select("id, title")
    .limit(1)
    .then((result) => {
      if (result.error) {
        console.log("❌ Erreur: " + result.error.message);
      } else {
        console.log("✅ Requête réussie!");
        console.log("  Résultat: " + result.data.length + " enregistrement(s)");
      }
    })
    .catch((err) => {
      console.log("❌ Exception: " + err.message);
    });
} catch (error) {
  console.log("❌ Erreur: " + error.message);
}
EOF

# Vérifier si Node et Supabase sont installés
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
else
    echo "✅ Node.js trouvé"
    
    cd /Users/francklinetoka/Documents/GitHub/projetmosala
    
    # Test simple avec curl JSON
    echo ""
    echo "Test cURL sur endpoint news:"
    curl -s -X GET \
      "${VITE_SUPABASE_URL}/rest/v1/news?select=id,title&limit=1" \
      -H "apikey: ${VITE_SUPABASE_ANON_KEY}" \
      -H "Authorization: Bearer ${VITE_SUPABASE_ANON_KEY}" | python3 -m json.tool 2>/dev/null || curl -s -X GET \
      "${VITE_SUPABASE_URL}/rest/v1/news?select=id,title&limit=1" \
      -H "apikey: ${VITE_SUPABASE_ANON_KEY}" \
      -H "Authorization: Bearer ${VITE_SUPABASE_ANON_KEY}"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                     TEST TERMINÉ                           ║"
echo "╚════════════════════════════════════════════════════════════╝"
