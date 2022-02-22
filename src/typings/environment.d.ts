/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";

    HTTPS: string;
    PORT: string;
    HOST: string;

    REACT_APP_ENV: string;
    REACT_APP_WEBSITE_NAME: string;

    REACT_APP_API_DOMAIN_LOCAL: string;
    REACT_APP_API_DOMAIN_STAGING: string;

    REACT_APP_MOVIE_API_TOKEN: string;
    REACT_APP_MOVIE_API_KEY: string;

    REACT_APP_URL_S3: string;
    REACT_APP_URL_S3_USER: string;
    REACT_APP_URL_S3_COMPANY: string;
    REACT_APP_URL_S3_CONTACT: string;
    REACT_APP_URL_S3_PROJECT: string;

    REACT_APP_URL_SOCKET_LOCAL: string;
    REACT_APP_URL_SOCKET_STAGING: string;

    REACT_APP_ONESIGNAL_APP_ID_STAGING: string;
    REACT_APP_ONESIGNAL_APP_ID_LOCAL: string;

    REACT_APP_PLATFORM: string;
    REACT_APP_DOMAIN: string;
  }
}
