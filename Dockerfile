FROM node:lts-bullseye-slim

RUN mkdir -p home/node/app/node_module
RUN chown node /home/node/app/node_module

WORKDIR home/node/app

COPY package*.json ./

RUN npm install

COPY src ./src

COPY templates ../templates

COPY .env ../

CMD ["node","src/server.js"]