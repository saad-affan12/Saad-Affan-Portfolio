import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";

import { socialLinks } from "../portfolio";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="lg" fixed="top">
      <Container>
        <NavbarBrand href="#home">Saad</NavbarBrand>

        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto align-items-lg-center" navbar>
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
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <i className="fa fa-github" />
                </NavLink>
              </NavItem>
            )}

            {socialLinks.linkedin && (
              <NavItem>
                <NavLink
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <i className="fa fa-linkedin" />
                </NavLink>
              </NavItem>
            )}

            {socialLinks.instagram && (
              <NavItem>
                <NavLink
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <i className="fa fa-instagram" />
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
