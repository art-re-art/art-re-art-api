import React from "react";
import ReactGA from "react-ga";
import { Row } from "antd";
import axios from "axios";

import Components from "../../components";

import "./Events.less";

const { Cards } = Components;

export default class Events extends React.Component {
  state = { events: [], isLoading: true };

  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.props.setTitle("Shows");
    axios.get("/api/events/events/").then(response => {
      let data = response.data;
      this.setState({
        events: data,
        isLoading: false
      });
      this.props.finishLoading();
    });
  }

  render() {
    if (this.state.isLoading) return null;

    return (
      <Row
        gutter={24}
        style={{
          padding: "2em",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          flexWrap: "wrap",
          marginRight: 0,
          marginLeft: 0
        }}
      >
        {this.state.events.map((event, index) => (
          <Cards.Event key={event.url} index={index} {...event} />
        ))}
      </Row>
    );
  }
}
