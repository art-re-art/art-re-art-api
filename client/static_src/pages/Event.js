import React from "react";
import ReactGA from "react-ga";
import { Col, Row, Typography, Card, Divider } from "antd";
import moment from "moment";

import Loading from "../components/Loading";
import Artist from "../components/Artist";

const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;

import "../styles/Event.less";

export default class Event extends React.Component {
  state = { event: {}, isLoading: true };

  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    fetch(`/api/events/events/${this.props.match.params.id}/`)
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({
          event: data,
          isLoading: false
        });
        this.props.setTitle(`${data.title}`);
      });
  }

  _getEmbedSrc = () => {
    let url =
      "https://maps.google.com/maps?t=&z=13&ie=UTF8&iwloc=&output=embed&q=";
    let location = this.state.event.location;
    let address = `${location.street}, ${location.city}, ${location.state}, ${location.postal}`;
    let fullURL = url + address;
    return encodeURI(fullURL);
  };

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }

    return (
      <div className="container">
        <Row style={{ marginBottom: "6em" }}>
          <Col>
            <div
              style={{
                position: "absolute",
                zIndex: 2,
                backgroundColor: "red",
                marginTop: "calc(50vh - 100px)",
                padding: "1em"
              }}
            >
              <Title level={2} style={{ color: "white", marginBottom: 0 }}>
                {this.state.event.title}
              </Title>
              <Paragraph style={{ color: "white", marginBottom: 0 }}>
                {moment(this.state.event.datetime).format("LLLL")}
              </Paragraph>
            </div>
            <div
              style={{
                position: "absolute",
                right: 0,
                width: "82mm",
                background: "white",
                marginTop: "calc(50vh - 61.5mm)",
                zIndex: 2
              }}
              dangerouslySetInnerHTML={{ __html: this.state.event.qrcode }}
            />
            <img
              src={this.state.event.featured_image.large.url}
              style={{
                width: "calc(100% + 4em)",
                height: "50vh",
                objectFit: "cover",
                objectPosition: "center center",
                margin: "-2em"
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {this.state.event.location && (
              <div
                dangerouslySetInnerHTML={{
                  __html: `
                    <iframe
                      width="100%"
                      height="400"
                      id="gmap_canvas"
                      src=${this._getEmbedSrc()}
                      frameborder="0"
                      scrolling="no"
                      marginheight="0"
                      marginwidth="0"
                    />`
                }}
              />
            )}
          </Col>
        </Row>
        {this.state.event.images.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <Divider />
            <Row
              gutter={24}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center"
              }}
            >
              {this.state.event.images.map(image => {
                return (
                  <Col
                    xl={6}
                    lg={8}
                    md={12}
                    sm={12}
                    xs={24}
                    key={image.id}
                    style={{ marginBottom: 24 }}
                  >
                    <Card
                      className="event-img"
                      cover={
                        <img
                          src={image.image.small.url}
                          alt={image.description}
                        />
                      }
                    >
                      <Meta title={image.description} />
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        )}
        {this.state.event.artists && (
          <div style={{ marginTop: "1rem" }}>
            <Divider />
            <Title level={2}>Participating Artists</Title>
            <Row
              style={{
                display: "flex",
                alignItems: "stretch",
                justifyContent: "center",
                flexWrap: "wrap"
              }}
            >
              {this.state.event.artists.map(artist => {
                return <Artist key={artist.id} {...artist} />;
              })}
            </Row>
          </div>
        )}
      </div>
    );
  }
}
