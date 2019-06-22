import React from "react";
import { Col, Card, Typography, Tag, Modal, Row, Icon } from "antd";

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

  _showModal = () => {
    this.setState({
      modalVisible: true
    });
  };

  _hideModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <Col xl={8} lg={8} md={12} sm={12} xs={12} style={{ padding: "1rem" }}>
        <Card
          hoverable
          className="work"
          cover={<img src={this.state.featuredImage.image.square.url} />}
          onClick={this._showModal}
          style={{ height: "100%" }}
        >
          {this.props.images.length > 1 ? (
            <Icon type="copy" style={{ float: "right", color: "#ff0000" }} />
          ) : null}
          <Title className="work-title" level={4}>
            {this.props.title}
          </Title>
          <Paragraph className="work-year">{this.props.year}</Paragraph>
          <Paragraph className="work-artist">{this.props.artistName}</Paragraph>
        </Card>
        <Modal
          title={this.props.title}
          visible={this.state.modalVisible}
          onCancel={this._hideModal}
          footer={null}
          width={"90vw"}
        >
          <Paragraph>{this.props.year}</Paragraph>
          <Paragraph>{this.props.artistName}</Paragraph>
          {this.props.description && (
            <Paragraph>{this.props.description}</Paragraph>
          )}
          <Row className="work-mediums">
            {this.props.medium &&
              this.props.medium.map(medium => {
                return (
                  <Tag key={medium.id} color="#ff0000">
                    {medium.title}
                  </Tag>
                );
              })}
          </Row>
          <Row className="work-images">
            {this.props.images &&
              this.props.images.map(image => {
                return (
                  <Col sm={12} xs={24}>
                    <img
                      key={image.id}
                      src={image.image.small.url}
                      alt={image.description}
                    />
                  </Col>
                );
              })}
          </Row>
        </Modal>
      </Col>
    );
  }
}
