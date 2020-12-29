import React from "react";
import ReactDOM from "react-dom";
import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import { AUTH_TYPE } from "aws-appsync";
import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
} from "@apollo/client";

/** Ant design */
import "antd/dist/antd.css";

/** App entry */
import App from "./App";

/** AWS config */
import AppSyncConfig from "./aws-exports";

const config = {
  url: AppSyncConfig.GraphQlApiUrl,
  region: process.env.REACT_APP_REGION,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: AppSyncConfig.GraphQlApiKeyDefault,
  },
};

const client = new ApolloClient({
  link: ApolloLink.from([
    createAuthLink(config),
    createSubscriptionHandshakeLink(config),
  ]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
