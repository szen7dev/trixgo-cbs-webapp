ARG NODE_VERSION=14
FROM node:${NODE_VERSION}-alpine as build
WORKDIR /webapp
RUN apk add --no-cache yarn

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install

COPY . .

RUN echo "HTTPS=${HTTPS}" >> .env
RUN echo "PORT=${PORT}" >> .env
RUN echo "HOST=${HOST}" >> .env
RUN echo "NODE_ENV=${NODE_ENV}" >> .env
RUN echo "REACT_APP_ENV=${REACT_APP_ENV}" >> .env
RUN echo "REACT_APP_WEBSITE_NAME=${REACT_APP_WEBSITE_NAME}" >> .env
RUN echo "REACT_APP_API_DOMAIN_LOCAL=${REACT_APP_API_DOMAIN_LOCAL}" >> .env
RUN echo "REACT_APP_API_DOMAIN_STAGING=${REACT_APP_API_DOMAIN_STAGING}" >> .env
RUN echo "REACT_APP_URL_S3=${REACT_APP_URL_S3}" >> .env
RUN echo "REACT_APP_URL_S3_USER=${REACT_APP_URL_S3_USER}" >> .env
RUN echo "REACT_APP_URL_S3_COMPANY=${REACT_APP_URL_S3_COMPANY}" >> .env
RUN echo "REACT_APP_URL_S3_CONTACT=${REACT_APP_URL_S3_CONTACT}" >> .env
RUN echo "REACT_APP_URL_S3_PROJECT=${REACT_APP_URL_S3_PROJECT}" >> .env
RUN echo "REACT_APP_URL_SOCKET_LOCAL=${REACT_APP_URL_SOCKET_LOCAL}" >> .env
RUN echo "REACT_APP_URL_SOCKET_STAGING=${REACT_APP_URL_SOCKET_STAGING}" >> .env
RUN echo "REACT_APP_ONESIGNAL_APP_ID_STAGING=${REACT_APP_ONESIGNAL_APP_ID_STAGING}" >> .env
RUN echo "REACT_APP_ONESIGNAL_APP_ID_LOCAL=${REACT_APP_ONESIGNAL_APP_ID_LOCAL}" >> .env
RUN echo "REACT_APP_PLATFORM=${REACT_APP_PLATFORM}" >> .env
RUN echo "REACT_APP_DOMAIN=${REACT_APP_DOMAIN}" >> .env
RUN echo "REACT_APP_TINYMCE_API_KEY=${REACT_APP_TINYMCE_API_KEY}" >> .env
RUN echo "REACT_APP_SENTRY_DSN=${REACT_APP_SENTRY_DSN}" >> .env

ARG NODE_BUILD_ARGS=''
RUN yarn run build $NODE_BUILD_ARGS

FROM nginx:alpine as publish
COPY docker/nginx.conf /etc/nginx/nginx.conf
# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
# Copy from builder
COPY --from=build /webapp/build /usr/share/nginx/html
EXPOSE 3000 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]