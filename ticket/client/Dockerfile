FROM node:lts-alpine@sha256:a75f7cc536062f9266f602d49047bc249826581406f8bc5a6605c76f9ed18e98 AS deps

WORKDIR /usr/src/client

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production


# Rebuild the source code only when needed
FROM node:lts-alpine@sha256:a75f7cc536062f9266f602d49047bc249826581406f8bc5a6605c76f9ed18e98 AS builder

WORKDIR /usr/src/client

COPY . .
COPY --from=deps /usr/src/client/node_modules ./node_modules

RUN npm run build


FROM node:lts-alpine@sha256:a75f7cc536062f9266f602d49047bc249826581406f8bc5a6605c76f9ed18e98 as runner

WORKDIR /usr/src/client

ENV NODE_ENV=production

COPY --from=builder /usr/src/client/.next ./.next
COPY --from=builder /usr/src/client/node_modules ./node_modules
# COPY --from=build /usr/src/build/public ./public

EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]