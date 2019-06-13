import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Col, Card, Typography, Drawer } from "antd";

const { Meta } = Card;
const { Paragraph } = Typography;

export default class Work extends React.Component {
  state = {
    featuredImage: null,
    isLoading: true,
    drawerVisible: false,
  }

  showDrawer = () => {
    this.setState({
      drawerVisible: true,
    });
  };

  onClose = () => {
    this.setState({
      drawerVisible: false,
    });
  };

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
        <Card hoverable cover={<img src={this.state.featuredImage.image.small.url} />} title={this.props.title} onClick={this.showDrawer}>
          <Paragraph>{this.props.year}</Paragraph>
          <Paragraph>{this.props.artistName}</Paragraph>
        </Card>
        <Drawer
          title={this.props.artistName}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.drawerVisible}
          width={520}
        >
          <Paragraph>{this.props.year}</Paragraph>
          {this.props.images &&
            this.props.images.map(image => {
              return <img key={image.url} src={image.image.small.url} alt={image.description} />;
            })
          }
        </Drawer>
      </Col>
    );
  }
}
