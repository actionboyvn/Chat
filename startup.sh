#!/bin/bash

cd backend

pip install -r requirements.txt

uvicorn service:app --host 0.0.0.0 --port 8085