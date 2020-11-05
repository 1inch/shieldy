FROM node:12-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json .
COPY ./src ./src
COPY ./scripts ./scripts
COPY ./tsconfig.json .
COPY ./yarn.lock .
COPY ./entrypoint.sh .

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

ENV SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Install shieldy dependencies
RUN yarn install

RUN rm -rf /usr/local/lib/node_modules/npm/ /usr/local/bin/npm

CMD ["./entrypoint.sh"]
