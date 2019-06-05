import React from "react";
import { Layout, Row, Col } from "antd";

import Mailchimp from "./Mailchimp";

import "../styles/Footer.less";

export default class Footer extends React.Component {
  render() {
    return (
      <Layout.Footer className="footer">
        <Row gutter={36}>
          <Col xl={12} lg={24} style={{ padding: "1rem" }}>
            <div className="footer__heading">Let's connect.</div>
            <a href="mailto:hello@artreart.com" className="footer__link">
              hello@artreart.com
            </a>
            <br />
            <a
              href="https://www.instagram.com/art_re_art/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              Instagram
            </a>
          </Col>
          <Col xl={12} lg={24} style={{ padding: "1rem" }}>
            <Mailchimp />
          </Col>
        </Row>
      </Layout.Footer>
    );
  }
}
