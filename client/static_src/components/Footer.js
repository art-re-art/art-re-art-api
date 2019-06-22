import React from "react";
import { Layout, Row, Col, List } from "antd";

import Mailchimp from "./Mailchimp";

import "../styles/Footer.less";

export default class Footer extends React.Component {
  render() {
    return (
      <Layout.Footer
        style={{
          backgroundColor: "black",
          color: "white",
          overflow: "hidden",
          position: "relative"
        }}
      >
        <div
          style={{
            backgroundColor: "red",
            width: "200px",
            height: "100vh",
            position: "absolute",
            transform: "rotate(-30deg)",
            right: "5em"
          }}
        ></div>
        <Row>
          <Col>
            <div
              style={{
                fontSize: "10vw",
                lineHeight: "10vw",
                fontWeight: "bold",
                position: "relative",
                marginTop: "-6vh"
              }}
            >
              ART/RE/ART
            </div>
          </Col>
        </Row>
        <Row gutter={36}>
          <Col xl={12} lg={24}>
            <div
              style={{
                fontSize: "2vw",
                lineHeight: "3vw"
              }}
            >
              One-night-only contemporary art experiences taking place in
              downtown Morganton, NC.
            </div>
            <List split={false}>
              <List.Item style={{ padding: 0 }}>
                <a href="mailto:hello@artreart.com" style={{ fontSize: "3vw" }}>
                  www. / hello@
                </a>
              </List.Item>
              <List.Item style={{ padding: 0 }}>
                <a
                  href="https://www.instagram.com/art_re_art/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "3vw" }}
                >
                  insta. / art_re_art
                </a>
              </List.Item>
            </List>
          </Col>
          <Col xl={12} lg={24}>
            <Mailchimp />
          </Col>
        </Row>
      </Layout.Footer>
    );
  }
}
