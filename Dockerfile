# ===== STAGE 1: build =====
FROM node:20.12-slim AS builder

WORKDIR /app

ARG NEXT_PUBLIC_FACEBOOK
ARG NEXT_PUBLIC_INSTAGRAM
ARG NEXT_PUBLIC_LINKEDIN
ARG NEXT_PUBLIC_WHATSAPP
ARG NEXT_PUBLIC_EMAIL

ENV NEXT_PUBLIC_FACEBOOK=$NEXT_PUBLIC_FACEBOOK
ENV NEXT_PUBLIC_INSTAGRAM=$NEXT_PUBLIC_INSTAGRAM
ENV NEXT_PUBLIC_LINKEDIN=$NEXT_PUBLIC_LINKEDIN
ENV NEXT_PUBLIC_WHATSAPP=$NEXT_PUBLIC_WHATSAPP
ENV NEXT_PUBLIC_EMAIL=$NEXT_PUBLIC_EMAIL

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
