#!/bin/bash

set -e

echo "=== Création du dossier frontend/ ==="
mkdir -p frontend

echo "=== Déplacement du code source dans frontend/src/ ==="
mv src frontend/

echo "=== Déplacement du dossier public/ dans frontend/ ==="
mv public frontend/

echo "=== Déplacement des fichiers de configuration frontend ==="
for f in vite.config.ts index.html tsconfig.app.json tsconfig.json tsconfig.node.json postcss.config.js tailwind.config.ts eslint.config.js components.json bun.lockb; do
  if [ -f "$f" ]; then
    mv "$f" frontend/
  fi
done

echo "=== Mise à jour du .gitignore ==="
cat <<EOGIT > .gitignore
node_modules/
dist/
.env
frontend/node_modules/
backend/node_modules/
EOGIT

echo "=== Génération d'un README.md standard ==="
cat <<EOREADME > README.md
# Mosala Job Platform

## Structure du projet

\`\`\`
/backend      # API NestJS (TypeScript)
  /src
  /test
  Dockerfile
  package.json
/frontend     # Frontend React (Vite)
  /src
  /public
  vite.config.ts, etc.
/docs         # Documentation technique
docker-compose.yml
README.md
.gitignore
\`\`\`

## Démarrage rapide

### Backend
\`\`\`bash
cd backend
npm install
npm run start:dev
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

## Documentation
Voir le dossier \`docs/\`.
EOREADME

echo "=== Restructuration terminée avec succès ! ==="
