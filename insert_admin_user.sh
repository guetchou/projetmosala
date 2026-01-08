#!/bin/bash

# === Configuration ===
CONTAINER_NAME="mosala-postgres"
DB_NAME="mosala"
DB_USER="postgres"
ADMIN_NAME="Admin Mosala"
ADMIN_EMAIL="admin@mosala.com"
ADMIN_PASSWORD_BCRYPT='$2b$10$xLimMB6zZm.Ps48JHxFLb.eHAr3fYHLF0sIcJHWbwCALlskbFTw9a'
ADMIN_ROLE="admin"
BACKUP_FILE="backup_users_before_insert.sql"

# === Backup avant modification ===
echo "🔄 Sauvegarde de la table users avant l'insertion..."
docker exec $CONTAINER_NAME pg_dump -U $DB_USER -d $DB_NAME -t users > "$BACKUP_FILE"

# === Vérification existence utilisateur ===
echo "🔍 Vérification si l'utilisateur existe déjà..."
EXIST=$(docker exec -i $CONTAINER_NAME psql -U $DB_USER -d $DB_NAME -tAc "SELECT 1 FROM users WHERE email='$ADMIN_EMAIL';")

if [ "$EXIST" = "1" ]; then
  echo "⚠️  L'utilisateur avec l'email '$ADMIN_EMAIL' existe déjà. Insertion annulée."
  exit 1
fi

# === Insertion de l'utilisateur admin ===
echo "✅ Insertion de l'utilisateur '$ADMIN_NAME'..."
docker exec -i $CONTAINER_NAME psql -U $DB_USER -d $DB_NAME -c "
INSERT INTO users (name, email, password, role)
VALUES ('$ADMIN_NAME', '$ADMIN_EMAIL', '$ADMIN_PASSWORD_BCRYPT', '$ADMIN_ROLE');
"

# === Confirmation ===
echo "📋 Vérification de l'insertion :"
docker exec -i $CONTAINER_NAME psql -U $DB_USER -d $DB_NAME -c "
SELECT id, name, email, role FROM users WHERE email='$ADMIN_EMAIL';
"

echo "✅ Insertion terminée et confirmée."
