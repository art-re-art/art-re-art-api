import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Artists from "./pages/Artists";
import NoMatch from "./pages/NoMatch";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Header />
          <div className="content">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about/" component={About} />
              <Route path="/events/" component={Events} />
              <Route path="/artists/" component={Artists} />
              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}
