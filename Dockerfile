FROM denoland/deno:alpine

EXPOSE 8000

ARG GIT_REVISION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}

WORKDIR /app

COPY . .

RUN deno cache main.ts
RUN deno task build

CMD ["run", "--allow-all", "main.ts"]
