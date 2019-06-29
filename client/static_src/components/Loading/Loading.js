import React from "react";
import { Spin } from "antd";

import "./Loading.less";

export default class Loading extends React.Component {
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
}
