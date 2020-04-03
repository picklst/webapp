FROM node:alpine

RUN apk add build-base zlib-dev jpeg-dev
RUN mkdir /app
WORKDIR /app

COPY package.json /app/package.json
RUN cd /app; npm install
COPY . /app

#RUN npm run build
#COPY .next ./app/.next

EXPOSE 3000

CMD [ "npm", "run", "dev" ]