# Multi-stage build for production deployment
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev for build)
RUN npm ci

# Copy source code
COPY . .

# Set build environment
ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false

# Debug: Show environment and run build with verbose output
RUN echo "Node version: $(node --version)" && \
    echo "NPM version: $(npm --version)" && \
    echo "NODE_ENV: $NODE_ENV" && \
    echo "Starting build..." && \
    npm run build && \
    echo "Build completed. Checking dist folder:" && \
    ls -la dist/ && \
    echo "Dist contents:" && \
    find dist -type f | head -10

# Production stage
FROM nginx:alpine AS production

# Install curl for health checks
RUN apk add --no-cache curl

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Debug: Check what was copied
RUN echo "Files in nginx html directory:" && \
    ls -la /usr/share/nginx/html/ && \
    echo "Index.html exists:" && \
    test -f /usr/share/nginx/html/index.html && echo "YES" || echo "NO"

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create health endpoint
RUN echo '{"status":"healthy","timestamp":"'$(date -Iseconds)'"}' > /usr/share/nginx/html/health.json

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health.json || exit 1

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]