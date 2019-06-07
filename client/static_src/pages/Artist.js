import React from "react";

import { Row, Col, Typography, Button, Tag, Descriptions } from "antd";

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
            <Descriptions bordered column={{ lg: 1, md: 1, sm: 1, xs: 1 }} className="artist-info" style={{ marginTop: "2rem" }}>
              <Descriptions.Item label="Location">{this.state.artist.city}, {this.state.artist.state}</Descriptions.Item>
              <Descriptions.Item label="Website"><a href={this.state.artist.website}>{this.state.artist.website}</a></Descriptions.Item>
              <Descriptions.Item label="Instagram"><a href={this.state.artist.instagram}>{this.state.artist.instagram}</a></Descriptions.Item>
              <Descriptions.Item label="Mediums">
              {this.state.artist.medium
                .map(medium => {
                  return <Tag color="#ff0000">{medium.title}</Tag>;
                })}
              </Descriptions.Item>
              <Descriptions.Item label="Artist Statement">{this.state.artist.artist_statement}</Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
          {this.state.artist.events
            ?
              <Row style={{ marginTop: "1rem" }}>
                <Title level={2}>Events this artist has participated in</Title>
                {this.state.artist.events.map(event => (
                    <Event key={event.url} {...event} />
                  ))}
              </Row>
            : null}
      </div>
    );
  }
}
