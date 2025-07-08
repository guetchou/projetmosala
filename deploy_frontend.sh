#!/bin/bash

set -e

# Build du front-end
npm install
npm run build

echo ""
echo "Choisissez le mode de déploiement :"
echo "1) PM2 (npm run preview)"
echo "2) Docker (nginx)"
echo ""
read -p "Votre choix (1/2) : " mode

if [ "$mode" == "1" ]; then
    echo "\n--- Déploiement avec PM2 ---"
    npm install -g pm2 || true
    pm2 delete mosala-frontend || true
    pm2 start npm --name "mosala-frontend" -- run preview
    pm2 save
    echo "\nFront-end lancé avec PM2 sur le port 4173 (par défaut Vite preview)"
elif [ "$mode" == "2" ]; then
    echo "\n--- Déploiement avec Docker ---"
    cat > Dockerfile <<EOF
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF
    docker build -t mosala-frontend .
    docker rm -f mosala-frontend || true
    docker run -d -p 8080:80 --name mosala-frontend mosala-frontend
    echo "\nFront-end lancé avec Docker sur le port 8080"
else
    echo "Choix invalide. Abandon."
    exit 1
fi 