# Use uma imagem leve do Node.js
FROM node:16-alpine

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de configuração do Node e instala as dependências
COPY package.json package-lock.json* ./
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Exponha a porta que o Next.js usará
EXPOSE 3000

# Comando para iniciar o Next.js (ajuste conforme seu script, ex: "dev" ou "start")
CMD ["npm", "run", "dev"]
