import React from "react";
import { Row } from "antd";

import Event from "../components/Event";

export default class Events extends React.Component {
  state = { events: [], isLoading: true };

  componentDidMount() {
    fetch("/api/events/")
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
      return <div>Loading...</div>;
    }

    return (
      <Row gutter={24} style={{ padding: 24 }}>
        {this.state.events.map(event => (
          <Event key={event.url} {...event} />
        ))}
      </Row>
    );
  }
}
