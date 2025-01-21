FROM node:18-alpine

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

ARG DB_USER
ARG DB_PASSWORD
ARG DB_HOST
ARG DB_NAME
ARG DB_OPTIONS

# String de conexão do MongoDB Atlas
ENV DB_CONNECTION_STRING="mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?${DB_OPTIONS}"

EXPOSE 3000

CMD ["npm", "start"]
