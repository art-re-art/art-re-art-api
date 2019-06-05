import React from "react";
import { Spin } from "antd";

import "../styles/Loading.less";

export default class Loading extends React.Component {
  render() {
    return (
      <div className="loading-container">
        <Spin size="large" />
        Loading...
      </div>
    );
  }
}
