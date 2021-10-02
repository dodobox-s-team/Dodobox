FROM node:lts-slim as build-stage
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
EXPOSE 3000
CMD ["yarn", "dev", "--host"]