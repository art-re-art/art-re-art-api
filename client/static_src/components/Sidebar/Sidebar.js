import React from "react";
import ReactGA from "react-ga";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

import LogoRotated from "../../images/artreart-red-rotated.png";
import "./Sidebar.less";

const { Sider } = Layout;

class Sidebar extends React.Component {
  render() {
    return (
      <Sider theme="light" width={70}>
        <Link to="/">
          <img
            src={LogoRotated}
            alt="ART/RE/ART"
            style={{ width: "100%", height: "auto", padding: ".5rem" }}
          />
        </Link>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["/"]}
          selectedKeys={[this.props.location.pathname]}
        >
          <Menu.Item key="/">
            <Link
              to="/"
              onClick={() => {
                ReactGA.event({
                  category: "Side Nav",
                  action: "Home Button"
                });
              }}
            >
              <Icon type="home" />
            </Link>
          </Menu.Item>
          <Menu.Item key="/about/">
            <Link
              to="/about/"
              onClick={() => {
                ReactGA.event({
                  category: "Side Nav",
                  action: "About Button"
                });
              }}
            >
              <Icon type="question-circle" />
            </Link>
          </Menu.Item>
          <Menu.Item key="/artists/">
            <Link
              to="/artists/"
              onClick={() => {
                ReactGA.event({
                  category: "Side Nav",
                  action: "Artists Button"
                });
              }}
            >
              <Icon type="user" />
            </Link>
          </Menu.Item>
          <Menu.Item key="/events/">
            <Link
              to="/events/"
              onClick={() => {
                ReactGA.event({
                  category: "Side Nav",
                  action: "Events Button"
                });
              }}
            >
              <Icon type="calendar" />
            </Link>
          </Menu.Item>
          <Menu.Item key="/mobile/">
            <Link
              to="/mobile/"
              onClick={() => {
                ReactGA.event({
                  category: "Side Nav",
                  action: "Mobile Button"
                });
              }}
            >
              <Icon type="mobile" />
            </Link>
          </Menu.Item>
          <Menu.Item key="/signup/">
            <Link
              to="/signup/"
              onClick={() => {
                ReactGA.event({
                  category: "Side Nav",
                  action: "Signup Button"
                });
              }}
            >
              <Icon type="plus" />
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(Sidebar);
