# USAGE:
# docker build -t getstartednode .
# docker run -p 3000:3000 getstartednode
# http://localhost:3000

FROM ibmcom/ibmnode

ADD . /app

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

WORKDIR "/app"

RUN npm install
CMD ["npm", "start"]
