import React from "react";
import { Layout, Row, Col, Typography } from "antd";

import Background from "../images/bg.jpg";

import Mailchimp from "./Mailchimp";

import "../styles/Page.less";
import "../styles/Footer.less";

const { Header, Content, Footer } = Layout;

export default class Page extends React.Component {
  componentDidMount() {
    document.title = `${this.props.title} | Art/Re/Art`;
  }

  render() {
    const PageComponent = this.props.component;

    return (
      <Layout className="content">
        {!this.props.hideHeader ? (
          <Header
            style={{
              background: "#000",
              padding: 0,
              backgroundImage: `url('${Background}')`,
              backgroundSize: "cover",
              height: "auto",
              borderBottom: "10px solid black"
            }}
          >
            <Typography.Title className="page-title">
              {this.props.title}
            </Typography.Title>
          </Header>
        ) : null}
        <Content>
          <PageComponent {...this.props} />
        </Content>
        <Footer
          className="footer"
        >
          <Row gutter={36}>
            <Col xl={12} lg={24} style={{ padding: "1rem" }}>
              <div className="footer__heading">
                Let's connect.
              </div>
              <a
                href="mailto:hello@artreart.com"
                className="footer__link"
              >
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
        </Footer>
      </Layout>
    );
  }
}
