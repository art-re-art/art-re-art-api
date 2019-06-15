import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Col, Card, Typography, Drawer } from "antd";

const { Meta } = Card;
const { Paragraph, Title } = Typography;

import "../styles/Work.less";

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
      <Col xl={8} lg={12} md={12} sm={24} className="work">
        <Card hoverable cover={<img src={this.state.featuredImage.image.small.url} />} onClick={this.showDrawer}>
          <Title level={3}>{this.props.title}</Title>
          <Paragraph className="work-year">{this.props.year}</Paragraph>
          <Paragraph className="work-title">{this.props.artistName}</Paragraph>
        </Card>
        <Drawer
          title={this.props.title}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.drawerVisible}
          width={520}
          className="work-drawer"
        >
          <Paragraph>{this.props.year}</Paragraph>
          <Paragraph>{this.props.artistName}</Paragraph>
          {this.props.description &&
            <Paragraph>{this.props.description}</Paragraph>
          }
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
