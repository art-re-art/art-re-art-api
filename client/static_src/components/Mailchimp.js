import React from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { Button } from "antd";

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
      <div className="my-3 d-flex flex-column">
        <input
          ref={node => (name = node)}
          type="text"
          placeholder="Your name"
          style={{
            background: "red",
            border: "2px solid red",
            transition: "background .2s",
            color: "#fff",
            padding: ".5rem 1rem",
            fontSize: "1.2rem",
            marginBottom: ".5em",
            width: "100%"
          }}
        />
      </div>
      <div className="my-3 d-flex flex-column">
        <input
          ref={node => (email = node)}
          type="email"
          placeholder="Your email"
          style={{
            background: "red",
            border: "2px solid red",
            transition: "background .2s",
            color: "#fff",
            padding: ".5rem 1rem",
            fontSize: "1.2rem",
            marginBottom: ".5em",
            width: "100%"
          }}
        />
      </div>
      <Button onClick={submit}>
        Submit
      </Button>
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
