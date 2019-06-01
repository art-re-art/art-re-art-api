import React from "react";
import { Row, Col, Spin, Card } from "antd";

import Event from "../components/Event";
import Loading from "../components/Loading";

const { Meta } = Card;

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
      return <Loading />;
    }

    return (
      <Row gutter={24} style={{ padding: "2em" }}>
        {this.state.events.map(event => (
          <Event key={event.url} {...event} />
        ))}
      </Row>
    );
  }
}
