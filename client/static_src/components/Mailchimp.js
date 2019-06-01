import React from "react";
import { Typography } from "antd";
import MailchimpSubscribe from "react-mailchimp-subscribe";

import MailchimpForm from "./MailchimpForm";

export default class Mailchimp extends React.Component {
  render() {
    return (
      <div className="mailchimp-signup">
        <div style={{ fontSize: "3em", fontWeight: "bold" }}>
          Subscribe to our newsletter.
        </div>
        <MailchimpForm />
      </div>
    );
  }
}
