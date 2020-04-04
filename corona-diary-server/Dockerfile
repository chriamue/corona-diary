FROM node:12.16.1-alpine3.11
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh
ENV NODE_ENV dev
WORKDIR /usr/src
RUN mkdir -p corona-diary; cd corona-diary; git init; git remote add -f origin https://github.com/chriamue/corona-diary.git; git pull --depth=1 origin master;\
    cd corona-diary-js; npm install; npm run build; cd ..; mv corona-diary-js ..
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
ADD . /usr/src/app
CMD [ "npm", "start" ]
EXPOSE 5000