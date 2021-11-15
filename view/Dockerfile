# Dockerfile for React client

# Build react client
FROM node:16.13-alpine

# Working directory be app
WORKDIR /home/Devang/Desktop/Projects/oce007/view

COPY package*.json ./

###  Installing dependencies

RUN yarn --silent

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["yarn","start"]