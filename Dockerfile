FROM node:alpine

ENV PORT=10080
ENV DBUSER=unodejs
ENV DBPASSWORD=qwerty
ENV DBSERVER=mongodb
ENV DBPORT=27017
ENV DBNAME=mynodedb


RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install

COPY . /usr/src/app

EXPOSE $PORT

CMD ["npm","start"]

