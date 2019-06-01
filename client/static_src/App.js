import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import Page from "./components/Page";
import Sidebar from "./components/Sidebar";

import Event from "./pages/Event";
import Events from "./pages/Events";
import Artist from "./pages/Artist";
import Artists from "./pages/Artists";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";

import "./images/favicon.png";

import "./styles/App.less";

import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Inconsolata", "Open Sans:700"]
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Sidebar />
          <Switch>
            <Route
              path="/events/:id/"
              render={props => (
                <Page
                  {...props}
                  component={Event}
                  title="Event"
                />
              )}
            />
            <Route
              path="/events/"
              render={props => (
                <Page
                  {...props}
                  component={Events}
                  title="Shows"
                />
              )}
            />
            <Route
              path="/artists/:id/"
              render={props => (
                <Page
                  {...props}
                  component={Artist}
                  title="Artist"
                />
              )}
            />
            <Route
              path="/artists/"
              render={props => (
                <Page
                  {...props}
                  component={Artists}
                  title="Artists"
                />
              )}
            />
            <Route
              path="/about/"
              render={props => (
                <Page
                  {...props}
                  component={About}
                  title="About"
                />
              )}
            />
            <Route
              path="/signup/"
              render={props => (
                <Page
                  {...props}
                  component={Signup}
                  title="Artist Signup"
                />
              )}
            />
            <Route
              path="/"
              exact
              render={props => (
                <Page
                  {...props}
                  component={Home}
                  hideHeader
                  title="Home"
                />
              )}
            />
            <Route component={NoMatch} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}
