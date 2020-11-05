#!/bin/sh

if [ ! -z ${MONGO_SHIELDY_PASSWORD_FILE+x} ]; then
  MONGO_SHIELDY_PASSWORD=$(cat ${MONGO_SHIELDY_PASSWORD_FILE})
fi

if [ ! -z ${TOKEN_FILE+x} ]; then
  TOKEN=$(cat ${TOKEN_FILE})
  export TOKEN
fi

export MONGO=mongodb://${MONGO_SHIELDY_USERNAME}:${MONGO_SHIELDY_PASSWORD}@mongo:27017/${MONGO_INITDB_DATABASE}

yarn distribute

