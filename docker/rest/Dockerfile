FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate && npm run build

EXPOSE 3001 9229

#CMD ["npm", "run", "start:prod"]
CMD ["tail", "-f", "100", "/dev/null"]