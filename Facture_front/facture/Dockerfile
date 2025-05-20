# Étape 1 - Build Angular
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
ARG API_URLS_AUTH=http://192.168.1.172:8090/api
ARG API_URLS_FACTURE=http://192.168.1.172:8094/api
ARG API_URLS_CLIENT=http://192.168.1.172:8092/api
ARG API_URLS_SERVICES=http://192.168.1.172:8093/api
RUN sed -i "s|<%= ENV.API_URLS_AUTH %>|$API_URLS_AUTH|g" src/index.html
RUN sed -i "s|<%= ENV.API_URLS_FACTURE %>|$API_URLS_FACTURE|g" src/index.html
RUN sed -i "s|<%= ENV.API_URLS_CLIENT %>|$API_URLS_CLIENT|g" src/index.html
RUN sed -i "s|<%= ENV.API_URLS_SERVICES %>|$API_URLS_SERVICES|g" src/index.html
RUN npm run build -- --configuration production || { echo "Build failed"; cat /app/npm-debug.log || true; exit 1; }
RUN ls -la /app/dist/facture  # Debug: Verify build output

# Étape 2 - Serveur nginx
FROM nginx:alpine
RUN ls -la /app/dist/facture/browser
COPY --from=builder /app/dist/facture/browser/ /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/nginx.conf
RUN ls -la /usr/share/nginx/html  # Debug: Verify copied files