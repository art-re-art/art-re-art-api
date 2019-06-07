import React from "react";

import { Row, Col, Typography, Button, Tag } from "antd";

import Loading from "../components/Loading";
import Event from "../components/Event";

const { Title, Paragraph } = Typography;

export default class Artist extends React.Component {
  state = { artist: {}, isLoading: true };

  componentDidMount() {
    fetch(`/api/artists/${this.props.match.params.id}/`)
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({
          artist: data,
          isLoading: false
        });
        this.props.setTitle(`${data.name} | Artist`);
      });
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }

    return (
      <div className="container">
        <Row gutter={24} lg={24}>
          <Col xl={8} lg={24}>
            <div
              style={{ textAlign: "center" }}
              dangerouslySetInnerHTML={{ __html: this.state.artist.qrcode }}
            />
          </Col>
          <Col xl={16}>
            <Title level={2}>{this.state.artist.name}</Title>
            <Paragraph>
              {this.state.artist.medium
                .map(medium => {
                  return <Tag>{medium.title}</Tag>;
                })}
            </Paragraph>
            <Button
              type="primary"
              icon="instagram"
              size="large"
              href={this.state.artist.instagram}
              style={{ margin: ".5em" }}
            >
              Instagram
            </Button>
            <Button
              type="primary"
              icon="link"
              size="large"
              href={this.state.artist.website}
              style={{ margin: ".5em" }}
            >
              Website
            </Button>
          </Col>
        </Row>
          {this.state.artist.events
            ?
              <Row>
                <Title level={2}>Events this artist has attended</Title>
                {this.state.artist.events.map(event => (
                    <Event key={event.url} {...event} />
                  ))}
              </Row>
            : null}
      </div>
    );
  }
}
