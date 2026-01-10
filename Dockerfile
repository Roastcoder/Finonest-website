# Build stage for frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Install server dependencies
COPY server/package*.json ./
RUN npm ci --only=production

# Copy server source
COPY server/src ./src
COPY server/tsconfig.json ./

# Copy built frontend
COPY --from=frontend-build /app/dist ./public

# Install TypeScript globally for runtime
RUN npm install -g typescript tsx

EXPOSE 4000

CMD ["tsx", "src/server.ts"]