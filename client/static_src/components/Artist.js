import React from "react";
import { Link } from "react-router-dom";
import { Col, Card } from "antd";

const { Meta } = Card;

export default class Artist extends React.Component {
  render() {
    return (
      <Col span={8}>
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
