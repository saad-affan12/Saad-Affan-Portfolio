import React from "react";
import {
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import { socialLinks } from "../portfolio";

const Navigation: React.FC = () => {
  return (
    <Nav className="align-items-lg-center ml-lg-auto" navbar>
      {/* Section Navigation */}
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
            rel="noopener"
            aria-label="GitHub"
            className="nav-link-icon"
            href={socialLinks.github}
            target="_blank"
          >
            <i className="fa fa-github" />
          </NavLink>
        </NavItem>
      )}

      {socialLinks.linkedin && (
        <NavItem>
          <NavLink
            rel="noopener"
            aria-label="LinkedIn"
            className="nav-link-icon"
            href={socialLinks.linkedin}
            target="_blank"
          >
            <i className="fa fa-linkedin" />
          </NavLink>
        </NavItem>
      )}

      {socialLinks.instagram && (
        <NavItem>
          <NavLink
            rel="noopener"
            aria-label="Instagram"
            className="nav-link-icon"
            href={socialLinks.instagram}
            target="_blank"
          >
            <i className="fa fa-instagram" />
          </NavLink>
        </NavItem>
      )}
    </Nav>
  );
};

export default Navigation;
