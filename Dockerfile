FROM node:18-buster-slim

WORKDIR /app

ADD . .

RUN npm i --production;mkdir uploads

ENTRYPOINT [ "npm","run","start"]