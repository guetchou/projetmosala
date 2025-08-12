# Multi-stage build pour le frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --only=production
COPY frontend/ .
RUN npm run build

# Multi-stage build pour le backend NestJS
FROM node:18-alpine AS backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ .
RUN npm run build

# Production stage
FROM nginx:alpine AS production
WORKDIR /app

# Copier les builds
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html
COPY --from=backend-build /app/backend/dist /app/backend/dist

# Copier la configuration nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Créer un utilisateur non-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Installer Node.js pour le backend
RUN apk add --no-cache nodejs npm

# Copier le package.json du backend pour les dépendances de production
COPY backend/package*.json /app/backend/
RUN cd /app/backend && npm ci --only=production

# Changer les permissions
RUN chown -R nestjs:nodejs /app
USER nestjs

# Exposer les ports
EXPOSE 80 4002

# Script de démarrage
COPY scripts/start.sh /app/start.sh
RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]
