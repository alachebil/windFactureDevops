# Étape 1 - Build Angular
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run build -- --configuration production

# Étape 2 - Serveur nginx
FROM nginx:alpine
COPY --from=builder /app/dist/facture /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
