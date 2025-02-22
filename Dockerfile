# Use uma imagem leve do Node.js
FROM node:16-alpine

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de configuração do Node e instala as dependências
COPY ./csa/package.json ./csa/package-lock.json* ./
RUN npm update

# Copia o restante do código da aplicação
COPY . .
