# Utilisation d'une image de Node.js légère
FROM node:18-alpine

# Définition du dossier de travail
WORKDIR /app

# Copie des fichiers nécessaires pour installer les dépendances
COPY package.json package-lock.json ./

# Installation des dépendances
RUN npm install

# Copie de tout le code source
COPY . .

# Exposer le port utilisé par Vite (par défaut 5173)
EXPOSE 5173

# Commande pour démarrer l'application en mode développement
CMD ["npm", "run", "dev", "--", "--host"]