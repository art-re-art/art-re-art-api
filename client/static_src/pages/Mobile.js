import React from "react";
import ReactGA from "react-ga";

import { List, Typography, Layout, Row, Col } from "antd";

const { Title, Paragraph, Text } = Typography;

import Mockup from "../images/mockup.png";

export default class NoMatch extends React.Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.props.setTitle("Mobile");
  }

  render() {
    return (
      <Layout className="container">
        <Row gutter={24}>
          <Col lg={12} md={24} style={{ textAlign: "center" }}>
            <img
              src={Mockup}
              style={{
                maxWidth: "100%",
                width: "auto",
                height: "auto",
                padding: "1em",
                maxHeight: "70vh"
              }}
            />
          </Col>
          <Col lg={12} md={24}>
            <Title level={2}>Coming soon!</Title>
            <Paragraph>
              The ART/RE/ART mobile app is coming soon to both iOS and Android,
              check back here to find out more.
            </Paragraph>
            <List header={<Title level={3}>Features</Title>}>
              <List.Item>
                <Text>Notifications for random popup events.</Text>
              </List.Item>
              <List.Item>
                <Text>Scavenger hunts with rewards.</Text>
              </List.Item>
              <List.Item>
                <Text>
                  Event QR code scanner for additional art and artist
                  information.
                </Text>
              </List.Item>
            </List>
          </Col>
        </Row>
      </Layout>
    );
  }
}
