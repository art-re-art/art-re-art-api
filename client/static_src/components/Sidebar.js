import React from "react";
import ReactGA from "react-ga";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import moment from "moment";

import Logo from "../images/artreart-red.png";
import LogoRotated from "../images/artreart-red-rotated.png";
import "../styles/Sidebar.less";

const { Sider } = Layout;

class Sidebar extends React.Component {
  state = { event: {} };

  componentDidMount() {
    this.props.history.listen(() => {
      if (this.props.broken) {
        this.props.setCollapsed(true);
      }
    });

    fetch("/api/events/events/")
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
          this.props.setCollapsed(broken);
          this.props.setBroken(broken);
        }}
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
      >
        <div className="sidebar-logo">
          <img
            src={LogoRotated}
            alt="Art/Re/Art Logo"
            className="sidebar-logo__image-rotated"
          />
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
              <span className="nav-text">Home</span>
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
              <span className="nav-text">About</span>
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
              <span className="nav-text">Artists</span>
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
              <span className="nav-text">Shows</span>
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
              <span className="nav-text">Mobile app</span>
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
              <span className="nav-text">Artist signup</span>
            </Link>
          </Menu.Item>
        </Menu>
        <Link to={`/events/${this.state.event.id}/`} className="sidebar-event">
          <div>
            <div
              style={{
                color: "#ff0000",
                fontWeight: "700",
                textTransform: "uppercase"
              }}
            >
              Next Show:
            </div>
            <div className="sidebar-event__title">{this.state.event.title}</div>
            <div>{moment(this.state.event.datetime).format("LLLL")}</div>
            {this.state.event.location ? (
              <div>
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
