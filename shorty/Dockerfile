# ===============================
# Stage 1: Build dependencies and build app
# ===============================
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy app source
COPY . .

# Build Next.js app
RUN npm run build

# ===============================
# Stage 2: Production image
# ===============================
FROM node:22-alpine

ENV NODE_ENV=production

WORKDIR /app

# Copy production node_modules and build output from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
# copy any other necessary files if needed

EXPOSE 8000

CMD ["npm", "start"]