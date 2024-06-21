FROM node:lts-alpine3.19

WORKDIR /usr/src/app

COPY /src/package*.json ./

RUN npm install

COPY . .

EXPOSE 3001
CMD ["node", "src/index.js"]
