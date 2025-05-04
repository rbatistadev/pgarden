FROM node:18-alpine

WORKDIR /app

COPY rest/package*.json ./
RUN npm install

COPY rest ./
RUN npm run build

EXPOSE 3001
CMD ["npm", "run", "start:prod"]
