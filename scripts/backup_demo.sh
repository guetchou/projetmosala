#!/bin/bash
set -e
DB_URL=${DB_URL:-postgres://user:pass@localhost:5432/db}
SCHEMA_DEMO=demo
pg_dump --schema=$SCHEMA_DEMO "$DB_URL" > demo_schema_backup.sql
echo "Backup du schéma demo effectué dans demo_schema_backup.sql" 