import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Col, Card } from "antd";

const { Meta } = Card;

export default class Event extends React.Component {
  render() {
    return (
      <Col xl={8} lg={12} md={12} sm={24} style={{ padding: '1rem' }}>
        <Link to={`/events/${this.props.id}/`}>
          <Card
            hoverable
            cover={
              <div
                style={{ textAlign: "center", backgroundImage: `url('${this.props.featured_image}')`, backgroundSize: "cover", padding: "5em" }}
                // dangerouslySetInnerHTML={{ __html: this.props.featured_image }}
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
