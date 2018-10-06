import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StripeProvider, Elements } from "react-stripe-elements";

import HomePage from "./HomePage.js";
import CreatorPage from "./CreatorPage.js";
import SubscribePage from "./SubscribePage.js";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_wL4QYRyypDqOwAQk2pdFPS1g">
        <Elements>
          <Router>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/creator" component={CreatorPage} />
              <Route exact path="/:creatorUsername" component={SubscribePage} />
            </Switch>
          </Router>
        </Elements>
      </StripeProvider>
    );
  }
}

export default App;
