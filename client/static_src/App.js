import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Event from "./pages/Event";
import Events from "./pages/Events";
import Artist from "./pages/Artist";
import Artists from "./pages/Artists";
import About from "./pages/About";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Header />
          <div className="content">
            <Switch>
              <Route path="/events/:id/" component={Event} />
              <Route path="/events/" component={Events} />
              <Route path="/artists/:id/" component={Artist} />
              <Route path="/artists/" component={Artists} />
              <Route path="/about/" component={About} />
              <Route path="/" exact component={Home} />
              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}
