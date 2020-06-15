FROM node:14.2-alpine3.11
RUN mkdir -p /usr/src/modulehandbook
RUN set -ex \
  && apk add --no-cache  bash
WORKDIR /usr/src/modulehandbook
COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# COPY . .
# dev instead maps . . with - .:/usr/src/modulehandbook in docker-compose.yml
EXPOSE 3004
CMD ["npm", "start"]
