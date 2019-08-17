import React from "react";
import ReactGA from "react-ga";
import { Link } from "react-router-dom";
import { Row, Col, Typography, Tag, Descriptions } from "antd";
import axios from "axios";

import Components from "../../components";

const { Cards, Layout, Image } = Components;

const { Title } = Typography;

import "./Artist.less";

export default class Artist extends React.Component {
  state = { artist: {}, isLoading: true, descriptions: [] };

  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    axios.get(`/api/artists/${this.props.match.params.id}/`).then(response => {
      let data = response.data;
      this.setState({
        artist: data,
        isLoading: false
      });
      this.props.setTitle(`${data.name}`);
      this._descriptions();
      this.props.finishLoading();
    });
  }

  _descriptions = () => {
    let artist = this.state.artist;
    let descriptions = [];
    if (artist.city && artist.state)
      descriptions.push(
        <Descriptions.Item key="Location" label="Location">
          {artist.city}, {artist.state}
        </Descriptions.Item>
      );
    if (artist.website)
      descriptions.push(
        <Descriptions.Item key="Website" label="Website">
          <a href={artist.website} target="_blank" rel="noopener noreferrer">
            {artist.website}
          </a>
        </Descriptions.Item>
      );
    if (artist.instagram)
      descriptions.push(
        <Descriptions.Item key="Instagram" label="Instagram">
          <a href={artist.instagram} target="_blank" rel="noopener noreferrer">
            {artist.instagram}
          </a>
        </Descriptions.Item>
      );
    if (artist.medium)
      descriptions.push(
        <Descriptions.Item key="Mediums" label="Mediums">
          {artist.medium.map(medium => {
            return (
              <Tag color="#ff0000" key={medium.id}>
                {medium.title}
              </Tag>
            );
          })}
        </Descriptions.Item>
      );
    if (artist.artist_statement)
      descriptions.push(
        <Descriptions.Item key="Artist Statement" label="Artist Statement">
          {artist.artist_statement}
        </Descriptions.Item>
      );
    if (artist.events)
      descriptions.push(
        <Descriptions.Item key="ART/RE/ART Events" label="ART/RE/ART Events">
          {this.state.artist.events
            .map(event => {
              return (
                <Link key={event.id} to={`/events/${event.id}-${event.slug}/`}>
                  {event.title}
                </Link>
              );
            })
            .reduce((prev, curr) => [prev, ", ", curr])}
        </Descriptions.Item>
      );
    this.setState({
      descriptions: descriptions
    });
  };

  render() {
    const artist = this.state.artist;

    if (this.state.isLoading) return null;

    return (
      <Layout.Container>
        <Layout.Section title="Artist Information">
          <Row
            gutter={24}
            style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
          >
            <Col xl={8} lg={24} style={{ textAlign: "center" }}>
              {this.state.artist.image ? (
                <Image.ResponsiveImage src={artist.image.square.url} />
              ) : (
                <Image.ResponsiveImage src={artist.qrcode.large.url} />
              )}
            </Col>
            <Col xl={16}>
              <Descriptions
                bordered
                size="small"
                column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}
              >
                {this.state.descriptions.map(description => {
                  return description;
                })}
              </Descriptions>
            </Col>
          </Row>
        </Layout.Section>
        {this.state.artist.works.length > 0 && (
          <Layout.Section title="Artist Portfolio">
            <Title level={2}></Title>
            <Row
              style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "stretch",
                flexWrap: "wrap"
              }}
              gutter={24}
            >
              {this.state.artist.works.map((work, index) => (
                <Cards.Work
                  key={work.id}
                  index={index}
                  artistName={this.state.artist.name}
                  {...work}
                />
              ))}
            </Row>
          </Layout.Section>
        )}
      </Layout.Container>
    );
  }
}
