import React from "react";
import { Form, Button, Row, Col } from "antd";

import SignupWorkForm from "./SignupWorkForm";

const WorkFormWrapper = Form.create({ name: "work" })(SignupWorkForm);

export default class SignupWork extends React.Component {
  state = {
    workForms: [null],
    workFormsData: []
  };

  componentDidMount() {
    this.setState({
      workFormsData: this.props.data
    });
  }

  _nextStep = () => {
    return this.props.handleSubmit(this.state.workFormsData);
  };

  _handleSubmit = data => {
    const workFormsData = this.state.workFormsData;
    workFormsData.push(data);
    this.setState({
      workFormsData: workFormsData
    });
  };

  render() {
    return (
      <div className="signup-work">
        {this.state.workForms
          ? this.state.workForms.map(workForm => {
              return <WorkFormWrapper key="1" handleSubmit={this._handleSubmit} />;
            })
          : null}
        <Row>
          <Col offset={8}>
            <Button type="primary" onClick={this._nextStep}>
              Next step
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
