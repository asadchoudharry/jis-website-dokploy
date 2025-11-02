# Stage 1: Build the Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# The API will be served from the same domain, so no prefix is needed.
ENV VITE_API_BASE_URL=/api
RUN npm run build

# Stage 2: Build the Backend
FROM node:20-alpine AS backend-builder
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
RUN npm run build

# Stage 3: Final Production Image
FROM node:20-alpine
WORKDIR /app

# Copy production dependencies from backend
COPY backend/package*.json ./
RUN npm install --production

# Copy built backend code
COPY --from=backend-builder /app/dist ./dist

# Copy built frontend code into a 'public' directory
COPY --from=frontend-builder /app/dist ./public

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Define environment variables for paths inside the container
ENV DB_PATH=/data/db.json
ENV UPLOADS_PATH=/data/uploads
ENV PORT=3001

EXPOSE 3001

CMD [ "node", "dist/index.js" ]
