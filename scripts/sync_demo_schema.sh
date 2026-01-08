#!/bin/bash
# Synchronise la structure du schéma prod (public) vers demo
set -e
DB_URL=${DB_URL:-postgres://user:pass@localhost:5432/db}
SCHEMA_PROD=public
SCHEMA_DEMO=demo

psql "$DB_URL" -c "DROP SCHEMA IF EXISTS $SCHEMA_DEMO CASCADE; CREATE SCHEMA $SCHEMA_DEMO;"
pg_dump --schema=$SCHEMA_PROD --schema-only "$DB_URL" | \
  sed "s/SET search_path = $SCHEMA_PROD;/SET search_path = $SCHEMA_DEMO;/g" | \
  psql "$DB_URL"
echo "Schéma demo synchronisé avec la prod." 