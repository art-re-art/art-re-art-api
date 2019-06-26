import React from "react";
import ReactGA from "react-ga";
import { Row } from "antd";

import Components from "../components";

const { Cards } = Components;

export default class Artists extends React.Component {
  state = { artists: [], isLoading: true };

  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.props.setTitle("Artists");
    fetch("/api/artists/artists/")
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({
          artists: data,
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
        {this.state.artists.map((artist, index) => (
          <Cards.Artist key={artist.url} index={index} {...artist} />
        ))}
      </Row>
    );
  }
}
