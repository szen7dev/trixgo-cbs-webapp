import React from "react";
import ReactDOM from "react-dom";
// import * as Sentry from "@sentry/react";
// import { BrowserTracing } from "@sentry/tracing";
import { Provider } from "react-redux";

import Store from "redux/store";

import App from "App";

// import reportWebVitals from "reportWebVitals";
// import * as serviceWorker from "./serviceWorker";

// if(['staging', 'production'].includes(process.env.REACT_APP_ENV)) {
//   Sentry.init({
//     dsn: process.env.REACT_APP_SENTRY_DSN,
//     integrations: [new BrowserTracing()],
//     // integrations: [
//     //   new (Sentry.Integrations as any).BrowserTracing({
//     //       tracingOrigins: [
//     //         '::1',
//     //         process.env.REACT_APP_API_DOMAIN_STAGING,
//     //         process.env.REACT_APP_API_DOMAIN_LOCAL,
//     //       ],
//     //   }),
//     // ],

//     // Set tracesSampleRate to 1.0 to capture 100%
//     // of transactions for performance monitoring.
//     // We recommend adjusting this value in production
//     tracesSampleRate: 1.0,
//   });
// }

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister(); // This method will remove all service worker registed in app, includes onesignal
