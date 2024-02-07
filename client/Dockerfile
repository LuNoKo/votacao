# Use uma imagem Node.js como base
FROM node:20.10-alpine as builder

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie os arquivos de origem do aplicativo para o diretório de trabalho
COPY . .

# Execute o comando de construção para o modo de produção
RUN npm run build

# Use uma imagem leve do servidor Nginx para servir os arquivos estáticos
FROM nginx:alpine

# Copie os arquivos de construção do aplicativo Angular para o diretório padrão do Nginx
COPY --from=builder /app/dist/client/browser /usr/share/nginx/html

# Exponha a porta 80 (a porta padrão usada pelo Nginx)
EXPOSE 80

# Comando para iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]