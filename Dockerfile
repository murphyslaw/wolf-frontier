FROM denoland/deno:alpine

ARG GIT_REVISION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}

WORKDIR /app

COPY . .

RUN deno cache main.ts

USER deno
EXPOSE 8000

CMD ["run", "--allow-all", "main.ts"]
