import React from "react";
import { Icon } from "antd";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import Logo from "../../images/artreart-red.png";
import "./Hamburger.less";

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
        <CSSTransition
          in={this.state.overlayVisible}
          timeout={1000}
          classNames="transition--fade"
          unmountOnExit
        >
          <div className="hamburger__overlay">
            <div className="overlay">
              <img src={Logo} alt="ART/RE/ART" className="overlay__logo" />
              <Link to="/about/" onClick={this._hide} className="overlay__link">
                About—
              </Link>
              <Link
                to="/artists/"
                onClick={this._hide}
                className="overlay__link"
              >
                Artists—
              </Link>
              <Link
                to="/events/"
                onClick={this._hide}
                className="overlay__link"
              >
                Events—
              </Link>
              <Link
                to="/mobile/"
                onClick={this._hide}
                className="overlay__link"
              >
                Mobile—
              </Link>
              <Link
                to="/signup/"
                onClick={this._hide}
                className="overlay__link"
              >
                Signup—
              </Link>
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}
