FROM node:20.18

# install pnpm
RUN npm i -g pnpm
# pnpm build
WORKDIR /usr/src/app

COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm tsup
RUN pnpm prune --prod

ENV DATABASE_URL="postgresql://docker:docker@localhost:5432/upload"
ENV CLOUDFLARE_ACCOUNT_ID=""
ENV CLOUDFLARE_ACCESS_KEY_ID=""
ENV CLOUDFLARE_SECRET_ACCESS_KEY=""
ENV CLOUDFLARE_BUCKET=""
ENV CLOUDFLARE_PUBLIC_URL="http://localhost"

# expose port
EXPOSE 3333
# start server
CMD ["pnpm", "start"]