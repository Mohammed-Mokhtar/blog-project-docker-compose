# syntax=docker/dockerfile:1

FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV CYPRESS_INSTALL_BINARY=0

COPY package*.json ./
RUN npm ci --omit=dev

COPY --chown=node:node . .

USER node

EXPOSE 3000

CMD ["node", "index.js"]
