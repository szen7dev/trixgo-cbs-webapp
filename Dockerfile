ARG NODE_VERSION=14
FROM node:${NODE_VERSION}-alpine as build
WORKDIR /webapp
RUN apk add --no-cache yarn

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install

COPY . .

RUN node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))'
ARG NODE_OPTIONS="--max-old-space-size=12288"
ARG NODE_ARGS="--parallel 16"
RUN node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))'
RUN export NODE_OPTIONS=${NODE_OPTIONS} && yarn run build $NODE_ARGS

FROM nginx:alpine as publish
COPY docker/nginx.conf /etc/nginx/nginx.conf
# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
# Copy from builder
COPY --from=build /webapp/build /usr/share/nginx/html
EXPOSE 3000 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
