import React from "react";
import { Skeleton } from "antd";

export default class Loading extends React.Component {
  render() {
    return (
      <div className="container">
        <Skeleton active paragraph={{rows: 6}}/>
      </div>
    );
  }
}
