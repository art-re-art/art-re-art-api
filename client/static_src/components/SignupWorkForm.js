import React from "react";
import { Form, Input, Button, Typography, Upload, Icon, Row, Col } from "antd";
import Cookies from "js-cookie";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;

export default class WorkForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleSubmit(values);
      }
    });
  };

  componentDidMount() {
    if (this.props.data) {
      this.props.form.setFieldsValue(this.props.data);
    }
  }

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
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
          offset: 8
        }
      }
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Row style={{ padding: "3em 0" }}>
          <Col offset={8}>
            <Title level={2}>Your work</Title>
            <Paragraph>Tell us about your art!</Paragraph>
          </Col>
        </Row>
        <Form.Item label="Image">
          {getFieldDecorator("image", {
            getValueFromEvent: this.normFile,
            rules: [
              {
                required: true,
                message: "Please upload an image!"
              }
            ]
          })(
            <Dragger
              name="image"
              action="/api/artistsignupworkimage/"
              headers={{ "X-CSRFToken": Cookies.get("csrftoken") }}
              listType="picture"
              multiple={false}
              accept=".png,.jpg,.jpeg"
            >
              <Paragraph>
                <Icon type="inbox" style={{ fontSize: 40 }} />
              </Paragraph>
              <Paragraph style={{ marginBotom: 0}}>
                Click or drag file to this area to upload
              </Paragraph>
            </Dragger>
          )}
        </Form.Item>
        <Form.Item label="Title">
          {getFieldDecorator("title", {
            rules: [
              {
                required: true,
                message: "Please input your title!"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Medium">
          {getFieldDecorator("medium", {
            rules: [
              {
                required: true,
                message: "Please input your medium!"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator("description", {
            rules: [
              {
                required: true,
                message: "Please input your description!"
              }
            ]
          })(<TextArea autosize />)}
        </Form.Item>
        <Form.Item label="Special installation needs">
          {getFieldDecorator("special_installation_needs", {
            rules: [
              {
                required: false,
                message: "Please input your special installation needs!"
              }
            ]
          })(<TextArea autosize />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Save work
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
