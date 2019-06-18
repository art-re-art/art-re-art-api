import React from "react";
import ReactGA from "react-ga";
import { Collapse, Typography, Row, Divider } from "antd";

import Loading from "../components/Loading";

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
    fetch("/api/about/")
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
      <div className="container">
        <Row>
          <Title level={2}>The Down Low</Title>
          <Paragraph>{about.description}</Paragraph>
        </Row>
        <Divider dashed />
        <Row>
          <Title level={2}>The Organizers</Title>
          <Paragraph>
            {about.organizers
              .map(organizer => {
                return organizer.name;
              })
              .join(", ")}
          </Paragraph>
        </Row>
        <Divider dashed />
        <Row>
          <Title level={2}>The Developers</Title>
          <Paragraph>
            {about.developers
              .map(developer => {
                return developer.name;
              })
              .join(", ")}
          </Paragraph>
        </Row>
        <Divider dashed />
        <Row>
          <Title level={2}>FAQs</Title>
          <Collapse accordion>
            {about.faqs.map(faq => {
              return (
                <Panel key={faq.question} header={faq.question}>
                  <Paragraph>{faq.answer}</Paragraph>
                </Panel>
              );
            })}
          </Collapse>
        </Row>
      </div>
    );
  }
}
