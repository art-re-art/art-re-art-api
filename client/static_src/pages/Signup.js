import React from "react";
import { Steps, Typography, Row, Col, Collapse, Button, Icon } from "antd";
import axios from "axios";

import ArtistForm from "../components/SignupArtistForm";
import WorkForm from "../components/SignupWorkForm";

const { Step } = Steps;
const { Panel } = Collapse;
const { Title, Paragraph } = Typography;

export default class Signup extends React.Component {
  state = {
    dataArtist: {},
    dataWork: [{}],
    forms: [],
    current: 0,
    validationErrors: false,
    activeKey: "0"
  };

  _addWorkForm = () => {
    let dataWork = this.state.dataWork;
    dataWork.push({});
    this.setState({
      dataWork: dataWork,
      activeKey: String(this.state.dataWork.length - 1)
    });
  };

  _removeWorkForm = () => {
    let dataWork = this.state.dataWork;
    let forms = this.state.forms;
    dataWork.pop();
    forms.pop();
    this.setState({
      dataWork: dataWork,
      forms: forms,
      activeKey: String(dataWork.length - 1)
    });
  };

  _updateForms = form => {
    if (form !== null) {
      let forms = this.state.forms;
      forms.push(form);
      this.setState({
        forms: forms
      });
    }
  };

  _submitForms = () => {
    this.state.forms.map((form, index) => {
      this.setState({
        validationErrors: false
      });
      form.props.form.validateFields((err, data) => {
        if (!err) {
          if (form.constructor.name === "ArtistForm") {
            this.setState({
              dataArtist: data
            });
          } else {
            let dataWork = this.state.dataWork;
            dataWork[index - 1] = data;
            this.setState({
              dataWork: dataWork
            });
          }
          this.setState({
            current: 1
          });
        } else {
          this.setState({
            validationErrors: true
          });
        }
      });
    });
  };

  _changePanel = key => {
    this.setState({
      activeKey: key
    });
  };

  render() {
    return (
      <div className="container">
        <Row style={{ marginBottom: "2em" }}>
          <Col>
            <Steps current={this.state.current}>
              <Step title="Fill" />
              <Step title="Confirm" />
              <Step title="Complete" />
            </Steps>
          </Col>
        </Row>
        {this.state.current === 0 ? (
          <div className="signup-forms">
            <Row gutter={48}>
              <Col span={12}>
                <Title level={2}>Artist</Title>
                <Paragraph>Tell us about you!</Paragraph>
                <ArtistForm
                  wrappedComponentRef={this._updateForms}
                  data={this.state.dataArtist}
                />
              </Col>
              <Col span={12}>
                <Title level={2}>Work</Title>
                <Paragraph>Tell us about what you create!</Paragraph>
                <Collapse
                  accordion
                  defaultActiveKey="0"
                  activeKey={this.state.activeKey}
                  onChange={this._changePanel}
                >
                  {this.state.dataWork.map((data, index) => {
                    return (
                      <Panel
                        header={data.title ? data.title : "Work"}
                        key={index}
                        forceRender
                      >
                        <WorkForm
                          wrappedComponentRef={this._updateForms}
                          data={data}
                        />
                      </Panel>
                    );
                  })}
                </Collapse>
                <Row style={{ marginTop: "2em" }}>
                  <Col span={12}>
                    <Button onClick={this._removeWorkForm} type="primary">
                      <Icon type="minus" /> Remove last
                    </Button>
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    <Button onClick={this._addWorkForm} type="primary">
                      <Icon type="plus" /> Add another
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row style={{ marginTop: "2em" }}>
              <Col span={12}>
                {this.state.validationErrors ? (
                  <Paragraph style={{ color: "red" }}>
                    There were validation errors in the form, please correct
                    them and submit again!
                  </Paragraph>
                ) : null}
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Button onClick={this._submitForms} type="primary" size="large">
                  Confirm data <Icon type="caret-right" />
                </Button>
              </Col>
            </Row>
          </div>
        ) : null}
        {this.state.current === 1 ? (
          <div className="signup-forms">
        <Title level={2}>Confirm</Title>
        <Paragraph>Make sure everything is accurate!</Paragraph>
        <Row style={{ marginTop: "2em" }}>
          <Col span={12}>
            <Button onClick={() => {this.setState({current: 0})}} type="primary">
              <Icon type="caret-left" /> Fix data
            </Button>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Button onClick={() => {this.setState({current: 2})}} type="primary">
              Complete signup <Icon type="caret-right" />
            </Button>
          </Col>
        </Row>
        </div>
        ) : null}
        {this.state.current === 2 ? <Title level={2}>Complete</Title> : null}
      </div>
    );
  }
}
