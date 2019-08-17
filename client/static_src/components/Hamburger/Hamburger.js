import React from "react";
import { Icon, Badge } from "antd";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import axios from "axios";

import Logo from "../../images/artreart-red.png";
import "./Hamburger.less";

export default class Hamburger extends React.Component {
  state = {
    overlayVisible: false,
    cosmics: null,
    isLoading: true
  };

  componentDidMount() {
    axios.get("/api/cosmics/").then(response => {
      this.setState({
        cosmics: response.data,
        isLoading: false
      });
    });
  }

  _show = () => {
    this.setState({
      overlayVisible: true
    });
    document.body.style.overflowY = "hidden";
  };

  _hide = () => {
    this.setState({
      overlayVisible: false
    });
    document.body.style.overflowY = "scroll";
  };

  render() {
    const cosmics = this.state.cosmics;

    if (this.state.isLoading) return null;

    return (
      <div className="hamburger">
        <Icon
          className="hamburger__button"
          type={this.state.overlayVisible ? "close" : "menu"}
          onClick={this.state.overlayVisible ? this._hide : this._show}
        />
        <div className="hamburger__panels">
          {Array(5)
            .fill()
            .map((_, i) => {
              return (
                <CSSTransition
                  key={i}
                  in={this.state.overlayVisible}
                  timeout={2000}
                  classNames="transition--growdown"
                  unmountOnExit
                >
                  <div
                    className={
                      `panels__${i} ` +
                      (!this.state.overlayVisible && `panels__${i}--delayed`)
                    }
                  ></div>
                </CSSTransition>
              );
            })}
        </div>
        <CSSTransition
          in={this.state.overlayVisible}
          timeout={2000}
          classNames="transition--fadeupskew"
          unmountOnExit
        >
          <div
            className={
              "hamburger__overlay " +
              (this.state.overlayVisible && "hamburger__overlay--delayed")
            }
          >
            <div className="overlay">
              <img src={Logo} alt="ART/RE/ART" className="overlay__logo" />
              <ul className="overlay__list">
                <li className="overlay__item">
                  <Link
                    to="/about/"
                    onClick={this._hide}
                    className="overlay__link"
                  >
                    About
                  </Link>
                </li>
                <li className="overlay__item">
                  <Link
                    to="/artists/"
                    onClick={this._hide}
                    className="overlay__link"
                  >
                    Artists
                    <span class="overlay__badge">{cosmics.artist_count}</span>
                  </Link>
                </li>
                <li className="overlay__item">
                  <Link
                    to="/events/"
                    onClick={this._hide}
                    className="overlay__link"
                  >
                    Events
                    <span class="overlay__badge">{cosmics.event_count}</span>
                  </Link>
                </li>
                <li className="overlay__item">
                  <Link
                    to="/mobile/"
                    onClick={this._hide}
                    className="overlay__link"
                  >
                    Mobile
                  </Link>
                </li>
                <li className="overlay__item">
                  <Link
                    to="/signup/"
                    onClick={this._hide}
                    className="overlay__link"
                  >
                    Signup
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}
