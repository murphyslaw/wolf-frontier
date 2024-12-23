#!/bin/sh

sed -i '' -e "s/RELEASE_ID=.*/RELEASE_ID='$(git rev-parse --short HEAD)'/g" .env
sed -i '' -e "s/RELEASE_DATE=.*/RELEASE_DATE='$(date -u "+%Y-%m-%d %H:%M")'/g" .env

source .env

docker build --no-cache --build-arg GIT_REVISION=$(git rev-parse HEAD) --platform linux/amd64 --tag $IMAGE_NAME .
docker push $IMAGE_NAME

ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_WORK_DIR && sed -i -e \"s/RELEASE_ID=.*/RELEASE_ID='$RELEASE_ID'/g\" .env && exit"
ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_WORK_DIR && sed -i -e \"s/RELEASE_DATE=.*/RELEASE_DATE='$RELEASE_DATE'/g\" .env && exit"

ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_WORK_DIR && docker compose pull && docker compose up -d && exit"
