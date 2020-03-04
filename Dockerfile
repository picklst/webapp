FROM node:alpine

RUN apk add build-base zlib-dev jpeg-dev
RUN mkdir /app
WORKDIR /app

COPY . ./
RUN npm install

#RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "dev" ]