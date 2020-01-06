FROM node:lts

WORKDIR /usr/src/app

COPY . .

RUN apt-get -y update && apt-get install -y netcat gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
RUN yarn install
RUN wget https://repo.mongodb.org/apt/debian/dists/stretch/mongodb-org/4.2/main/binary-amd64/mongodb-org-shell_4.2.2_amd64.deb --quiet
RUN dpkg -i mongodb-org-shell_4.2.2_amd64.deb

ENTRYPOINT ./wait-for mongo:27017 -t 1 -- mongo mongodb://$MONGO_INITDB_ROOT_USERNAME:$MONGO_INITDB_ROOT_PASSWORD@mongo:27017/ --eval "let dbname='$MONGO_SHIELDY_DB';let username='$MONGO_SHIELDY_USERNAME';let userpassword='$MONGO_SHIELDY_PASSWORD'" init-mongo.js && yarn distribute