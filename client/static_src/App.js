import React from "react";
import ReactGA from "react-ga";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout, Icon } from "antd";

import Page from "./components/Page";
import Sidebar from "./components/Sidebar";
import ScrollToTop from "./components/ScrollToTop";

import Event from "./pages/Event";
import Events from "./pages/Events";
import Artist from "./pages/Artist";
import Artists from "./pages/Artists";
import About from "./pages/About";
import Mobile from "./pages/Mobile";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";

import "./images/favicon.png";

import "./styles/App.less";

import "react-app-polyfill/stable";

import WebFont from "webfontloader";

export default class App extends React.Component {
  state = {
    collapsed: false,
    broken: false
  };

  _setCollapsed = collapsed => {
    this.setState({ collapsed: collapsed });
  };

  _setBroken = broken => {
    this.setState({ broken: broken });
  };

  componentDidMount() {
    let debug = false;
    if (process.env.NODE_ENV == "development") debug = true;
    ReactGA.initialize("UA-141212265-1", { debug: debug });
    WebFont.load({
      google: {
        families: ["Inconsolata", "Open Sans:700"]
      }
    });
  }

  render() {
    return (
      <Router>
        <Layout>
          <ScrollToTop>
            <Sidebar
              collapsed={this.state.collapsed}
              broken={this.state.broken}
              setCollapsed={this._setCollapsed}
              setBroken={this._setBroken}
            />
            {this.state.broken ? (
              <Icon
                className="trigger"
                type={this.state.collapsed ? "menu" : "close"}
                onClick={() => {
                  this._setCollapsed(!this.state.collapsed);
                }}
              />
            ) : null}
            <Switch>
              <Route
                path="/events/:id/"
                render={props => (
                  <Page {...props} component={Event} title="Show" />
                )}
              />
              <Route
                path="/events/"
                render={props => (
                  <Page {...props} component={Events} title="Shows" />
                )}
              />
              <Route
                path="/artists/:id/"
                render={props => (
                  <Page {...props} component={Artist} title="Artist" />
                )}
              />
              <Route
                path="/artists/"
                render={props => (
                  <Page {...props} component={Artists} title="Artists" />
                )}
              />
              <Route
                path="/about/"
                render={props => (
                  <Page {...props} component={About} title="About" />
                )}
              />
              <Route
                path="/mobile/"
                render={props => (
                  <Page {...props} component={Mobile} title="Mobile" />
                )}
              />
              <Route
                path="/signup/"
                render={props => (
                  <Page {...props} component={Signup} title="Artist Signup" />
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
                    title="A series of pop up art events in downtown Morganton, NC."
                  />
                )}
              />
              <Route component={NoMatch} />
            </Switch>
          </ScrollToTop>
        </Layout>
      </Router>
    );
  }
}
