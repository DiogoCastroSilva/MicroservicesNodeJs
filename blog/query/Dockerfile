FROM node:lts-alpine@sha256:a75f7cc536062f9266f602d49047bc249826581406f8bc5a6605c76f9ed18e98

ENV NODE_ENV production

WORKDIR  /usr/src/query

COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci --only=production

COPY . /usr/src/query

EXPOSE 4002

CMD ["npm", "start"]