# Étape 1 : Utiliser une image de Node.js légère
FROM node:18-alpine

# Définir le dossier de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source
COPY . .

# Exposer le port utilisé par Vite (par défaut 5173)
EXPOSE 5173

# Commande pour démarrer l'application en mode développement
CMD ["npm", "run", "dev", "--", "--host"]