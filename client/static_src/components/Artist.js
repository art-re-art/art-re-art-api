import React from "react";
import { Link } from "react-router-dom";
import { Col, Card } from "antd";

const { Meta } = Card;

export default class Artist extends React.Component {
  render() {
    return (
      <Col xl={8} lg={12} md={12} sm={24} style={{ padding: '1rem' }}>
        <Link to={`/artists/${this.props.id}/`}>
          <Card
            hoverable
            cover={
              <div
                style={{ textAlign: "center" }}
                dangerouslySetInnerHTML={{ __html: this.props.qrcode }}
              />
            }
          >
            <Meta
              title={this.props.name}
              description={this.props.medium
                .map(medium => {
                  return medium.title;
                })
                .join(", ")}
            />
          </Card>
        </Link>
      </Col>
    );
  }
}
