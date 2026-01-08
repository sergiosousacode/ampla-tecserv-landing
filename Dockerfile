# ===== STAGE 1: build =====
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ===== STAGE 2: produção =====
FROM node:20-alpine

WORKDIR /app

# copia só o necessário
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
# se for Next.js:
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]

