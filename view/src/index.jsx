import ReactDOM, { render } from "react-dom";
import { Provider } from "react-redux";
// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";

import App from "./App";
import store from "./redux/store";
import "./index.css";

// Sentry.init({
//   dsn: process.env.REACT_APP_SENTRY_DSN,
//   integrations: [new Integrations.BrowserTracing()],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    render(NextApp);
  });
}

// serviceWorker.register();
