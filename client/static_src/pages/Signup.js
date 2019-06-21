import React from "react";
import ReactGA from "react-ga";
import { Prompt } from "react-router-dom";
import {
  Steps,
  Typography,
  Row,
  Col,
  Collapse,
  Button,
  Icon,
  message,
  Descriptions
} from "antd";
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
    activeKey: "0",
    notComplete: true
  };

  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.props.setTitle("Artist Signup");
  }

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
    if (dataWork.length === 1) {
      message.error("You share at least one piece of work you've done.");
    } else {
      dataWork.pop();
      forms.pop();
      this.setState({
        dataWork: dataWork,
        forms: forms,
        activeKey: String(dataWork.length - 1)
      });
    }
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

  _submitForms = async () => {
    this.setState({
      validationErrors: false
    });
    await this.state.forms.map((form, index) => {
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
        } else {
          this.setState({
            validationErrors: true
          });
        }
      });
    });
    if (this.state.validationErrors === false) {
      if (this.state.current === 0) {
        this.setState({
          current: 1
        });
      } else {
        this.setState({
          current: 2
        });
      }
    } else {
      message.error(
        "You didn't finish filling something out! Please complete the full form."
      );
    }
  };

  _changePanel = key => {
    this.setState({
      activeKey: key
    });
  };

  _completeSignup = async () => {
    const artistSignup = await axios.post(
      "/api/forms/artistsignups/",
      this.state.dataArtist
    );
    const artistUrl = artistSignup.data.url;
    await this.state.dataWork.map(work => {
      work.artist_signup = artistUrl;
      work.image = work.image[work.image.length - 1].response.url;
      axios.post("/api/forms/artistsignups/works/", work);
    });
    this.setState({
      current: 2,
      notComplete: false
    });
  };

  render() {
    return (
      <div className="container">
        <Prompt
          message="If you leave this page now you will lose form progress, are you sure?"
          when={this.state.notComplete}
        />
        <Row style={{ marginBottom: "2em" }}>
          <Col>
            <Steps current={this.state.current}>
              <Step title="Artist" />
              <Step title="Works" />
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
                  Add works <Icon type="caret-right" />
                </Button>
              </Col>
            </Row>
          </div>
        ) : null}
        {this.state.current === 1 ? (
          <div className="signup-forms">
            <Row gutter={48}>
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
        {this.state.current === 2 ? (
          <div className="signup-forms">
            <Row style={{ marginTop: "2em" }}>
              <Col>
                <Title level={2}>Confirm</Title>
                <Paragraph>Just making sure everything is accurate.</Paragraph>
              </Col>
            </Row>
            <Row style={{ marginTop: "2em" }}>
              <Descriptions title="Artist" bordered>
                {Object.keys(this.state.dataArtist).map(key => {
                  return (
                    <Descriptions.Item label={key} key={key}>
                      {this.state.dataArtist[key]}
                    </Descriptions.Item>
                  );
                })}
              </Descriptions>
            </Row>
            {this.state.dataWork.map(work => {
              return (
                <Row style={{ marginTop: "2em" }} key={work.title}>
                  <Descriptions title="Work" bordered>
                    {Object.keys(work).map(key => {
                      if (typeof work[key] !== "object") {
                        return (
                          <Descriptions.Item label={key} key={key}>
                            {work[key]}
                          </Descriptions.Item>
                        );
                      } else {
                        return <Descriptions.Item label={key} key={key} />;
                      }
                    })}
                  </Descriptions>
                </Row>
              );
            })}
            <Row style={{ marginTop: "2em" }}>
              <Col span={24} style={{ textAlign: "right" }}>
                <Button onClick={this._completeSignup} type="primary">
                  Complete signup <Icon type="caret-right" />
                </Button>
              </Col>
            </Row>
          </div>
        ) : null}
        {this.state.current === 3 ? (
          <div className="signup-forms">
            <Row style={{ marginTop: "2em" }}>
              <Col>
                <Title level={2}>Complete</Title>
                <Paragraph>
                  Thank you for signing up for Art/Re/Art, we will be in touch!
                </Paragraph>
              </Col>
            </Row>
          </div>
        ) : null}
      </div>
    );
  }
}
