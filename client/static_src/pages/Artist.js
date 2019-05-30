import React from "react";
import { Spinner } from "react-bootstrap";

export default class Artist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { artist: {}, isLoading: true };
  }

  componentDidMount() {
    fetch(`/api/artists/${this.props.match.params.id}/`)
      .then(data => {
        return data.json();
      })
      .then(data => {
        document.title = `${data.name} | Artist | Art/Re/Art`;
        this.setState({
          artist: data,
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
              <h1>{this.state.artist.name}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {this.state.artist.events
                ? this.state.artist.events.join(", ")
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
