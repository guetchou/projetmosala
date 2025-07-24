#!/bin/bash
# Réinitialise les données du schéma demo
set -e
DB_URL=${DB_URL:-postgres://user:pass@localhost:5432/db}
SCHEMA_DEMO=demo

psql "$DB_URL" -c "TRUNCATE TABLE $SCHEMA_DEMO.jobs, $SCHEMA_DEMO.users, $SCHEMA_DEMO.applications RESTART IDENTITY CASCADE;"
node scripts/generate_demo_data.js

echo "Données du schéma demo régénérées." 