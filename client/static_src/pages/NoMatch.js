import React from "react";
import ReactGA from "react-ga";
import { Typography } from "antd";

import Layout from "../components/Layout";

const { Paragraph } = Typography;

export default class NoMatch extends React.Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.props.setTitle("404, Page Not Found");
  }

  render() {
    return (
      <Layout.Container>
        <Layout.Section title="404">
          <Paragraph>Page Not Found</Paragraph>
        </Layout.Section>
      </Layout.Container>
    );
  }
}
