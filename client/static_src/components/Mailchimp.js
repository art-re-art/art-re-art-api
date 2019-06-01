import React from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { Button, Input, Form } from "antd";

const CustomForm = ({ status, message, onValidated }) => {
  let email, name;

  const submit = () =>
    email &&
    name &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
      NAME: name.value
    });

  return (
    <div>
      <div
        style={{
          fontSize: "3em",
          fontWeight: "bold"
        }}
      >
        Newsletter signup.
      </div>
      {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
      {status === "error" && (
        <div
          style={{ color: "red" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          style={{ color: "green" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      <Form layout={'vertical'}>
        <Form.Item>
          <Input
            ref={node => (name = node)}
            type="text"
            placeholder="Your name"
          />
        </Form.Item>
        <Form.Item>
          <Input
            ref={node => (email = node)}
            type="email"
            placeholder="Your email"
          />
        </Form.Item>
        <Form.Item>
          <Button onClick={submit}>Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default class Mailchimp extends React.Component {
  render() {
    return (
      <MailchimpSubscribe
        url="https://instagram.us20.list-manage.com/subscribe/post?u=13807e65dcdd47793e6fbd92d&amp;id=c6c9345871"
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={formData => subscribe(formData)}
          />
        )}
      />
    );
  }
}
