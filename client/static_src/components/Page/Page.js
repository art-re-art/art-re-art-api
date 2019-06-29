import React from "react";
import { Layout } from "antd";
import { CSSTransition } from "react-transition-group";

import Footer from "./Footer";
import Header from "./Header";
import Loading from "../Loading/Loading";

import "./Page.less";

export default class Page extends React.Component {
  state = {
    title: "Loading... | Art/Re/Art",
    isLoaded: false
  };

  componentDidMount() {
    this._setTitle(this.props.title);

    this.unlisten = this.props.history.listen(() => {
      this.setState({
        isLoaded: false
      });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  _setTitle = title => {
    document.title = `${title} | Art/Re/Art`;
    this.setState({
      title: title
    });
  };

  _finishLoading = () => {
    this.setState({
      isLoaded: true
    });
  };

  render() {
    const PageComponent = this.props.component;

    return (
      <div style={{ width: "100%" }}>
        {!this.state.isLoaded && <Loading />}
        <CSSTransition
          in={this.state.isLoaded}
          timeout={500}
          classNames="transition--fade"
        >
          <Layout className="content transition--fade-enter-initial">
            {!this.props.hideHeader ? (
              <Header title={this.state.title} />
            ) : null}
            <Layout.Content>
              <PageComponent
                {...this.props}
                setTitle={this._setTitle}
                finishLoading={this._finishLoading}
                willUnmount={this._willUnmount}
              />
            </Layout.Content>
            <Footer />
          </Layout>
        </CSSTransition>
      </div>
    );
  }
}
