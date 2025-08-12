# Build stage
FROM node:20 AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install pnpm and dependencies
RUN npm install -g pnpm && pnpm install

# Copy source code and config files
COPY . .

# Build the app
RUN pnpm run build

# Verify the build output
RUN ls -la dist/

# Production stage
FROM node:20-alpine

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Copy package files
COPY package*.json ./
RUN npm install -g pnpm && pnpm install --prod && pnpm store prune

# Copy built app from build stage
COPY --from=build /app/dist ./dist

# Change ownership
RUN chown -R nestjs:nodejs /app
USER nestjs

# Expose port
EXPOSE 4002

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node dist/src/main.js || exit 1

# Start the app
CMD ["node", "dist/src/main.js"]
