import React from "react";
import ReactGA from "react-ga";
import { Link } from "react-router-dom";
import { Row, Col, Typography, Tag, Descriptions } from "antd";

import Loading from "../components/Loading";
import Work from "../components/Work";

const { Title } = Typography;

import "../styles/Artist.less";

export default class Artist extends React.Component {
  state = { artist: {}, isLoading: true, descriptions: [] };

  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    fetch(`/api/artists/artists/${this.props.match.params.id}/`)
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({
          artist: data,
          isLoading: false
        });
        this.props.setTitle(`${data.name}`);
        this._descriptions();
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
          {this.state.artist.events.map(event => {
            return (
              <Link
                key={event.url}
                to={`/events/${event.id}/`}
                style={{
                  marginRight: "10px",
                  textDecoration: "underline"
                }}
              >
                {event.title}
              </Link>
            );
          })}
        </Descriptions.Item>
      );
    this.setState({
      descriptions: descriptions
    });
  };

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }

    return (
      <div className="container">
        <Row gutter={24} lg={24}>
          <Col xl={8} lg={24}>
            {this.state.artist.image ? (
              <img
                src={this.state.artist.image.small.url}
                className="arist-img"
              />
            ) : (
              <div
                style={{ textAlign: "center" }}
                dangerouslySetInnerHTML={{ __html: this.state.artist.qrcode }}
              />
            )}
          </Col>
          <Col xl={16}>
            <Title level={2}>{this.state.artist.name}</Title>
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
        {this.state.artist.works.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <Title level={2}>Works by {this.state.artist.name}</Title>
            <Row
              style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "stretch",
                flexWrap: "wrap"
              }}
              gutter={24}
            >
              {this.state.artist.works.map(work => (
                <Work
                  key={work.id}
                  artistName={this.state.artist.name}
                  {...work}
                />
              ))}
            </Row>
          </div>
        )}
      </div>
    );
  }
}
