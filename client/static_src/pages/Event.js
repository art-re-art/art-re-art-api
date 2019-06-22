import React from "react";
import ReactGA from "react-ga";
import { Col, Row, Typography, Card } from "antd";
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
        this.props.setTitle(`${data.title} | Show`);
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
        <Row>
          <Col xl={8} lg={24}>
            <img
              src={this.state.event.featured_image.medium.url}
              style={{ width: "100%", height: "auto", padding: "1em" }}
            />
          </Col>
          <Col xl={16} lg={24}>
            <Row>
              <Col span={24}>
                <Title level={2}>{this.state.event.title}</Title>
                <Paragraph>
                  {moment(this.state.event.datetime).format("LLLL")}
                </Paragraph>
                <Paragraph>
                  {this.state.event.location && this.state.event.location.title}
                  <br />
                  {this.state.event.location &&
                    this.state.event.location.street}
                </Paragraph>
              </Col>
              {/* <Col lg={12} md={24}>
                <div
                  style={{ textAlign: "center" }}
                  dangerouslySetInnerHTML={{ __html: this.state.event.qrcode }}
                />
              </Col> */}
            </Row>
            <Paragraph>
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
            </Paragraph>
          </Col>
        </Row>
        {this.state.event.images && (
          <Row
            gutter={24}
            style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
          >
            {this.state.event.images.map(image => {
              return (
                <Col
                  xl={6}
                  lg={8}
                  md={12}
                  sm={12}
                  xs={24}
                  key={image.image.small.url}
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
        )}
        <div style={{ marginTop: "1rem" }}>
          <Title level={2}>Participating Artists</Title>
          <Row
            style={{
              display: "flex",
              alignItems: "stretch",
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            {this.state.event.artists &&
              this.state.event.artists.map(artist => {
                console.log(artist);
                return <Artist key={artist.url} {...artist} />;
              })}
          </Row>
        </div>
      </div>
    );
  }
}
