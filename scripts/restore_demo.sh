#!/bin/bash
set -e
DB_URL=${DB_URL:-postgres://user:pass@localhost:5432/db}
psql "$DB_URL" < demo_schema_backup.sql
echo "Schéma demo restauré à partir du backup." 