import React from "react";
import { Typography, Form, Input, Button } from "antd";
import axios from "axios";

const { Paragraph } = Typography;

class MailchimpForm extends React.Component {
  state = {
    success: false
  };

  _handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .post("/api/mailchimp/", values)
          .then(response => {
            this.setState({
              success: true,
              error: false
            });
            console.log(response);
          })
          .catch(error => {
            this.setState({
              error: true
            });
            console.log(error);
          });
      }
    });
  };

  render() {
    if (this.state.success) {
      return (
        <Paragraph>Thank you for signing up for our newsletter!</Paragraph>
      );
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <div className="mailchimp-form">
        {this.state.error ? (
          <Paragraph>
            There was an unexpected error, please try again.
          </Paragraph>
        ) : null}
        <Form onSubmit={this._handleSubmit}>
          <Form.Item>
            {getFieldDecorator("first_name", {
              rules: [
                { required: false, message: "Please input your first name!" },
                {
                  max: 255,
                  message: "Your first name must be less than 255 characters!"
                }
              ]
            })(<Input placeholder="First name" size="large" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("last_name", {
              rules: [
                { required: false, message: "Please input your last name!" },
                {
                  max: 255,
                  message: "Your last name must be less than 255 characters!"
                }
              ]
            })(<Input placeholder="Last name" size="large" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Invalid email address!" },
                {
                  max: 255,
                  message: "Your email must be less than 255 characters!"
                }
              ]
            })(<Input placeholder="Email" size="large" />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Subscribe
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedMailchimpForm = Form.create({ name: "mailchimp" })(MailchimpForm);

export default class Mailchimp extends React.Component {
  render() {
    return (
      <div className="mailchimp-container">
        <div className="footer__heading">Subscribe to our newsletter.</div>
        <WrappedMailchimpForm />
      </div>
    );
  }
}
