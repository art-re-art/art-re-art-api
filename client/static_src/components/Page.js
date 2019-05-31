import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon, PageHeader } from "antd";

const { Header, Content, Footer, Sider } = Layout;

export default class Page extends React.Component {
  componentDidMount() {
    document.title = `${this.props.title} | Art/Re/Art`;
  }

  render() {
    const PageComponent = this.props.component;

    return (
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: 0,
            flex: 1,
            alignItems: "center"
          }}
        >
          <PageHeader title={this.props.title} subTitle={this.props.subtitle} />
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: "75vh" }}>
            <PageComponent />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <a
            href="mailto:hello@artreart.com"
            className="footer__link text-decoration-none mb-4"
          >
            hello@artreart.com
          </a>
          <a
            href="https://www.instagram.com/art_re_art/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link text-decoration-none mb-4"
          >
            Instagram
          </a>
        </Footer>
      </Layout>
    );
  }
}
