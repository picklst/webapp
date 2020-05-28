FROM node:alpine

RUN apk add build-base zlib-dev autoconf automake nasm libtool libpng-dev jpeg-dev g++ gcc libgcc libstdc++ linux-headers make python
RUN mkdir /app
COPY . /app
RUN npm cache clean --force
COPY package.json /app/package.json
RUN cd /app; npm install --loglevel verbose

COPY . /app
RUN cd /app; npm run build
WORKDIR ./app
CMD [ "npm", "start" ]
