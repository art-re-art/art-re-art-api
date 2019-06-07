import React from "react";

import { Typography, Layout } from "antd";

const { Paragraph } = Typography;

export default class NoMatch extends React.Component {
  componentDidMount() {
    this.props.setTitle("Mobile");
  }

  render() {
    return (
      <Layout className="container">
        <Paragraph>
          The Art/Re/Art mobile app is coming soon to both iOS and Android!
        </Paragraph>
      </Layout>
    );
  }
}
