import React from "react";
import ReactGA from "react-ga";
import { Link } from "react-router-dom";
import { Typography } from "antd";

import Background from "../../images/bg.jpg";
import "./Home.less";

const { Paragraph } = Typography;

export default class Home extends React.Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.props.setTitle(
      "A series of pop up art events in downtown Morganton, NC."
    );
    this.props.finishLoading();
  }

  render() {
    return (
      <div className="home">
        <header className="home__header">
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
                height: "500px",
                padding: "2em"
              }}
            >
              <Link
                to="/events/"
                className="home__link"
                onClick={() => {
                  ReactGA.event({
                    category: "Home Nav",
                    action: "Events Button"
                  });
                }}
              >
                Shows
              </Link>
              <Link
                to="/artists/"
                className="home__link"
                onClick={() => {
                  ReactGA.event({
                    category: "Home Nav",
                    action: "Artists Button"
                  });
                }}
              >
                Artists
              </Link>
              <Link
                to="/about/"
                className="home__link"
                onClick={() => {
                  ReactGA.event({
                    category: "Home Nav",
                    action: "About Button"
                  });
                }}
              >
                About
              </Link>
            </div>
          </div>
        </header>

        <div className="home__content">
          <div className="homecontent">
            <Paragraph className="homecontent__paragraph">
              ART/RE/ART is a series of one-night-only, contemporary art
              experiences taking place in downtown Morganton, NC. These free
              events, held in non-art spaces, offer an alternative way to
              interact with and experience art in the community.
            </Paragraph>

            <Paragraph className="homecontent__paragraph">
              Featuring local and regional artists, ART/RE/ART includes work
              from multiple disciplines and mediums including performance,
              installation, sculpture, interactive, video, painting, drawing,
              and photography.
            </Paragraph>
          </div>
        </div>
      </div>
    );
  }
}
