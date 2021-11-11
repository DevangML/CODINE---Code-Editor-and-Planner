# Dockerfile for React client

# Build react client
FROM node:16.13.0-alpine3.14

# Working directory be app
WORKDIR C:\Users\User\Documents\Projects\Devang\oce007\view

COPY package*.json ./

###  Installing dependencies

RUN yarn --silent

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["yarn,"start"]