FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install
RUN wget https://repo.mongodb.org/apt/debian/dists/stretch/mongodb-org/4.2/main/binary-amd64/mongodb-org-shell_4.2.0_amd64.deb
RUN dpkg -i mongodb-org-shell_4.2.0_amd64.deb

COPY . .

ENTRYPOINT [ "mongo", "mongodb://mongoadmin:example@mongo:27017/", "init-mongo.js", "--quiet"]