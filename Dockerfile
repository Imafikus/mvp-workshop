FROM node:20-alpine3.18  

WORKDIR /mvp 

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build 

ENTRYPOINT [ "node","./dist/index.js" ]