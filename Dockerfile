# Étape 1 : Construire l’application
FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build -- --configuration production


# Étape 2 : Servir avec Nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf


COPY --from=build /app/dist/main/browser /usr/share/nginx/html

# Copie un fichier de configuration personnalisé (optionnel)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
