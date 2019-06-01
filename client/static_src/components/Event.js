import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Col, Card } from "antd";

const { Meta } = Card;

export default class Event extends React.Component {
  render() {
    return (
      <Col xl={8} lg={12} md={12} sm={24}>
        <Link to={`/events/${this.props.id}/`}>
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
              title={this.props.title}
              description={moment(this.props.datetime).format("LLLL")}
            />
          </Card>
        </Link>
      </Col>
    );
  }
}
