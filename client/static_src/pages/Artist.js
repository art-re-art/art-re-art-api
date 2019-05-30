import React from "react";

export default class Artist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { artist: {} };
  }

  componentDidMount() {
    fetch(`/api/artists/${this.props.match.params.id}/`)
      .then(data => {
        return data.json();
      })
      .then(data => {
        document.title = `${data.name} | Artist | Art/Re/Art`;
        this.setState({
          artist: data
        });
      });
  }

  render() {
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
