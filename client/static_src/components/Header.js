import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: {} };
  }

  componentDidMount() {
    fetch("/api/events/")
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({
          event: data[0]
        });
      });
    $('[data-toggle="popover"]').popover();
  }
  render() {
    return (
      <header>
        <div className="navbar navbar-light navbar-expand-lg bg-white align-items-stretch p-0">
          <div className="col col-sm-4 pl-0 d-flex align-items-center">
            <Link to="/" className="navbar-brand py-1 px-2 px-md-3">
              <img
                src="/static/images/artreart-red.png"
                alt="ART/RE/ART"
                height="75"
                className="navbar__logo"
              />
            </Link>
          </div>
          <div className="col col-sm-4 navbar__date p-1 d-flex flex-column align-items-center justify-content-center">
            <small className="font-2 text-uppercase font-weight-bold">
              Next Show:
            </small>
            <button
              type="button"
              className="p-0 bg-transparent"
              data-toggle="popover"
              data-trigger="focus"
              data-placement="bottom"
              data-content={
                this.state.event.location
                  ? this.state.event.location.street
                  : null
              }
              title={this.state.event.title}
            >
              {moment(this.state.event.datetime).format("LLLL")}
            </button>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse d-flex justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item active">
                <Link to="/about/" className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item active">
                <Link to="/events/" className="nav-link">
                  Events
                </Link>
              </li>
              <li className="nav-item active">
                <Link to="/artists/" className="nav-link">
                  Artists
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}
