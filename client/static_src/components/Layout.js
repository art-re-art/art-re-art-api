import React from "react";

import "../styles/Layout.less";

class Container extends React.Component {
  render() {
    return <div className="layout__container">{this.props.children}</div>;
  }
}

class Section extends React.Component {
  render() {
    return <div className="layout__section">{this.props.children}</div>;
  }
}

class Title extends React.Component {
  render() {
    return <div className="layout__title">{this.props.children}</div>;
  }
}

const Layout = { Container: Container, Section: Section, Title: Title };

export default Layout;
