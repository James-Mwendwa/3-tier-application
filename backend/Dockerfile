# build dependencies
FROM node:slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

# build the app
FROM node:slim

WORKDIR /app

COPY --from=build /app /app

ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "server.js"]