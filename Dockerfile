FROM node:20.10.0-alpine AS build
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
RUN npm run build --workspace=src/packages/ckeditor
RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/conf.d/default.conf
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/personal-space-web /usr/share/nginx/html

EXPOSE 80