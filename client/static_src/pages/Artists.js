import React from "react";
import ReactGA from "react-ga";
import { Row } from "antd";

import Components from "../components";

const { Cards, Loading } = Components;

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
        {this.state.artists.map(artist => (
          <Cards.Artist key={artist.url} {...artist} />
        ))}
      </Row>
    );
  }
}
