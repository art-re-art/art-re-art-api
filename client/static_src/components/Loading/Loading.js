import React from "react";
import { Spin } from "antd";

import "./Loading.less";

export default class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <Spin className="loading__spinner" size="large" />
      </div>
    );
  }
}
