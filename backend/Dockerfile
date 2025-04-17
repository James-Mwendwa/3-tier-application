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

# create a non root user
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# change ownership of the app files
RUN chown -R appuser:appgroup /app

# set the user to appuser
USER appuser

ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "server.js"]