import React from "react";
import ReactGA from "react-ga";
import { Prompt } from "react-router-dom";
import {
  div,
  Steps,
  Typography,
  Row,
  Col,
  Collapse,
  Button,
  Icon,
  message
} from "antd";
import axios from "axios";

import ArtistForm from "../components/SignupArtistForm";
import WorkForm from "../components/SignupWorkForm";
import { async } from "q";

const { Step } = Steps;
const { Panel } = Collapse;
const { Title, Paragraph } = Typography;

export default class Signup extends React.Component {
  state = {
    dataArtist: {},
    dataWork: [{}],
    artistForm: {},
    workForms: [],
    current: 0,
    validationErrors: false,
    activeKey: "0",
    notComplete: true
  };

  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.props.setTitle("Artist Signup");
  }

  _updateArtistForm = artistForm => {
    this.setState({
      artistForm: artistForm
    });
  };

  _updateWorkForms = workForm => {
    if (workForm !== null) {
      let workForms = this.state.workForms;
      workForms.push(workForm);
      this.setState({
        workForms: workForms
      });
    }
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
    let workForms = this.state.workForms;
    if (dataWork.length === 1) {
      message.error("You share at least one piece of work you've done.");
    } else {
      dataWork.pop();
      workForms.pop();
      this.setState({
        dataWork: dataWork,
        workForms: workForms,
        activeKey: String(dataWork.length - 1)
      });
    }
  };

  _submitArtistForm = async () => {
    this.state.artistForm.props.form.validateFields((err, data) => {
      if (!err) {
        window.scrollTo(0, 0);
        this.setState({
          dataArtist: data,
          current: 1
        });
      } else {
        this.setState({
          validationErrors: true
        });
        message.error(
          "You didn't finish filling something out! Please complete the full form."
        );
      }
    });
  };

  _submitWorkForms = async () => {
    await this.state.workForms.map((form, index) => {
      form.props.form.validateFields((err, data) => {
        if (!err) {
          let dataWork = this.state.dataWork;
          dataWork[index] = data;
          this.setState({
            dataWork: dataWork
          });
        } else {
          this.setState({
            validationErrors: true
          });
        }
      });
    });
    if (this.state.validationErrors === false) {
      window.scrollTo(0, 0);
      this.setState({
        current: 2
      });
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
      "/api/forms/artistsignups/artists/",
      this.state.dataArtist,
      {
        xsrfHeaderName: "X-CSRFToken",
        xsrfCookieName: "csrftoken"
      }
    );
    const artistUrl = artistSignup.data.url;
    await this.state.dataWork.map(work => {
      work.artist_signup = artistUrl;
      work.image = work.image[work.image.length - 1].response.url;
      axios.post("/api/forms/artistsignups/works/", work, {
        xsrfHeaderName: "X-CSRFToken",
        xsrfCookieName: "csrftoken"
      });
    });
    window.scrollTo(0, 0);
    this.setState({
      current: 3,
      notComplete: false
    });
  };

  render() {
    return (
      <div className="container">
        {Object.entries(this.state.dataArtist).length !== 0 && (
          <Prompt
            message="If you leave this page now you will lose form progress, are you sure?"
            when={this.state.notComplete}
          />
        )}
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
        {this.state.current === 0 && (
          <div className="signup-forms">
            <Row gutter={48}>
              <Col>
                <Title level={2}>Artist</Title>
                <Paragraph>Tell us about you!</Paragraph>
                <ArtistForm
                  wrappedComponentRef={this._updateArtistForm}
                  data={this.state.dataArtist}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: "2em" }}>
              <Col span={12}>
                {this.state.validationErrors && (
                  <Paragraph style={{ color: "red" }}>
                    There were validation errors in the form, please correct
                    them and submit again!
                  </Paragraph>
                )}
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Button
                  onClick={this._submitArtistForm}
                  type="primary"
                  size="large"
                >
                  Add works <Icon type="caret-right" />
                </Button>
              </Col>
            </Row>
          </div>
        )}
        {this.state.current === 1 && (
          <div className="signup-forms">
            <Row gutter={48}>
              <Col>
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
                          wrappedComponentRef={this._updateWorkForms}
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
              <Col>
                {this.state.validationErrors && (
                  <Paragraph style={{ color: "red" }}>
                    There were validation errors in the form, please correct
                    them and submit again!
                  </Paragraph>
                )}
              </Col>
            </Row>
            <Row style={{ marginTop: "2em" }}>
              <Col span={12}>
                <Button
                  onClick={this._editArtistForm}
                  type="primary"
                  size="large"
                >
                  <Icon type="caret-left" /> Edit artist
                </Button>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Button
                  onClick={this._submitWorkForms}
                  type="primary"
                  size="large"
                >
                  Confirm signup <Icon type="caret-right" />
                </Button>
              </Col>
            </Row>
          </div>
        )}
        {this.state.current === 2 && (
          <div className="signup-forms">
            <Row style={{ marginTop: "2em" }}>
              <Col>
                <Title level={2}>Confirm</Title>
                <Paragraph>
                  Are you sure you want to submit yourself and your work to
                  Art/Re/Art?
                </Paragraph>
              </Col>
            </Row>
            <Row style={{ marginTop: "2em" }}>
              <Col span={12}>
                <Button
                  onClick={this._editWorksForm}
                  type="primary"
                  size="large"
                >
                  <Icon type="caret-left" /> Edit signup
                </Button>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Button
                  onClick={this._completeSignup}
                  type="primary"
                  size="large"
                >
                  Complete signup <Icon type="caret-right" />
                </Button>
              </Col>
            </Row>
          </div>
        )}
        {this.state.current === 3 && (
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
        )}
      </div>
    );
  }
}
