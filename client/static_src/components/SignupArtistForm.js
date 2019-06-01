import React from "react";
import { Form, Input, Button, Typography } from "antd";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

class ArtistForm extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 4
        }
      }
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <div style={{ padding: "3em 0" }}>
          <Title level={2}>About You</Title>
          <Paragraph>Tell us about you and your art!</Paragraph>
        </div>
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
                required: false,
                message: "Please input your artist statement!"
              }
            ]
          })(<TextArea />)}
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
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Next step
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: "artist" })(ArtistForm);
