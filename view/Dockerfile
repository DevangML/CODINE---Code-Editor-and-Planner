# Pull Docker Hub base image
FROM node:16.13.0-alpine3.14
# Set working directory
WORKDIR C:\Users\User\Documents\Projects\Devang\oce007\view
# Install app dependencies
COPY package*.json ./
RUN yarn add -qy
# Copy app to container
COPY . .
# Run the "dev" script in package.json
CMD ["yarn", "run", "dev"]