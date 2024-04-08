FROM node

RUN apt-get update

RUN mkdir /myapp

WORKDIR /myapp

COPY . .

RUN yarn build

