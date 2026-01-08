# ===== STAGE 1: build =====
FROM node:20.12-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ===== STAGE 2: produção =====
FROM node:20.12-slim

WORKDIR /app

ENV NODE_ENV=production

# copia somente o necessário
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
