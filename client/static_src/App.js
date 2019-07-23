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
import "./styles/Transitions.less";

const {
  Event,
  Events,
  Artist,
  Artists,
  About,
  Mobile,
  Signup,
  Home,
  NoMatch,
  Privacy,
  Terms
} = Pages;
const { Page, Sidebar, ScrollToTop, CustomMouse, Hamburger } = Components;

export default class App extends React.Component {
  componentDidMount() {
    console.log(
      "%c🔨 with ❤️ by ART/RE/ART",
      "font-size: 10px; font-weight: bold; color:#fff; background-color: #4D84F1; padding:5px; border-radius: 4px;"
    );
    let debug = false;
    if (process.env.NODE_ENV == "development") debug = true;
    ReactGA.initialize("UA-141212265-1", { debug: debug });
    WebFont.load({
      google: {
        families: ["Inconsolata"]
      }
    });
  }

  render() {
    return (
      <Router>
        <Layout>
          <CustomMouse />
          <ScrollToTop />
          <Hamburger />
          <Sidebar />
          <Switch>
            <Route
              path="/events/:id-:slug/"
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
              path="/artists/:id-:slug/"
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
              path="/privacy/"
              render={props => (
                <Page {...props} component={Privacy} title="Privacy Policy" />
              )}
            />
            <Route
              path="/terms/"
              render={props => (
                <Page {...props} component={Terms} title="Terms & Conditions" />
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
        </Layout>
      </Router>
    );
  }
}
