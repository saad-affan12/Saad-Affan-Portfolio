import React, { useState, useEffect } from "react";
import { greetings, socialLinks } from "../portfolio";
import Headroom from "headroom.js";
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

const Navigation = () => {
  const [collapseClasses, setCollapseClasses] = useState("");

  const onExiting = () => setCollapseClasses("collapsing-out");
  const onExited = () => setCollapseClasses("");

  useEffect(() => {
    const el = document.getElementById("navbar-main");
    if (el) {
      const headroom = new Headroom(el);
      headroom.init();
    }
  }, []);

  return (
    <header className="header-global">
      <Navbar
        className="navbar-main navbar-transparent navbar-light headroom"
        expand="lg"
        id="navbar-main"
      >
        <Container>
          {/* Brand */}
          <NavbarBrand href="#home">
            <h4 className="text-white mb-0">{greetings.name}</h4>
          </NavbarBrand>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            aria-label="Toggle navigation"
            id="navbar_global"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Collapse */}
          <UncontrolledCollapse
            toggler="#navbar_global"
            navbar
            className={collapseClasses}
            onExiting={onExiting}
            onExited={onExited}
          >
            {/* Mobile Header */}
            <div className="navbar-collapse-header">
              <Row>
                <Col xs="6">
                  <h4 className="text-black mb-0">{greetings.name}</h4>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar_global">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>

            {/* Main Navigation */}
            <Nav className="align-items-lg-center ml-lg-auto" navbar>
              <NavItem>
                <NavLink href="#home">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#skills">Skills</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#education">Education</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#experience">Experience</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#projects">Projects</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#contact">Contact</NavLink>
              </NavItem>

              {/* Social Icons */}
              {socialLinks.github && (
                <NavItem>
                  <NavLink
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="nav-link-icon"
                    href={socialLinks.github}
                    target="_blank"
                  >
                    <i className="fa fa-github" />
                    <span className="d-lg-none ml-2">GitHub</span>
                  </NavLink>
                </NavItem>
              )}

              {socialLinks.linkedin && (
                <NavItem>
                  <NavLink
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="nav-link-icon"
                    href={socialLinks.linkedin}
                    target="_blank"
                  >
                    <i className="fa fa-linkedin" />
                    <span className="d-lg-none ml-2">LinkedIn</span>
                  </NavLink>
                </NavItem>
              )}

              {socialLinks.instagram && (
                <NavItem>
                  <NavLink
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="nav-link-icon"
                    href={socialLinks.instagram}
                    target="_blank"
                  >
                    <i className="fa fa-instagram" />
                    <span className="d-lg-none ml-2">Instagram</span>
                  </NavLink>
                </NavItem>
              )}
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Navigation;
