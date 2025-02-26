# build dependencies
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

# build the app
FROM node:22-alpine

WORKDIR /app

COPY --from=build /app /app

ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "server.js"]