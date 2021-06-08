FROM node:13 

COPY . /app

RUN npm install

EXPOSE 80

CMD cd app && npm run prod