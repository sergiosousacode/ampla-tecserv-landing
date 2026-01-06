# imagem base
FROM node:18-alpine

# diretório de trabalho
WORKDIR /app

# copia dependências
COPY package*.json ./

FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]

COPY .env* ./
