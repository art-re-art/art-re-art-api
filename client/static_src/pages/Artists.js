import React from "react";

import { Row } from "antd";

import Artist from "../components/Artist";
import Loading from "../components/Loading";

export default class Artists extends React.Component {
  state = { artists: [], isLoading: true };

  componentDidMount() {
    fetch("/api/artists/")
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
      <Row gutter={24} style={{ padding: 24 }}>
        {this.state.artists.map(artist => (
          <Artist key={artist.url} {...artist} />
        ))}
      </Row>
    );
  }
}
