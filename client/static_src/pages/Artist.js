import React from "react";

import { Row, Col, Typography, Button } from "antd";

import Loading from "../components/Loading";

const { Title, Paragraph } = Typography;

export default class Artist extends React.Component {
  state = { artist: {}, isLoading: true };

  componentDidMount() {
    fetch(`/api/artists/${this.props.match.params.id}/`)
      .then(data => {
        return data.json();
      })
      .then(data => {
        document.title = `${data.name} | Artist | Art/Re/Art`;
        this.setState({
          artist: data,
          isLoading: false
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }

    return (
      <div className="container">
        <Row gutter={24}>
          <Col span={8}>
            <div
              style={{ textAlign: "center" }}
              dangerouslySetInnerHTML={{ __html: this.state.artist.qrcode }}
            />
          </Col>
          <Col span={16}>
            <Title level={2}>{this.state.artist.name}</Title>
            <Paragraph>
              {this.state.artist.medium
                .map(medium => {
                  return medium.title;
                })
                .join(", ")}
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
      </div>
    );
  }
}
