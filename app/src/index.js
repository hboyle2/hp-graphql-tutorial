import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "react-apollo";
import { ApolloClient, ApolloLink } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WizardList from "./components/WizardList";
import CreateWizard from "./components/CreateWizard";
import UpdateWizard from "./components/UpdateWizard";

const httpLink = createHttpLink({
  uri: "http://localhost:4000"
});
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route path="/" exact component={WizardList} />
        <Route path="/create-wizard" exact component={CreateWizard} />
        <Route path="/update-wizard" component={UpdateWizard} />
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
serviceWorker.unregister();
