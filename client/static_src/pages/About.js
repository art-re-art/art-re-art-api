import React from "react";
import { Collapse, Typography, Row, Divider } from "antd";

import "../styles/About.less";

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

export default class About extends React.Component {
  render() {
    return (
      <div className="about-page">
        <Row>
          <Title level={2}>The Down Low</Title>
          <Paragraph>
            A series of pop up art events in downtown Morganton, NC.
          </Paragraph>
        </Row>
        <Divider dashed />
        <Row>
          <Title level={2}>The Organizers</Title>
          <Paragraph>
            Nancy VanNoppen, Alexander Collett, Jean C. VanNoppen, Derek Long,
            Ellen VanNoppen, Jean B. VanNoppen, Allen VanNoppen, Rob Childress,
            Kayla Oelhafen
          </Paragraph>
        </Row>
        <Divider dashed />
        <Row>
          <Title level={2}>The Developers</Title>
          <Paragraph>
            Nancy VanNoppen, Jean VanNoppen, Isaac Bythewood
          </Paragraph>
        </Row>
        <Divider dashed />
        <Row>
          <Title level={2}>FAQs</Title>
          <Collapse>
            <Panel header="What is ART/RE/ART?">
              <Paragraph>
                ART/RE/ART is a series of pop-up art shows taking place in and
                around Morganton, NC.
              </Paragraph>
            </Panel>
            <Panel header="Where do the shows take place?">
              <Paragraph>
                ART/RE/ART changes venue with each show. Check out our Events
                tab to learn more.
              </Paragraph>
            </Panel>
            <Panel header="How can I participate in the show?">
              <Paragraph>
                Sign up on our website for email updates and follow us on
                Instagram to stay tuned about calls for submissions. We also can
                always use help from volunteers, email us at
                artreart.morganton@gmail.com if you're interested in
                volunteering.
              </Paragraph>
            </Panel>
            <Panel header="Where can I learn more?">
              <Paragraph>
                Visit our website, www.artreart.com, or email us
                artreart.morganton@gmail.com.
              </Paragraph>
            </Panel>
          </Collapse>
        </Row>
      </div>
    );
  }
}
