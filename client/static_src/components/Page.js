import React from "react";
import { Layout } from "antd";

import Footer from "./Footer";
import Header from "./Header";

import "../styles/Page.less";

export default class Page extends React.Component {
  state = {
    title: "Art/Re/Art"
  };

  componentDidMount() {
    this._setTitle(this.props.title);
    window.scrollTo(0, 0);
  }

  _setTitle = title => {
    document.title = `${title} | Art/Re/Art`;
    this.setState({
      title: title
    });
  };

  render() {
    const PageComponent = this.props.component;

    return (
      <Layout className="content">
        {!this.props.hideHeader ? <Header title={this.state.title} /> : null}
        <Layout.Content>
          <PageComponent {...this.props} setTitle={this._setTitle} />
        </Layout.Content>
        <Footer />
      </Layout>
    );
  }
}
