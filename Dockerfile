FROM node:alpine

ENV PORT=10080
ENV DBUSER=unodejs
ENV DBPASSWORD=qwerty
ENV DBSERVER=mongodbcust
ENV DBPORT=27017
ENV DBNAME=mynodedb
ENV TITLE='Customers Automation Testing'


RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY sources/. /usr/src/app
RUN npm install

EXPOSE $PORT

CMD ["npm","start"]

