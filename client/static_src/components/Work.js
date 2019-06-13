import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Col, Card, Typography } from "antd";

const { Meta } = Card;
const { Paragraph } = Typography;

export default class Work extends React.Component {
  state = {
    featuredImage: null,
    isLoading: true,
  }

  componentDidMount() {
    this.props.images.map(image => {
      if (image.is_featured) {
        this.setState({
          featuredImage: image,
        });
        this.setState({
          isLoading: false,
        });
      }
    });
    if (this.state.featuredImage === null) {
      this.setState({
        featuredImage: this.props.images[0],
        isLoading: false,
      });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <Col xl={8} lg={12} md={12} sm={24} style={{ padding: "1rem" }}>
        <Card hoverable cover={<img src={this.state.featuredImage.image.small.url} />} title={this.props.title}>
          <Paragraph>{this.props.year}</Paragraph>
          <Paragraph>{this.props.artistName}</Paragraph>
        </Card>
      </Col>
    );
  }
}
