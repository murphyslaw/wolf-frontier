#!/bin/sh

source .env

docker build --build-arg GIT_REVISION=$(git rev-parse HEAD) --platform linux/amd64 --tag $IMAGE_NAME .
docker push $IMAGE_NAME

ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_WORK_DIR && docker compose pull && docker compose up -d && exit"
