#!/bin/sh

docker buildx build --platform linux/amd64 -t uportal/angular-20-jwt-auth -f Dockerfile .
