import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

import Logo from "../images/artreart-red.png";

const { Sider } = Layout;

export default class Sidebar extends React.Component {
  render() {
    return (
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
    );
  }
}
