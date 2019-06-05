import React from "react";
import { Form, Input, Button } from "antd";

const { TextArea } = Input;

class ArtistForm extends React.Component {
  componentDidMount() {
    if (this.props.data) {
      this.props.form.setFieldsValue(this.props.data);
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Name">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Please input your name!"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Phone number">
          {getFieldDecorator("phone_number", {
            rules: [
              {
                required: false,
                message: "Please input your phone number!"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="City">
          {getFieldDecorator("city", {
            rules: [
              {
                required: true,
                message: "Please input your city!"
              },
              {
                max: 255,
                message: "Your city name is too long!"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="State">
          {getFieldDecorator("state", {
            rules: [
              {
                required: true,
                message: "Please input your state!"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Artist statement">
          {getFieldDecorator("artist_statement", {
            rules: [
              {
                required: true,
                message: "Please input your artist statement!"
              }
            ]
          })(<TextArea autosize />)}
        </Form.Item>
        <Form.Item label="Website">
          {getFieldDecorator("website", {
            rules: [
              {
                type: "url",
                message:
                  "This is not a valid URL! Make sure you include the 'http://' or 'https://'."
              },
              { required: false, message: "Please input website!" }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Instagram">
          {getFieldDecorator("instagram", {
            rules: [
              {
                type: "url",
                message:
                  "This is not a valid URL! Make sure you include the 'http://' or 'https://'."
              },
              { required: false, message: "Please input instagram!" }
            ]
          })(<Input />)}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(ArtistForm);
