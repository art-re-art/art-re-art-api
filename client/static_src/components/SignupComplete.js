import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

export default class Complete extends React.Component {
  render() {
    return (
      <div style={{ padding: "3em 0" }}>
        <Title level={2}>Complete</Title>
        <Paragraph>
          You're all done here! Thanks for telling us about yourself. We'll be
          in contact with you shortly.
        </Paragraph>
      </div>
    );
  }
}
