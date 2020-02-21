#!/bin/sh

npm install --no-optional
npm run start
exec "$@"
