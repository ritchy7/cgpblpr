#!/bin/sh

pip install -r /usr/src/app/requirements.txt
python /usr/src/app/backend/run.py
exec "$@"
