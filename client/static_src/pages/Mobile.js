import React from "react";
import ReactGA from "react-ga";
import { List, Typography, Row, Col } from "antd";

import Components from "../components";
import Mockup from "../images/mockup.png";

const { Title, Paragraph, Text } = Typography;
const { Layout } = Components;

export default class NoMatch extends React.Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.props.setTitle("Mobile");
  }

  render() {
    return (
      <Layout.Container>
        <Row style={{ display: "flex", alignItems: "center" }}>
          <Col md={8} sm={24} style={{ textAlign: "center" }}>
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
          <Col md={16} sm={24}>
            <Layout.Section title="Coming Soon">
              <Paragraph>
                The ART/RE/ART mobile app is coming soon to both iOS and
                Android, signup for our newsletter to get notified when it
                releases.
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
            </Layout.Section>
          </Col>
        </Row>
      </Layout.Container>
    );
  }
}
