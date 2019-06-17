FROM node:alpine

COPY package.json /
RUN npm install

ADD ./app.js /app.js
CMD ["node", "./app.js"]

EXPOSE 3000