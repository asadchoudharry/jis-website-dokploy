# Stage 1: Build the application
FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Create the production image
FROM node:20-alpine AS runner
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm install --production

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# These paths will be mounted as a volume by Dokploy
ENV DB_PATH=/data/db.json
ENV UPLOADS_PATH=/data/uploads
ENV PORT=3001

EXPOSE 3001

CMD [ "node", "dist/index.js" ]
