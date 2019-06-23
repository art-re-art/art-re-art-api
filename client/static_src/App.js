import React from "react";
import ReactGA from "react-ga";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout, Icon } from "antd";
import WebFont from "webfontloader";
import "react-app-polyfill/stable";

import Pages from "./pages";
import Components from "./components";

import "./images/favicon.png";
import "./styles/App.less";

const {
  Event,
  Events,
  Artist,
  Artists,
  About,
  Mobile,
  Signup,
  Home,
  NoMatch
} = Pages;
const { Page, Sidebar, ScrollToTop } = Components;

export default class App extends React.Component {
  state = {
    collapsed: false,
    broken: false
  };

  componentDidMount() {
    let debug = false;
    if (process.env.NODE_ENV == "development") debug = true;
    ReactGA.initialize("UA-141212265-1", { debug: debug });
    WebFont.load({
      google: {
        families: ["Inconsolata"]
      }
    });
  }

  // Used on sider and hamburger
  _setCollapsed = collapsed => {
    this.setState({ collapsed: collapsed });
  };

  // Used on sider and hamburger
  _setBroken = broken => {
    this.setState({ broken: broken });
  };

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
            {this.state.broken && (
              <Icon
                className="trigger"
                type={this.state.collapsed ? "menu" : "close"}
                onClick={() => {
                  this._setCollapsed(!this.state.collapsed);
                }}
              />
            )}
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
