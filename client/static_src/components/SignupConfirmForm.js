import React from "react";
import {
  Form,
  Button,
  Typography,
  Descriptions,
  Checkbox,
  Row,
  Col
} from "antd";

const { Title, Paragraph } = Typography;
const { Item } = Descriptions;

class ConfirmForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleSubmit(values);
      }
    });
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
            <Title level={2}>Confirm</Title>
            <Paragraph>Make sure everything is accurate!</Paragraph>
          </Col>
        </Row>
        <Row style={{ padding: "3em 0" }}>
          <Col offset={8}>
            {this.props.artistFormData ? (
              <Descriptions title="Artist" bordered>
                <Item label="Name">{this.props.artistFormData.name}</Item>
                <Item label="Email">{this.props.artistFormData.email}</Item>
              </Descriptions>
            ) : null}
            {this.props.workFormData ? (
              <Descriptions title="Work" bordered>
                <Item label="Title">{this.props.workFormData.title}</Item>
              </Descriptions>
            ) : null}
          </Col>
        </Row>
        {this.props.artistFormData && this.props.workFormData ? (
          <Row>
            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator("agreement", {
                valuePropName: "checked"
              })(
                <Checkbox>
                  I give Art/Re/Art permission to use me and my work for the
                  purposes of promoting the Art/Re/Art shows.
                </Checkbox>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Complete
              </Button>
            </Form.Item>
          </Row>
        ) : null}
      </Form>
    );
  }
}

export default Form.create({ name: "confirm" })(ConfirmForm);
