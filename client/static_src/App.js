import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Layout, Menu, Icon, PageHeader } from "antd";

import Logo from "./images/artreart-red.png";

import Page from "./components/Page";

import Event from "./pages/Event";
import Events from "./pages/Events";
import Artist from "./pages/Artist";
import Artists from "./pages/Artists";
import About from "./pages/About";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";

const { Header, Content, Footer, Sider } = Layout;

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            theme="light"
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="logo">
              <img
                src={Logo}
                alt="Art/Re/Art Logo"
                style={{ width: "100%", padding: 15 }}
              />
            </div>
            <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Link to="/">
                  <Icon type="home" />
                  <span className="nav-text">Home</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/about/">
                  <Icon type="question-circle" />
                  <span className="nav-text">About</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/artists/">
                  <Icon type="user" />
                  <span className="nav-text">Artists</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/events/">
                  <Icon type="calendar" />
                  <span className="nav-text">Shows</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Switch>
            <Route path="/events/:id/"
              render={props => (
                <Page
                  {...props}
                  component={Event}
                  title="Event"
                  subtitle="I'm an event :)"
                />
              )} />
            <Route path="/events/"
              render={props => (
                <Page
                  {...props}
                  component={Events}
                  title="Shows"
                  subtitle="All the great shows"
                />
              )} />
            <Route path="/artists/:id/"
              render={props => (
                <Page
                  {...props}
                  component={Artist}
                  title="Artist"
                  subtitle="I'm an artist :)"
                />
              )} />
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
            <Route path="/about/"
              render={props => (
                <Page
                  {...props}
                  component={About}
                  title="About"
                  subtitle="All about Art/Re/Art"
                />
              )} />
            <Route path="/" exact
              render={props => (
                <Page
                  {...props}
                  component={Home}
                  title="Home"
                  subtitle="We are Art/Re/Art"
                />
              )} />
            <Route component={NoMatch} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}
