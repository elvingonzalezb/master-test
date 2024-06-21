FROM node:lts-alpine3.19

WORKDIR /usr/srcn/app

COPY /srcn/package*.json ./

RUN npm install

COPY . .

EXPOSE 5000
CMD ["node", "srcn/index.js"]
