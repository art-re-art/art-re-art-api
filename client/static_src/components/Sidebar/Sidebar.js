import React from "react";
import ReactGA from "react-ga";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon, Tooltip } from "antd";

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
            <Tooltip placement="right" title="Home">
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
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="/about/">
            <Tooltip placement="right" title="About">
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
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="/artists/">
            <Tooltip placement="right" title="Artists">
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
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="/events/">
            <Tooltip placement="right" title="Events">
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
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="/signup/">
            <Tooltip placement="right" title="Sign Up!">
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
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="/mobile/">
            <Tooltip placement="right" title="Mobile">
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
            </Tooltip>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(Sidebar);
