FROM node:6-alpine

ADD views /app/views
ADD package.json /app
ADD server.js /app

RUN cd /app; npm install

ENV NODE_ENV production
ENV PORT 8080
EXPOSE 8080

WORKDIR "/app"
CMD [ "npm", "start" ]