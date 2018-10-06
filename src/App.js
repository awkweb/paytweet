import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "./HomePage.js";
import CreatorPage from "./CreatorPage.js";
import SubscribePage from "./SubscribePage.js";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/creator" component={CreatorPage} />
          <Route exact path="/:creatorUsername" component={SubscribePage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
