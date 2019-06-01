import React from "react";
import { Link } from "react-router-dom";

import Background from "../images/bg.jpg";

import "../styles/Home.less";

export default class Home extends React.Component {
  render() {
    return (
      <header>
        <div
          style={{
            backgroundColor: "black",
            backgroundImage: `url('${Background}')`,
            backgroundSize: "cover",
            backgroundPosition: "center center"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "end",
              flexDirection: "column",
              height: "50vh",
              padding: "2em"
            }}
          >
            <Link
              to="/events/"
              className="home__link"
            >
              Shows
            </Link>
            <Link
              to="/artists/"
              className="home__link"
            >
              Artists
            </Link>
            <Link
              to="/about/"
              className="home__link"
            >
              About
            </Link>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "black",
            color: "white",
            fontSize: "1.5em",
            padding: "2em"
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
