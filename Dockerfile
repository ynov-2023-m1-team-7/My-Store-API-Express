# Construction step
FROM node:alpine as build

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install

EXPOSE 3030
CMD ["npm", "run", "start"]

#command to build the image
# docker build -t my-store-api-express .