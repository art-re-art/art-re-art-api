import React from "react";
import { Link } from "react-router-dom";

import Background from "../images/bg.png";

export default class Home extends React.Component {
  render() {
    return (
      <header>
        <div
          className="position-relative banner p-3 p-lg-5"
          style={{
            backgroundImage: `url('${Background}')`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            height: "75vh"
          }}
        >
          <div className="d-flex justify-content-center justify-content-lg-end align-items-end">
            <div
              style={{
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Link
                to="/events/"
                style={{
                  backgroundColor: "red",
                  padding: ".5em",
                  color: "white",
                  fontSize: "3em"
                }}
              >
                Shows
              </Link>
              <Link
                to="/artists/"
                style={{
                  backgroundColor: "red",
                  padding: ".5em",
                  color: "white",
                  fontSize: "3em"
                }}
              >
                Artists
              </Link>
              <Link
                to="/about/"
                style={{
                  backgroundColor: "red",
                  padding: ".5em",
                  color: "white",
                  fontSize: "3em"
                }}
              >
                About
              </Link>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "black",
            color: "white",
            fontSize: "2em",
            padding: 30
          }}
        >
          <p>
            ART/RE/ART is a contemporary art experience taking place in downtown
            Morganton, NC for one night only. This free event, held in a non-art
            space, offers an alternative way to interact with and experience art
            in the community.
          </p>

          <p>
            Featuring local and regional artists, ART/RE/ART will include work
            from multiple disciplines and mediums including performance,
            installation, sculpture, interactive, video, painting, drawing, and
            photography.
          </p>
        </div>
      </header>
    );
  }
}
