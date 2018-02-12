FROM node:6.12.3

# Create app directory
RUN mkdir -p /src/app
WORKDIR /src/app

COPY package.json /src/app/
RUN npm install

# Bundle app source
COPY . /src/app

# Build and optimize react app
RUN npm run build

EXPOSE 3000

ARG NODE_ENV

ENV NODE_ENV ${NODE_ENV}

# defined in package.json
CMD [ "npm", "run", "start" ]
