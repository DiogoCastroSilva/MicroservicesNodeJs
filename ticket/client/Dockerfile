FROM node:lts-alpine@sha256:a75f7cc536062f9266f602d49047bc249826581406f8bc5a6605c76f9ed18e98 AS build

WORKDIR /usr/src/client

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production

COPY . .

RUN npm run build


FROM node:lts-alpine@sha256:a75f7cc536062f9266f602d49047bc249826581406f8bc5a6605c76f9ed18e98

ENV NODE_ENV=production

WORKDIR /usr/src/client

COPY --from=build /usr/src/client/package*.json ./
COPY --from=build /usr/src/client/.next ./.next
COPY --from=build /usr/src/client/node_modules ./node_modules
# COPY --from=build /usr/src/build/public ./public

EXPOSE 3000
CMD ["npm", "run", "dev"]