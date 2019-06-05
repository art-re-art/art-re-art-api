import React from "react";
import { Layout } from "antd";

import Footer from "./Footer";
import Header from "./Header";

import "../styles/Page.less";

export default class Page extends React.Component {
  componentDidMount() {
    document.title = `${this.props.title} | Art/Re/Art`;
  }

  render() {
    const PageComponent = this.props.component;

    return (
      <Layout className="content">
        {!this.props.hideHeader ? <Header title={this.props.title} /> : null}
        <Layout.Content>
          <PageComponent {...this.props} />
        </Layout.Content>
        <Footer />
      </Layout>
    );
  }
}
