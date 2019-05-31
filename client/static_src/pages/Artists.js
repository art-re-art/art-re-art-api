import React from "react";

import { Row, Col, PageHeader } from "antd";

import Artist from "../components/Artist";

export default class Artists extends React.Component {
  constructor(props) {
    super(props);
    this.state = { artists: [], isLoading: true };
  }

  componentDidMount() {
    document.title = "Artists | Art/Re/Art";
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
      return (
        <div className="p-5 w-100 d-flex justify-content-center align-items-center flex-column">
          <div>Loading...</div>
        </div>
      );
    }

    return (
          <Row gutter={24}>
            {this.state.artists.map(artist => (
              <Artist key={artist.url} {...artist} />
            ))}
          </Row>
    );
  }
}
