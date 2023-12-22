FROM node:20.10.0-alpine AS build
RUN mkdir -p /app
WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY . /app/
RUN npm run build --workspace=src/packages/ckeditor
RUN npm run prod:ssr

FROM node:20-slim

COPY --from=build /app/dist/personal-space-web/ dist/personal-space-web/

CMD ["node", "dist/personal-space-web/server/main.js"]

EXPOSE 4000