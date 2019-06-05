import React from "react";

import { Row, Typography } from "antd";

const { Paragraph } = Typography;

import Artist from "../components/Artist";
import Loading from "../components/Loading";

export default class Artists extends React.Component {
  state = { artists: [], isLoading: true };

  componentDidMount() {
    this.props.setTitle("Artists");
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
      <div className="artists-page">
        <div className="container" style={{ background: "transparent" }}>
          <Paragraph style={{ marginBottom: 0 }}>
            Meet some of the artists who have participated in ART/RE/ART events.
          </Paragraph>
        </div>
        <Row gutter={24} style={{ padding: "2em", paddingTop: 0 }}>
          {this.state.artists.map(artist => (
            <Artist key={artist.url} {...artist} />
          ))}
        </Row>
      </div>
    );
  }
}
