import React from "react";
import { Col, Card, Typography, Tag, Modal } from "antd";

const { Meta } = Card;
const { Paragraph, Title } = Typography;

import "../styles/Work.less";

export default class Work extends React.Component {
  state = {
    featuredImage: null,
    isLoading: true,
    modalVisible: false
  };

  componentDidMount() {
    this.props.images.map(image => {
      if (image.is_featured) {
        this.setState({
          featuredImage: image
        });
        this.setState({
          isLoading: false
        });
      }
    });
    if (this.state.featuredImage === null) {
      this.setState({
        featuredImage: this.props.images[0],
        isLoading: false
      });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <Col xl={8} lg={12} md={12} sm={24} style={{ padding: "1rem" }}>
        <Card
          hoverable
          className="work"
          cover={<img src={this.state.featuredImage.image.square.url} />}
          onClick={() => {
            this.setState({ modalVisible: true });
          }}
          style={{ height: "100%" }}
        >
          <Title className="work-title" level={3}>
            {this.props.title}
          </Title>
          <Paragraph className="work-year">{this.props.year}</Paragraph>
          <Paragraph className="work-artist">{this.props.artistName}</Paragraph>
        </Card>
        <Modal
          title={this.props.title}
          visible={this.state.modalVisible}
          onCancel={() => {
            this.setState({ modalVisible: false });
          }}
          footer={null}
          width={"75vw"}
        >
          <Paragraph>{this.props.year}</Paragraph>
          <Paragraph>{this.props.artistName}</Paragraph>
          {this.props.description && (
            <Paragraph>{this.props.description}</Paragraph>
          )}
          <div>
            {this.props.medium &&
              this.props.medium.map(medium => {
                return (
                  <Tag key={medium.url} color="#ff0000">
                    {medium.title}
                  </Tag>
                );
              })}
          </div>
          <div className="work-images">
            {this.props.images &&
              this.props.images.map(image => {
                return (
                  <img
                    key={image.url}
                    src={image.image.small.url}
                    alt={image.description}
                  />
                );
              })}
          </div>
        </Modal>
      </Col>
    );
  }
}
