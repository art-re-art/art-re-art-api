import React from "react";
import ReactGA from "react-ga";

import { Typography, Layout, Row, Col } from "antd";

const { Paragraph } = Typography;

import Screenshot from "../images/mobile-app.png";

export default class NoMatch extends React.Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.props.setTitle("Mobile");
  }

  render() {
    return (
      <Layout className="container">
        <Row gutter={24}>
          <Col lg={12} md={24}>
            <Paragraph>
              The Art/Re/Art mobile app is coming soon to both iOS and Android!
            </Paragraph>
          </Col>
          <Col lg={12} md={24}>
            <img
              src={Screenshot}
              style={{
                maxWidth: "100%",
                width: "auto",
                height: "auto",
                padding: "1em",
                maxHeight: "70vh"
              }}
            />
          </Col>
        </Row>
      </Layout>
    );
  }
}
