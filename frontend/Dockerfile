FROM node:slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# stage 2
FROM node:slim

WORKDIR /app

COPY --from=build /app ./

# create a non root user
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# change ownership of the app files
RUN chown -R appuser:appgroup /app

# set the user to appuser
USER appuser

EXPOSE 3000

CMD ["npm", "run", "start"]

##non root user
##nginx server