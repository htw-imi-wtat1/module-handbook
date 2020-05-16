FROM node:14.2-alpine3.11
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# COPY . .
# dev instead maps . . with - .:/usr/src/app in docker-compose.yml
EXPOSE 3004
CMD ["npm", "start"]
