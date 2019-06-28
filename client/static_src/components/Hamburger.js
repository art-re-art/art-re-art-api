import React from "react";
import { Icon } from "antd";
import { Link } from "react-router-dom";

import "../styles/Hamburger.less";

export default class Hamburger extends React.Component {
  state = {
    overlayVisible: false
  };

  _show = () => {
    this.setState({
      overlayVisible: true
    });
  };

  _hide = () => {
    this.setState({
      overlayVisible: false
    });
  };

  render() {
    return (
      <div className="hamburger">
        <Icon
          className="hamburger__button"
          type={this.state.overlayVisible ? "close" : "menu"}
          onClick={this.state.overlayVisible ? this._hide : this._show}
        />
        {this.state.overlayVisible && (
          <div className="hamburger__overlay">
            Hi :)
            <br />
            <br />
            <Link to="/about/" onClick={this._hide}>
              About
            </Link>
            <br />
            <Link to="/artists/" onClick={this._hide}>
              Artists
            </Link>
            <br />
            <Link to="/events/" onClick={this._hide}>
              Events
            </Link>
          </div>
        )}
      </div>
    );
  }
}
