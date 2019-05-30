import React from "react";

import Mailchimp from "./Mailchimp";

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer mt-auto">
        <div className="container-fluid py-3 py-lg-5">
          <div className="row">
            <div className="col-lg-8 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-left">
              <div className="display-4 mb-4">Let's connect.</div>
              <a
                href="mailto:artreart.morganton@gmail.com"
                className="footer__link text-decoration-none mb-4"
              >
                artreart.morganton@gmail.com
              </a>
              <a
                href="https://www.instagram.com/art_re_art/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link text-decoration-none mb-4"
              >
                Instagram
              </a>
            </div>
            <div className="col-lg-4">
              <Mailchimp />
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
