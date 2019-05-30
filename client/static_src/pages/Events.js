import React from "react";

import Event from "../components/Event";

export default class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = { events: [] };
  }

  componentDidMount() {
    document.title = "Events | Art/Re/Art";
    fetch("/api/events/")
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({
          events: data
        });
      });
  }

  render() {
    return (
      <div className="event-page my-5">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>Events</h1>
            </div>
          </div>
          <div className="row">
            {this.state.events.map(event => (
              <Event key={event.url} {...event} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
