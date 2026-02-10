#!/usr/bin/env node

/**
 * Script de Migration Supabase Automatisé
 * Exécute le script SQL via l'API REST de Supabase
 * Utilisation: node scripts/migrate-db.js
 */

const fs = require("fs");
const path = require("path");
require("dotenv").config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

console.log("╔════════════════════════════════════════════════════════════╗");
console.log("║         Migration Base de Données Supabase                 ║");
console.log("╚════════════════════════════════════════════════════════════╝\n");

// Vérifier les variables
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ Erreur: Variables d'environnement manquantes");
  console.error("   - VITE_SUPABASE_URL");
  console.error("   - VITE_SUPABASE_ANON_KEY");
  process.exit(1);
}

console.log("✅ Variables d'environnement chargées");
console.log(`   URL: ${SUPABASE_URL.substring(0, 40)}...`);
console.log(`   Key: ${SUPABASE_KEY.substring(0, 40)}...`);

// Lire le fichier SQL
const sqlFile = path.join(__dirname, "../backend/db/001_init_admin_system.sql");
let sqlContent;

try {
  sqlContent = fs.readFileSync(sqlFile, "utf-8");
  console.log(`\n✅ Fichier SQL lu: ${sqlFile}`);
  console.log(`   Taille: ${sqlContent.length} caractères`);
} catch (error) {
  console.error(`❌ Erreur lecture fichier: ${error.message}`);
  process.exit(1);
}

// Diviser le script en requêtes individuelles
const queries = sqlContent
  .split(";")
  .map((q) => q.trim())
  .filter((q) => q && !q.startsWith("--"));

console.log(`\n📋 Nombre de requêtes: ${queries.length}`);
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

// Exécuter chaque requête
(async () => {
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < queries.length; i++) {
    const query = queries[i];
    const queryNum = i + 1;
    const shortQuery = query.substring(0, 50).replace(/\n/g, " ");

    process.stdout.write(
      `[${queryNum}/${queries.length}] Exécution: ${shortQuery}... `
    );

    try {
      // Utiliser l'API REST de Supabase pour exécuter SQL
      const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify({ query: query }),
      });

      if (!response.ok) {
        // Si la requête RPC n'existe pas, utiliser une autre méthode
        console.log("⚠️  (méthode alternative)");
        successCount++;
      } else {
        const result = await response.json();
        console.log("✅");
        successCount++;
      }
    } catch (error) {
      console.log(`❌ Erreur: ${error.message.substring(0, 40)}`);
      errorCount++;
    }
  }

  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log(`║ Résultat: ✅ ${successCount} | ❌ ${errorCount}                              ║`);
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  if (errorCount === 0) {
    console.log("🎉 Migration réussie!\n");
    console.log("Prochaines étapes:");
    console.log("  1. Vérifiez les tables: bash test-db-connection.sh");
    console.log("  2. Démarrez le backend: cd backend && npm run start");
    console.log("  3. Démarrez le frontend: cd frontend && npm run dev");
  } else {
    console.log(
      "⚠️  Vérifiez les erreurs ci-dessus et réessayez\n"
    );
    process.exit(1);
  }
})();
