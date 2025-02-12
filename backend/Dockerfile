# multi-stage build to install dependencies
FROM node:18-alpine AS build

# set working directory in the container
WORKDIR /app

# copy json files to the container
COPY package*.json ./

# install dependencies
RUN npm install


# copy all files to the container
COPY . .

# starts a new stage to create a smaller image
FROM node:18-alpine

# set working directory in the container
WORKDIR /app

# copy node_modules and server.js from the previous stage to the current stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/server.js ./
COPY --from=build /app/db ./db 

ENV PATH="/app/node_modules/.bin:$PATH"

# expose port 3001 for the server to listen on
EXPOSE 3001

# specify the command to start the server
CMD ["node", "server.js"]