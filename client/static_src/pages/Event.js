import React from "react";

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: {} };
  }

  componentDidMount() {
    fetch(`/api/events/${this.props.match.params.id}/`)
      .then(data => {
        return data.json();
      })
      .then(data => {
        document.title = `${data.title} | Event | Art/Re/Art`;
        this.setState({
          event: data
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
      <div className="event-page my-5">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>{this.state.event.title}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">{this.state.event.datetime}</div>
          </div>
          <div className="row">
            <div className="col">
              {this.state.event.artists
                ? this.state.event.artists
                    .map(artist => {
                      return artist.name;
                    })
                    .join(", ")
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
