FROM node:alpine

WORKDIR /usr/src
COPY package.json .
RUN yarn
COPY . .


