# Étape 1 - Build Angular
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
ARG API_URLS_AUTH=http://auth-service:8090/api
ARG API_URLS_FACTURE=http://facture:8094/api
ARG API_URLS_CLIENT=http://client-service:8092/api
ARG API_URLS_SERVICES=http://services-ser:8093/api
RUN sed -i "s|<%= ENV.API_URLS_AUTH %>|$API_URLS_AUTH|g" src/index.html
RUN sed -i "s|<%= ENV.API_URLS_FACTURE %>|$API_URLS_FACTURE|g" src/index.html
RUN sed -i "s|<%= ENV.API_URLS_CLIENT %>|$API_URLS_CLIENT|g" src/index.html
RUN sed -i "s|<%= ENV.API_URLS_SERVICES %>|$API_URLS_SERVICES|g" src/index.html
RUN npm run build -- --configuration production

# Étape 2 - Serveur nginx
FROM nginx:alpine
COPY --from=builder /app/dist/facture /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf