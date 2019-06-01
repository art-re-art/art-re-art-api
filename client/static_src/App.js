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
                  subtitle="I'm an event :)"
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
                  subtitle="All the great shows"
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
                  subtitle="I'm an artist :)"
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
                  subtitle="All the artists who have participated in Art/Re/Art"
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
                  subtitle="All about Art/Re/Art"
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
                  subtitle="We are Art/Re/Art"
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
