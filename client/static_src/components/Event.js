import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default class Event extends React.Component {
  render() {
    return (
      <div className="event col-sm-4">
        <div className="card">
          <Link to={`/events/${this.props.id}/`}>
            <div
              className="card-img-top text-center"
              dangerouslySetInnerHTML={{ __html: this.props.qrcode }}
            />
          </Link>
          <div className="card-body">
            <h5 className="card-title">{this.props.title}</h5>
            <p className="card-text">
              {moment(this.props.datetime).format("LLLL")}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
