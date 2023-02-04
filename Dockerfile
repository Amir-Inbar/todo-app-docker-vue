FROM node:alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 5080
