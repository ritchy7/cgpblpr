#!/bin/sh

pip install -r /usr/src/cgpy/backend/requirements/requirements.txt
python /usr/src/cgpy/backend/run.py
exec "$@"
