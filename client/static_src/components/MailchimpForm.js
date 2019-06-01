import React from "react";
import { Form, Input, Button, Typography } from "antd";

import axios from "axios";

const { Paragraph } = Typography;

class MailchimpForm extends React.Component {
  state = {
    success: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
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
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("first_name", {
              rules: [
                { required: false, message: "Please input your first name!" }
              ]
            })(<Input placeholder="First name" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("last_name", {
              rules: [
                { required: false, message: "Please input your last name!" }
              ]
            })(<Input placeholder="Last name" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Invalid email address!" }
              ]
            })(<Input placeholder="Email" />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Subscribe
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: "mailchimp" })(MailchimpForm);
