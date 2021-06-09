FROM node:13 

COPY . .

RUN npm install

EXPOSE 80

CMD npm run prod