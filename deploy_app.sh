#!/bin/bash

dbuser=unodejs
dbpassword=qwerty
dbserver=mongodb
dbport=27017
dbname=mynodedb
dbvolume=/data/NodeRepo/db
appname=mynodeapp

if [[ $# -eq 0 ]]; then
  PORT=10080
else
  PORT=$1
fi

echo "Make sure app isn't running in docker"
for container in `docker ps|tail -n +2|awk -v appname=${appname} '$2 == appname {print $1}'`;do
  echo "Kill and removing container ${container}"
  docker kill ${container}
  docker rm ${container}
done

echo "Removing the old image"
docker rmi ${appname}

echo "Setting app to listen on port ${PORT}"
sed -i -e "s/^ENV PORT=.*\$/ENV PORT=$PORT/"\
  -e "s/^ENV DBUSER=.*\$/ENV DBUSER=$dbuser/"\
  -e "s/^ENV DBPASSWORD=.*\$/ENV DBPASSWORD=$dbpassword/"\
  -e "s/^ENV DBSERVER=.*\$/ENV DBSERVER=$dbserver/"\
  -e "s/^ENV DBPORT=.*\$/ENV DBPORT=$dbport/"\
  -e "s/^ENV DBNAME=.*\$/ENV DBNAME=$dbname/" Dockerfile
echo "Building the new image"
docker build -t ${appname} .

echo "Make sure DB is running"
docker ps |grep "${dbserver}" >/dev/null 2>&1
if [[ $? -ne 0 ]]; then
  if docker ps -a |grep "${dbserver}" >/dev/null 2>&1 ; then
    echo "Removing old container of ${dbserver}"
    docker rm ${dbserver}
  fi
  docker run -d -p 27017:27017 -v ${dbvolume}:/data/db -e MONGODB_USER="${dbuser}" -e MONGODB_DATABASE="${dbname}" -e MONGODB_PASS="${dbpassword}" --name ${dbserver} tutum/mongodb
fi

echo "Running app in a new container"
docker run -d -p${PORT}:${PORT} --link ${dbserver} ${appname}
