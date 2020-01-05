FROM node:lts

WORKDIR /usr/src/app

COPY . .

RUN apt-get -y update && apt-get install -y netcat
RUN yarn install
RUN wget https://repo.mongodb.org/apt/debian/dists/stretch/mongodb-org/4.2/main/binary-amd64/mongodb-org-shell_4.2.2_amd64.deb --quiet
RUN dpkg -i mongodb-org-shell_4.2.2_amd64.deb

ENTRYPOINT ./wait-for mongo:27017 -t 1 -- mongo mongodb://$MONGO_INITDB_ROOT_USERNAME:$MONGO_INITDB_ROOT_PASSWORD@mongo:27017/ --eval "let dbname='$MONGO_SHIELDY_DB';let username='$MONGO_SHIELDY_USERNAME';let userpassword='$MONGO_SHIELDY_PASSWORD'" init-mongo.js && yarn distribute