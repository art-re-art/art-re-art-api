import React from "react";
import ReactGA from "react-ga";
import { Link } from "react-router-dom";
import { Row, Col, Typography, Tag } from "antd";

import Loading from "../components/Loading";
import Work from "../components/Work";

const { Title, Paragraph } = Typography;

import "../styles/Artist.less";

export default class Artist extends React.Component {
  state = { artist: {}, isLoading: true };

  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    fetch(`/api/artists/${this.props.match.params.id}/`)
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({
          artist: data,
          isLoading: false
        });
        this.props.setTitle(`${data.name} | Artist`);
      });
  }

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
            <div className="ant-descriptions artist-info bordered">
              <div className="ant-descriptions-view">
                <table>
                  <tbody>
                    {this.state.artist.state && (
                      <tr className="ant-descriptions-row">
                        <td className="ant-descriptions-item-label">
                          Location
                        </td>
                        <td className="ant-descriptions-item-content">
                          {this.state.artist.city}, {this.state.artist.state}
                        </td>
                      </tr>
                    )}
                    {this.state.artist.website && (
                      <tr className="ant-descriptions-row">
                        <td className="ant-descriptions-item-label">Website</td>
                        <td className="ant-descriptions-item-content">
                          <a href={this.state.artist.website}>
                            {this.state.artist.website}
                          </a>
                        </td>
                      </tr>
                    )}
                    {this.state.instagram && (
                      <tr className="ant-descriptions-row">
                        <td className="ant-descriptions-item-label">
                          Instagram
                        </td>
                        <td className="ant-descriptions-item-content">
                          <a href={this.state.artist.instagram}>
                            {this.state.artist.instagram}
                          </a>
                        </td>
                      </tr>
                    )}
                    <tr className="ant-descriptions-row">
                      <td className="ant-descriptions-item-label">Mediums</td>
                      <td className="ant-descriptions-item-content">
                        {this.state.artist.medium.map(medium => {
                          return (
                            <Tag color="#ff0000" key={medium.url}>
                              {medium.title}
                            </Tag>
                          );
                        })}
                      </td>
                    </tr>
                    {this.state.artist.artist_statement && (
                      <tr className="ant-descriptions-row">
                        <td className="ant-descriptions-item-label">
                          Artist statement
                        </td>
                        <td className="ant-descriptions-item-content">
                          {this.state.artist.artist_statement}
                        </td>
                      </tr>
                    )}
                    <tr className="ant-descriptions-row">
                      <td className="ant-descriptions-item-label">
                        ART/RE/ART Events
                      </td>
                      <td className="ant-descriptions-item-content">
                        {this.state.artist.events
                          ? this.state.artist.events.map(event => {
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
                            })
                          : null}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Col>
        </Row>
        {this.state.artist.works ? (
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
                  key={work.url}
                  artistName={this.state.artist.name}
                  {...work}
                />
              ))}
            </Row>
          </div>
        ) : null}
      </div>
    );
  }
}
