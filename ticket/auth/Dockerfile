
FROM node:lts-alpine@sha256:a75f7cc536062f9266f602d49047bc249826581406f8bc5a6605c76f9ed18e98 AS builder

WORKDIR /usr/src/auth

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

COPY . .
RUN npm run build


FROM node:lts-alpine@sha256:a75f7cc536062f9266f602d49047bc249826581406f8bc5a6605c76f9ed18e98 AS server

ENV NODE_ENV production

WORKDIR /usr/src/auth

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production

COPY --from=builder ./usr/src/auth/build ./build

EXPOSE 4000

CMD ["npm", "start"]