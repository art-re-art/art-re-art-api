import React from "react";
import ReactGA from "react-ga";
import { Collapse, Typography } from "antd";
import axios from "axios";

import Components from "../../components";

import "./About.less";

const { Layout } = Components;

const { Paragraph } = Typography;
const { Panel } = Collapse;

export default class About extends React.Component {
  state = {
    about: {},
    isLoading: true
  };

  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.props.setTitle("About");
    axios.get("/api/about/").then(response => {
      let data = response.data;
      this.setState({
        about: data,
        isLoading: false
      });
      this.props.finishLoading();
    });
  }

  render() {
    let about = this.state.about;

    if (this.state.isLoading) return null;

    return (
      <Layout.Container>
        <Layout.Section title="The Down Low" transitionDelay={100}>
          <Paragraph>{about.description}</Paragraph>
        </Layout.Section>
        <Layout.Section title="The Organizers" transitionDelay={200}>
          <Paragraph>
            {about.organizers
              .map(organizer => {
                if (organizer.website)
                  return (
                    <a
                      key={organizer.name}
                      href={organizer.website}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {organizer.name}
                    </a>
                  );
                return organizer.name;
              })
              .reduce((prev, curr) => [prev, ", ", curr])}
          </Paragraph>
        </Layout.Section>
        <Layout.Section title="The Developers" transitionDelay={300}>
          <Paragraph>
            {about.developers
              .map(developer => {
                if (developer.website)
                  return (
                    <a
                      key={developer.name}
                      href={developer.website}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {developer.name}
                    </a>
                  );
                return developer.name;
              })
              .reduce((prev, curr) => [prev, ", ", curr])}
          </Paragraph>
        </Layout.Section>
        <Layout.Section title="The FAQs" transitionDelay={400}>
          <Collapse accordion>
            {about.faqs.map(faq => {
              if (!faq.is_mobile)
                return (
                  <Panel key={faq.question} header={faq.question}>
                    <Paragraph style={{ marginBottom: 0 }}>
                      {faq.answer}
                    </Paragraph>
                  </Panel>
                );
            })}
          </Collapse>
        </Layout.Section>
      </Layout.Container>
    );
  }
}
