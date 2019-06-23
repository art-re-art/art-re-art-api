import React from "react";
import ReactGA from "react-ga";
import { Col, Row, Typography, Card } from "antd";
import moment from "moment";

import Components from "../components";

const { Loading, Cards, Layout } = Components;

const { Title, Paragraph } = Typography;
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
      <Layout.Container>
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
            <img
              style={{
                position: "absolute",
                right: 0,
                marginTop: "calc(50vh - 128px)",
                zIndex: 2
              }}
              src={this.state.event.qrcode.medium.url}
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
        <Row style={{ marginBottom: "2em" }}>
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
          <Layout.Section title="Event Photography">
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
          </Layout.Section>
        )}
        {this.state.event.artists && (
          <Layout.Section title="Participating Artists">
            <Row
              style={{
                display: "flex",
                alignItems: "stretch",
                justifyContent: "center",
                flexWrap: "wrap"
              }}
            >
              {this.state.event.artists.map(artist => {
                return <Cards.Artist key={artist.id} {...artist} />;
              })}
            </Row>
          </Layout.Section>
        )}
      </Layout.Container>
    );
  }
}
