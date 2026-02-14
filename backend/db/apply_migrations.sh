#!/usr/bin/env bash
set -euo pipefail

# apply_migrations.sh
# Usage:
#   DATABASE_URL=postgres://user:pass@host:5432/dbname ./apply_migrations.sh
# or set SUPABASE_DB_URL env var

SQL_FILE="$(dirname "$0")/001_init_admin_system.sql"
DB_URL="${DATABASE_URL:-${SUPABASE_DB_URL:-}}"

if [[ -z "$DB_URL" ]]; then
  echo "Error: set DATABASE_URL or SUPABASE_DB_URL environment variable to your Postgres connection string." >&2
  echo "Example: DATABASE_URL=\"postgres://user:pass@host:5432/dbname\" $0" >&2
  exit 2
fi

# Check psql
if ! command -v psql >/dev/null 2>&1; then
  echo "Error: psql not found. Install libpq (psql) or use the Supabase SQL editor." >&2
  exit 3
fi

echo "Applying migrations from $SQL_FILE to $DB_URL"
PGOPTIONS="--client-min-messages=warning" psql "$DB_URL" -v ON_ERROR_STOP=1 -f "$SQL_FILE"

echo "Migrations applied."
