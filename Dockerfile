# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.12.0

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

# BUILD STAGE
FROM base as build

COPY . .

RUN npm ci \
    && npx prisma generate \
    && npm run build \
    && npm prune --omit=dev

# FINAL STAGE
FROM base as final

ENV NODE_ENV production

COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/prisma ./prisma

USER node

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
