FROM node:20.18 AS base
# install pnpm
RUN npm i -g pnpm

FROM base AS dependencies
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

FROM base AS builder

WORKDIR /usr/src/app

COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .

RUN pnpm tsup
RUN pnpm prune --prod

FROM node:23-alpine AS deployment

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

ENV DATABASE_URL="postgresql://docker:docker@localhost:5432/upload"
ENV CLOUDFLARE_ACCOUNT_ID=""
ENV CLOUDFLARE_ACCESS_KEY_ID=""
ENV CLOUDFLARE_SECRET_ACCESS_KEY=""
ENV CLOUDFLARE_BUCKET=""
ENV CLOUDFLARE_PUBLIC_URL="http://localhost"

# expose port
EXPOSE 3333
# start server
CMD ["node", "dist/infra/http/server.js"]