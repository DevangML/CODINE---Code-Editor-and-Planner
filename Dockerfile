#  Dockerfile for Node Express Backend

FROM node:16.13.0-alpine3.14

# Create App Directory

WORKDIR /home/devangm/Desktop/repos/Devang/oce007

# Install Dependencies
COPY package*.json ./

# RUN yarn add -qyg nodemon@2.0.14
# RUN yarn add -qy
RUN yarn --silent

# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD ["yarn","dev"]