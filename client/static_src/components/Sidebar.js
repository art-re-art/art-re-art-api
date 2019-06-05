import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import moment from "moment";

import Logo from "../images/artreart-red.png";
import "../styles/Sidebar.less";

const { Sider } = Layout;

class Sidebar extends React.Component {
  state = { event: {}, collapsed: true, broken: false };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  componentDidMount() {
    this.props.history.listen(() => {
      if (this.state.broken) {
        this.setState({
          collapsed: true
        });
      }
    });

    fetch("/api/events/")
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({
          event: data[0]
        });
      });
  }

  render() {
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        theme="light"
        onBreakpoint={broken => {
          this.setState({ collapsed: broken, broken: broken });
        }}
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
        {this.state.broken ? (
          <Icon
            className="trigger"
            type={this.state.collapsed ? "menu" : "close"}
            onClick={this.toggle}
          />
        ) : null}
        <div className="sidebar-logo">
          <img
            src={Logo}
            alt="Art/Re/Art Logo"
            className="sidebar-logo__image"
          />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["/"]}
          selectedKeys={[this.props.location.pathname]}
        >
          <Menu.Item key="/">
            <Link to="/">
              <Icon type="home" />
              <span className="nav-text">Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/about/">
            <Link to="/about/">
              <Icon type="question-circle" />
              <span className="nav-text">About</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/artists/">
            <Link to="/artists/">
              <Icon type="user" />
              <span className="nav-text">Artists</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/events/">
            <Link to="/events/">
              <Icon type="calendar" />
              <span className="nav-text">Shows</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/signup/">
            <Link to="/signup/">
              <Icon type="plus" />
              <span className="nav-text">Artist Signup</span>
            </Link>
          </Menu.Item>
        </Menu>
        <Link to={`/events/${this.state.event.id}/`} className="sidebar-event">
          <div>
            <div className="sidebar-event__title">{this.state.event.title}</div>
            <div>{moment(this.state.event.datetime).format("LLLL")}</div>
            {this.state.event.location ? (
              <div>
                <div>{this.state.event.location.title}</div>
                <div>{this.state.event.location.street}</div>
              </div>
            ) : null}
          </div>
        </Link>
      </Sider>
    );
  }
}

export default withRouter(Sidebar);
