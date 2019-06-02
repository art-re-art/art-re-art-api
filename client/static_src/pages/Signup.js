import React from "react";

import { Steps, Typography, Row, Col } from "antd";

import ArtistForm from "../components/SignupArtistForm";

const { Step } = Steps;
const { Title } = Typography;

export default class Signup extends React.Component {
  state = {
    artistFormData: null,
    workFormData: null,
    current: 0
  };

  _handleArtistForm = artistFormData => {
    console.log(artistFormData);
    this.setState({
      artistFormData: artistFormData,
      current: 1
    });
  };

  _handleWorkForm = workFormData => {
    console.log(workFormData);
    this.setState({
      workFormData: workFormData,
      current: 2
    });
  };

  _onChange = current => {
    this.setState({
      current: current
    });
  };

  render() {
    return (
      <div className="container">
        <Row>
          <Steps
            size="small"
            current={this.state.current}
            onChange={this._onChange}
          >
            <Step title="About You" />
            <Step title="Your Work" />
            <Step title="Finished!" />
          </Steps>
        </Row>
        {this.state.current === 0 ? (
          <ArtistForm handleSubmit={this._handleArtistForm} />
        ) : null}
        {this.state.current === 1 ? (
          <Title level={2}>Works of art!</Title>
        ) : null}
        {this.state.current === 2 ? <Title level={2}>Ya done</Title> : null}
      </div>
    );
  }
}
