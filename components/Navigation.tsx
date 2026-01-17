import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { socialLinks } from "../portfolio";

const Navigation = () => {
  return (
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

      {socialLinks.github && (
        <NavItem>
          <NavLink
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="nav-link-icon"
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
            className="nav-link-icon"
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
            className="nav-link-icon"
          >
            <i className="fa fa-instagram" />
          </NavLink>
        </NavItem>
      )}
    </Nav>
  );
};

export default Navigation;
