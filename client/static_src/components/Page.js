import React from "react";
import { Layout, Row, Col } from "antd";

import Background from "../images/bg.png";

import Mailchimp from "./Mailchimp";

const { Header, Content, Footer } = Layout;

export default class Page extends React.Component {
  componentDidMount() {
    document.title = `${this.props.title} | Art/Re/Art`;
  }

  render() {
    const PageComponent = this.props.component;

    return (
      <Layout style={{ marginLeft: 200 }}>
        <Header
          style={{
            background: "#fff",
            padding: 0,
            backgroundImage: `url('${Background}')`,
            backgroundSize: "cover",
            height: "auto",
            borderBottom: "10px solid black"
          }}
        >
          <h1
            style={{
              color: "white",
              margin: ".5em",
              padding: ".5em 1em",
              fontSize: "3em",
              background: "red",
              fontWeight: "bold",
              display: "inline-block"
            }}
          >
            {this.props.title}
          </h1>
        </Header>
        <Content>
          <PageComponent {...this.props} />
        </Content>
        <Footer style={{ backgroundColor: "white", padding: "5em" }}>
          <Row gutter={36}>
            <Col span={12}>
              <div
                style={{
                  fontSize: "3em",
                  fontWeight: "bold"
                }}
              >
                Let's connect.
              </div>
              <a
                href="mailto:hello@artreart.com"
                style={{
                  fontSize: "2em",
                  display: "block",
                  borderBottom: "2px solid red",
                  color: "red"
                }}
              >
                hello@artreart.com
              </a>
              <a
                href="https://www.instagram.com/art_re_art/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "2em",
                  display: "block",
                  borderBottom: "2px solid red",
                  color: "red"
                }}
              >
                Instagram
              </a>
            </Col>
            <Col span={12}>
              <Mailchimp />
            </Col>
          </Row>
        </Footer>
      </Layout>
    );
  }
}
