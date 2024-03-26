FROM node

RUN apt-get update

RUN mkdir /myapp

WORKDIR /myapp

COPY package.json .
COPY yarn.lock .

RUN yarn install

# RUN useradd -m deploy
# USER deploy

COPY . .

# CMD node src/index.js

