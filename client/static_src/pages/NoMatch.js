import React from "react";

export default class NoMatch extends React.Component {
  componentDidMount() {
    this.props.setTitle("404, Page Not Found");
  }

  render() {
    return <h1>404, Page Not Found</h1>;
  }
}
