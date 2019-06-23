import React from "react";
import ReactGA from "react-ga";
import { Collapse, Typography, Row, Divider } from "antd";

import Components from "../components";

const { Loading, Layout } = Components;

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

export default class About extends React.Component {
  state = {
    about: {},
    isLoading: true
  };

  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.props.setTitle("About");
    fetch("/api/about/about/")
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({
          about: data[0],
          isLoading: false
        });
      });
  }

  render() {
    let about = this.state.about;

    if (this.state.isLoading) {
      return <Loading />;
    }

    return (
      <Layout.Container>
        <Layout.Section title="The Down Low">
          <Paragraph>{about.description}</Paragraph>
        </Layout.Section>
        <Layout.Section title="The Organizers">
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
        <Layout.Section title="The Developers">
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
        <Layout.Section title="The FAQs">
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
