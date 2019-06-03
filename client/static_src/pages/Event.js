import React from "react";
import { Col, Row, Typography } from "antd";
import moment from "moment";

import Loading from "../components/Loading";

const { Title, Paragraph, Text } = Typography;

export default class Event extends React.Component {
  state = { event: {} };

  componentDidMount() {
    fetch(`/api/events/${this.props.match.params.id}/`)
      .then(data => {
        return data.json();
      })
      .then(data => {
        document.title = `${data.title} | Event | Art/Re/Art`;
        this.setState({
          event: data
        });
      });
  }

  _getEmbedSrc = () => {
    let url =
      "https://maps.google.com/maps?t=&z=13&ie=UTF8&iwloc=&output=embed&q=";
    let location = this.state.event.location;
    let address = `${location.street}, ${location.city}, ${location.state}, ${
      location.postal
    }`;
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
              src={this.state.event.featured_image}
              style={{ width: "100%", height: "auto", padding: "1em" }}
            />
          </Col>
          <Col xl={16} lg={24}>
            <Row>
              <Col span={12}>
                <Title level={2}>{this.state.event.title}</Title>
                <Paragraph>
                  {moment(this.state.event.datetime).format("LLLL")}
                </Paragraph>
                <Paragraph>
                  {this.state.event.location
                    ? this.state.event.location.title
                    : null}
                  <br />
                  {this.state.event.location
                    ? this.state.event.location.street
                    : null}
                </Paragraph>
              </Col>
              <Col span={12}>
                <div
                  style={{ textAlign: "center" }}
                  dangerouslySetInnerHTML={{ __html: this.state.event.qrcode }}
                />
              </Col>
            </Row>
            <Paragraph>
              {this.state.event.location ? (
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
              ) : null}
            </Paragraph>
          </Col>
        </Row>
      </div>
    );
  }
}
