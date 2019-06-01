import React from "react";
import { Collapse, Typography, Row, Divider } from "antd";

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

export default class About extends React.Component {
  render() {
    return (
      <div className="container">
        <Row>
          <Title level={2}>The Down Low</Title>
          <Paragraph>
            ART/RE/ART is a series of pop up art events in downtown Morganton, NC. These free events, held in non-art
            spaces, offer alternative ways to interact with and experience art in the community. Typically, there is an emphasis on performative, interactive, and installation art works.
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
                We love to answer questions and dig into conversations about art and our events. Email us <a href="mailto:hello@artreart.com">hello@artreart.com</a> to chat.
              </Paragraph>
            </Panel>
          </Collapse>
        </Row>
      </div>
    );
  }
}
