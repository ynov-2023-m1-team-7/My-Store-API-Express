# Construction step
FROM node:alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3030
CMD ["npm", "run", "start"]

#command to build the image
# docker build -t my-store-api-express .

#Docker Run
#docker run -d --name my-store-api-express --env-file .env -p 3030:3030 -d my-store-api-express