import React from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";

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
    <div
      className="w-100"
    >
      <div className="display-4 mb-4">Newsletter signup.</div>
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
        className="footer__input"
      />
      </div>
      <div className="my-3 d-flex flex-column">
      <input
        ref={node => (email = node)}
        type="email"
        placeholder="Your email"
        className="footer__input"
      />
      </div>
      <button className="btn btn-dark" onClick={submit}>
        Submit
      </button>
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
