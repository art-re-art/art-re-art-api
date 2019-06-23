import React from "react";
import ReactGA from "react-ga";
import { Row } from "antd";

import Event from "../components/Event";
import Loading from "../components/Loading";

export default class Events extends React.Component {
  state = { events: [], isLoading: true };

  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.props.setTitle("Shows");
    fetch("/api/events/events/")
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({
          events: data,
          isLoading: false
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }

    return (
      <Row
        gutter={24}
        style={{
          padding: "2em",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          flexWrap: "wrap"
        }}
      >
        {this.state.events.map(event => (
          <Event key={event.url} {...event} />
        ))}
      </Row>
    );
  }
}
