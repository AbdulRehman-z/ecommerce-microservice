FROM node:alpine

#working directory
WORKDIR /usr/app

#install dependencies
COPY package.json .
RUN npm install --only=prod
COPY . .

#default command
CMD ["npm","run","dev"]