# Etapa 1: Construção da aplicação
FROM node:18-alpine AS builder
WORKDIR /app

# Copia apenas os arquivos essenciais do projeto que estão dentro de "csa"
COPY csa/package.json csa/package-lock.json* csa/yarn.lock* ./
RUN npm install

# Copia o restante dos arquivos do projeto (dentro de "csa") para o container
COPY csa/ ./

# Realiza o build da aplicação Next.js (o diretório "pages" ou "app" deverá estar em /app)
RUN npm run dev

EXPOSE 3000
CMD ["npm", "start"]
