FROM node:lts-alpine@sha256:a75f7cc536062f9266f602d49047bc249826581406f8bc5a6605c76f9ed18e98

ENV NODE_ENV production

WORKDIR /usr/src/client

COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci --only=production

COPY . /usr/src/client

EXPOSE 3000

CMD ["npm", "start"]