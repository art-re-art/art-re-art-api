import React from "react";
import { Spinner } from "react-bootstrap";

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
          <Spinner animation="border" />
          <div>Loading...</div>
        </div>
      );
    }

    return (
      <div className="artist-page my-5">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>Artists</h1>
            </div>
          </div>
          <div className="row">
            {this.state.artists.map(artist => (
              <Artist key={artist.url} {...artist} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
