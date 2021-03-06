import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "@datapunt/asc-assets/static/fonts/fonts.css";

import { ApolloProvider } from "@apollo/react-hooks";
import { GlobalStyle, ThemeProvider, themeColor } from "@datapunt/asc-ui";
import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react";
import * as Sentry from "@sentry/browser";
import dotenv from "dotenv-flow";
import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";

import apolloClient from "./apolloClient";
import Router from "./components/Router";
import { matomo } from "./config/matomo";
import { sentryConfig } from "./config/sentry";
import { SessionProvider } from "./context";
import * as serviceWorker from "./serviceWorker";

dotenv.config();

// Enabling hot reloading (injecting style changes without hard reload)
if (module.hot) {
  module.hot.accept();
}

const AppGlobalStyle = createGlobalStyle`
  body {
    min-height: 100vh;
    background-color: ${themeColor("tint", "level3")};
  }
`;

Sentry.init(sentryConfig);

ReactDOM.render(
  <SessionProvider>
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <GlobalStyle />
        <AppGlobalStyle />
        <MatomoProvider value={createInstance(matomo)}>
          <Router />
        </MatomoProvider>
      </ThemeProvider>
    </ApolloProvider>
  </SessionProvider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
