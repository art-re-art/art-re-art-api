import React from "react";

import { Row } from "antd";

import Artist from "../components/Artist";

export default class Artists extends React.Component {
  constructor(props) {
    super(props);
    this.state = { artists: [], isLoading: true };
  }

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
      return <div>Loading...</div>;
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
