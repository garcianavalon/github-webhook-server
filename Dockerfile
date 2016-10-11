FROM node:6.2.2

MAINTAINER Enrique Garcia Navalon "garcianavalon@gmail.com"

# Our app directory
RUN mkdir -p /app
WORKDIR /app

# nodemon for live reloading in development
RUN npm install -gq nodemon

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
COPY package.json ./
RUN npm install -q

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
COPY . /app

EXPOSE 3000

CMD [ "npm", "start" ]