FROM node:12-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

COPY ./package.json .
COPY ./yarn.lock .

# Install shieldy dependencies
RUN yarn install

COPY ./tsconfig.json .
COPY ./scripts ./scripts
COPY ./src ./src
COPY ./entrypoint.sh .

ENV SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt

RUN rm -rf /usr/local/lib/node_modules/npm/ /usr/local/bin/npm

CMD ["./entrypoint.sh"]
