import React from "react";
import { Layout, Typography } from "antd";

import Background from "../images/bg.jpg";

export default class Page extends React.Component {
  render() {
    return (
      <Layout.Header
        style={{
          background: "#000",
          padding: 0,
          backgroundImage: `url('${Background}')`,
          backgroundSize: "cover",
          height: "auto",
          borderBottom: "10px solid black"
        }}
      >
        <Typography.Title level={1} className="page-title">
          {this.props.title}
        </Typography.Title>
      </Layout.Header>
    );
  }
}
