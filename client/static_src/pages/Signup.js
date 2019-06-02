import React from "react";

import { Steps, Typography, Row, Col, message } from "antd";

import ArtistForm from "../components/SignupArtistForm";
import WorkForm from "../components/SignupWorkForm";
import ConfirmForm from "../components/SignupConfirmForm";
import Complete from "../components/SignupComplete";
import axios from "axios";

const { Step } = Steps;
const { Title } = Typography;

export default class Signup extends React.Component {
  state = {
    artistFormData: null,
    workFormData: null,
    confirmFormData: null,
    current: 0
  };

  _handleArtistForm = artistFormData => {
    this.setState({
      artistFormData: artistFormData,
      current: 1
    });
  };

  _handleWorkForm = workFormData => {
    this.setState({
      workFormData: workFormData,
      current: 2
    });
  };

  _handleConfirmForm = confirmFormData => {
    this.setState({
      confirmFormData: confirmFormData
    });
    axios
      .post("/api/artistsignup/", this.state.artistFormData, {
        xsrfCookieName: "csrftoken",
        xsrfHeaderName: "X-CSRFToken"
      })
      .then(response => {
        const artist_url = response.data.url;
        const workFormData = this.state.workFormData;
        workFormData.artist_signup = artist_url;
        axios
          .post("/api/artistsignupwork/", workFormData, {
            xsrfCookieName: "csrftoken",
            xsrfHeaderName: "X-CSRFToken"
          })
          .then(response => {
            message.success("Form submitted, you're all done!");
            this.setState({
              artistFormData: null,
              workFormData: null,
              confirmFormData: null,
              current: 3
            });
          })
          .catch(error => {
            console.log(error);
          });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  _onChange = current => {
    if (this.state.confirmFormData === null && current === 3) {
      message.error("You can't complete what isn't finished!");
    } else if (
      this.state.artistFormData === null &&
      this.state.workFormData === null &&
      current === 2
    ) {
      message.error("You can't confirm what doesn't exist!");
    } else {
      this.setState({
        current: current
      });
    }
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
            <Step title="Artist" />
            <Step title="Work" />
            <Step title="Confirm" />
            <Step title="Complete!" />
          </Steps>
        </Row>
        {this.state.current === 0 ? (
          <ArtistForm
            handleSubmit={this._handleArtistForm}
            data={this.state.artistFormData}
          />
        ) : null}
        {this.state.current === 1 ? (
          <WorkForm
            handleSubmit={this._handleWorkForm}
            data={this.state.workFormData}
          />
        ) : null}
        {this.state.current === 2 ? (
          <ConfirmForm
            handleSubmit={this._handleConfirmForm}
            artistFormData={this.state.artistFormData}
            workFormData={this.state.workFormData}
          />
        ) : null}
        {this.state.current === 3 ? <Complete /> : null}
      </div>
    );
  }
}
