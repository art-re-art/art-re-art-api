import React from "react";
import moment from "moment";

export default class Event extends React.Component {
  render() {
    return (
      <div className="event col-sm-4">
        <div className="card">
          <div
            className="card-img-top text-center"
            dangerouslySetInnerHTML={{ __html: this.props.qrcode }}
          />
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
