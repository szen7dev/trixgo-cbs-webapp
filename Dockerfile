ARG NODE_VERSION=14
FROM node:${NODE_VERSION}-alpine as build
WORKDIR /webapp
RUN apk add --no-cache yarn

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install
ARG NODE_BUILD_ARGS=''
ENV HTTPS=http
ENV PORT=3000
ENV HOST=localhost
ENV NODE_ENV=development
ENV REACT_APP_ENV=staging
ENV REACT_APP_WEBSITE_NAME="Trixgo | Quản lý dự án"
ENV REACT_APP_API_DOMAIN_LOCAL=
ENV REACT_APP_API_DOMAIN_STAGING=
ENV REACT_APP_URL_S3=
ENV REACT_APP_URL_S3_USER=
ENV REACT_APP_URL_S3_COMPANY=
ENV REACT_APP_URL_S3_CONTACT=
ENV REACT_APP_URL_S3_PROJECT=
ENV REACT_APP_URL_SOCKET_LOCAL=
ENV REACT_APP_URL_SOCKET_STAGING=
ENV REACT_APP_ONESIGNAL_APP_ID_STAGING=
ENV REACT_APP_ONESIGNAL_APP_ID_LOCAL=
ENV REACT_APP_PLATFORM=1
ENV REACT_APP_DOMAIN=
ENV REACT_APP_TINYMCE_API_KEY=
ENV REACT_APP_SENTRY_DSN=
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