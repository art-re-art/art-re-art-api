import React from "react";

import { Steps, Typography, Row, Col } from "antd";

import WrappedRegistrationForm from "../components/SignupArtistForm";

const { Step } = Steps;
const { Title } = Typography;

class FormSteps extends React.Component {
  render() {
    return (
      <Row>
        <Steps size="small" current={0}>
          <Step title="About You" />
          <Step title="Your Work" />
          <Step title="Finished!" />
        </Steps>
      </Row>
    );
  }
}

export default class Signup extends React.Component {
  render() {
    return (
      <div className="container">
        <FormSteps />
        <WrappedRegistrationForm />
      </div>
    );
  }
}
