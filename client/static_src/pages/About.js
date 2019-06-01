import React from "react";
import { Collapse } from "antd";

export default class About extends React.Component {
  render() {
    return (
      <div className="about-page">
        <div className="container-fluid p-3 p-lg-4 p-xl-5">
          <div className="container p-0">
            <div className="my-3 my-lg-4 my-xl-5">
              <h2>The Down Low</h2>
              <p>A series of pop up art events in downtown Morganton, NC.</p>
            </div>
            <div className="my-3 my-lg-4 my-xl-5">
              <h2>The Organizers</h2>
              <p>
                Nancy VanNoppen, Alexander Collett, Jean C. VanNoppen, Derek
                Long, Ellen VanNoppen, Jean B. VanNoppen, Allen VanNoppen, Rob
                Childress, Kayla Oelhafen
              </p>
            </div>
            <div className="my-3 my-lg-4 my-xl-5">
              <h2>The Developers</h2>
              <p>Nancy VanNoppen, Jean VanNoppen, Isaac Bythewood</p>
            </div>
            <div className="my-3 my-lg-4 my-xl-5">
              <h2>FAQs</h2>
              <Collapse>
                <Collapse.Panel header="What is ART/RE/ART?">
                  <p>
                    ART/RE/ART is a series of pop-up art shows taking place in
                    and around Morganton, NC.
                  </p>
                </Collapse.Panel>
                <Collapse.Panel header="Where do the shows take place?">
                  <p>
                    ART/RE/ART changes venue with each show. Check out our
                    Events tab to learn more.
                  </p>
                </Collapse.Panel>
                <Collapse.Panel header="How can I participate in the show?">
                  <p>
                    Sign up on our website for email updates and follow us on
                    Instagram to stay tuned about calls for submissions. We also
                    can always use help from volunteers, email us at
                    artreart.morganton@gmail.com if you're interested in
                    volunteering.
                  </p>
                </Collapse.Panel>
                <Collapse.Panel header="Where can I learn more?">
                  <p>
                    Visit our website, www.artreart.com, or email us
                    artreart.morganton@gmail.com.
                  </p>
                </Collapse.Panel>
              </Collapse>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
