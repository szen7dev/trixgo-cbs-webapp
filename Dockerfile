ARG NODE_VERSION=18
FROM node:${NODE_VERSION}-alpine as build
WORKDIR /webapp
RUN apk add --no-cache yarn

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install
ARG NODE_BUILD_ARGS=''
COPY . .
RUN yarn run build $NODE_BUILD_ARGS

FROM nginx:alpine as publish
COPY docker/nginx.conf /etc/nginx/nginx.conf
# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
# Copy from builder
COPY --from=build /webapp/build /usr/share/nginx/html
EXPOSE 3000 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]