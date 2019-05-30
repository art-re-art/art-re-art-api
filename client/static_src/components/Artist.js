import React from "react";
import { Link } from "react-router-dom";

export default class Artist extends React.Component {
  render() {
    return (
      <div className="artist col-sm-4">
        <div className="card">
          <Link to={`/artists/${this.props.id}/`}>
            <div
              className="card-img-top text-center"
              dangerouslySetInnerHTML={{ __html: this.props.qrcode }}
            />
          </Link>
          <div className="card-body">
            <h5 className="card-title">{this.props.name}</h5>
            <p className="card-text">
              {this.props.medium
                .map(medium => {
                  return medium.title;
                })
                .join(", ")}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
