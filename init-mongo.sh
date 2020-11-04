#!/bin/bash
set -Eeuo pipefail

if [ ! -z ${MONGO_SHIELDY_PASSWORD_FILE+x} ]; then
  MONGO_SHIELDY_PASSWORD=$(cat ${MONGO_SHIELDY_PASSWORD_FILE})
fi

if [ "$MONGO_SHIELDY_USERNAME" ] && [ "$MONGO_SHIELDY_PASSWORD" ]; then
  "${mongo[@]}" -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase "$rootAuthDatabase" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.createUser({ 
      user: $(_js_escape "$MONGO_SHIELDY_USERNAME"), 
      pwd: $(_js_escape "$MONGO_SHIELDY_PASSWORD"), 
      roles: [{ role: "readWrite", db: $(_js_escape "$MONGO_INITDB_DATABASE")}]
    });
EOJS
fi

