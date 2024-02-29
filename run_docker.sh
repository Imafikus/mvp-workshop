#!/bin/bash 

docker build  -t mvp:latest .                                               
docker run --rm --name mvp -p 8000:8000 mvp:latest 
