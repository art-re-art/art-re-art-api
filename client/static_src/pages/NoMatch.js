import React from "react";
import ReactGA from "react-ga";

export default class NoMatch extends React.Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.props.setTitle("404, Page Not Found");
  }

  render() {
    return <h1>404, Page Not Found</h1>;
  }
}
