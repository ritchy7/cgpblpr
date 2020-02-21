#!/bin/sh

pip install -r /usr/src/cgpy/requirements.txt
python /usr/src/cgpy/backend/run.py
exec "$@"
