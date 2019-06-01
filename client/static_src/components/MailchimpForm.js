import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";

class MailchimpForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
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
    );
  }
}

export default Form.create({ name: "mailchimp" })(MailchimpForm);
