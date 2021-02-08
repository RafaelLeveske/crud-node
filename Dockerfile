FROM node:alpine

WORKDIR /usr/app

COPY package.json ./

COPY yarn.lock ./

COPY .env ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3333

CMD ["yarn", "prod"]
