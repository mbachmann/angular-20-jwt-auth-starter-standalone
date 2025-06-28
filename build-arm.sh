#!/bin/sh


docker buildx build --platform linux/arm64 -t uportal/angular-20-jwt-auth -f Dockerfile .
