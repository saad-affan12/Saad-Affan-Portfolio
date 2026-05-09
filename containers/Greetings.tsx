import React, { useEffect } from "react";
import { greetings } from "../portfolio";
import { Button, Container, Row, Col } from "reactstrap";
import GreetingLottie from "../components/DisplayLottie";
import SocialLinks from "../components/SocialLinks";

const Greetings: React.FC = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, []);

  return (
    <main>
      <div className="position-relative">
        <section className="section section-lg section-shaped pb-250">
          {/* Background shapes */}
          <div className="shape shape-style-1 bg-gradient-info">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>

          <Container className="py-lg-md d-flex">
            <div className="col px-0">
              <Row className="align-items-center">
                {/* LEFT CONTENT */}
                <Col lg="6">
                  <h1 className="display-3 text-white">
                    {greetings.title}
                  </h1>

                  <p className="lead text-white mt-3">
                    {greetings.description}
                  </p>

                  <SocialLinks />

                  <div className="btn-wrapper my-4">
                    <Button
                      className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                      color="default"
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="btn-inner--icon mr-1">
                        <i className="fa fa-file" />
                      </span>
                      <span className="btn-inner--text">
                        Download Resume
                      </span>
                    </Button>
                  </div>
                </Col>

                {/* RIGHT ANIMATION */}
                <Col lg="6" className="text-center">
                  <GreetingLottie animationPath="/lottie/coding.json" />
                </Col>
              </Row>
            </div>
          </Container>

          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              viewBox="0 0 2560 100"
            >
              <polygon
                className="fill-white"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Greetings;
