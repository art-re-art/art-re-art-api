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

  _handleConfirmForm = async confirmFormData => {
    this.setState({
      confirmFormData: confirmFormData
    });

    const axiosConfig = {
      xsrfCookieName: "csrftoken",
      xsrfHeaderName: "X-CSRFToken"
    };
    const artist_signup = await axios.post(
      "/api/artistsignup/",
      this.state.artistFormData,
      axiosConfig
    );
    const workFormData = this.state.workFormData;
    workFormData.artist_signup = artist_signup.data.url;
    const artist_signup_work = await axios.post(
      "/api/artistsignupwork/",
      workFormData,
      axiosConfig
    );
    if (artist_signup_work.status === 201) {
      message.success("Form submitted, you're all done!");
      this.setState({
        artistFormData: null,
        workFormData: null,
        confirmFormData: null,
        current: 3
      });
    } else {
      message.error("Something went wrong, please try again later!");
    }
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
