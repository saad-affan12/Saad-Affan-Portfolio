import React from "react";
import { Card, Col, Row, Container } from "reactstrap";
import SocialLinks from "./SocialLinks";

type GithubProfileCardProps = {
  avatar_url: string;
  bio: string;
  location: string;
};

const GithubProfileCard = ({
  avatar_url,
  bio,
  location,
}: GithubProfileCardProps) => {
  return (
    <Card className="section-lg bg-gradient-info shadow-lg border-0">
      <Container>
        <div className="p-2">
          <Row>
            <Col className="order-lg-2 text-center" lg="4">
              <img
                src={avatar_url}
                alt="Profile"
                style={{ width: "200px" }}
                className="rounded-circle img-fluid shadow shadow-lg--hover mb-4"
              />
            </Col>

            <Col lg="8" className="order-lg-1">
              <h2 className="text-white">Reach Out to me!</h2>

              <p className="lead text-white mt-3">
                DISCUSS A PROJECT OR JUST WANT TO SAY HI? MY INBOX IS OPEN FOR ALL
              </p>

              {bio && <p className="text-white mt-3">{bio}</p>}

              {location && (
                <div className="my-3 icon-shape bg-gradient-white shadow rounded text-info">
                  <i className="ni ni-pin-3 text-info mr-2" />
                  {location}
                </div>
              )}

              <SocialLinks />
            </Col>
          </Row>
        </div>
      </Container>
    </Card>
  );
};

export default GithubProfileCard;
