import React from "react";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  componentDidMount() {
    document.title =
      "A series of pop up art events in downtown Morganton, NC. | Art/Re/Art";
  }

  render() {
    return (
      <header>
        <div
          className="position-relative banner p-3 p-lg-5"
          style={{
            backgroundImage: "url('/static/images/bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center center"
          }}
        >
          <div className="d-flex justify-content-center justify-content-lg-end align-items-end">
            <div className="banner__list d-flex flex-column justify-content-center justify-content-lg-end align-items-center align-items-lg-end">
              <Link
                to="/events/"
                className="banner__link bg-primary text-white display-3 p-3 m-3"
              >
                Shows
              </Link>
              <Link
                to="/artists/"
                className="banner__link bg-primary text-white display-3 p-3 m-3"
              >
                Artists
              </Link>
              <Link
                to="/about/"
                className="banner__link bg-primary text-white display-3 p-3 m-3"
              >
                About
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-dark text-white">
          <div className="container-fluid p-3 p-lg-4 p-xl-5">
            <div className="container p-0">
              <p className="lead">
                ART/RE/ART is a contemporary art experience taking place in
                downtown Morganton, NC for one night only. This free event, held
                in a non-art space, offers an alternative way to interact with
                and experience art in the community.
              </p>

              <p className="lead">
                Featuring local and regional artists, ART/RE/ART will include
                work from multiple disciplines and mediums including
                performance, installation, sculpture, interactive, video,
                painting, drawing, and photography.
              </p>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
