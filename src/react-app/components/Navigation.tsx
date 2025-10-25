import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import TsLogo from "../assets/media/trevor-smith-logo-horizontal.svg";
import GithubIcon from "../assets/media/github-mark.svg";
import LinkedinIcon from "../assets/media/linkedin-2.svg";
import ResumeIcon from "../assets/media/resume.svg";
import "./Navigation.css";

const Navigation: React.FC = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      sticky="top"
      expanded={expanded}
      className="custom-nav shadow-sm"
    >
      <Container className="d-flex justify-content-between align-items-center">
        {/* Logo (left) */}
        <Navbar.Brand
          as={Link}
          to="/"
          onClick={() => setExpanded(false)}
          className="d-flex align-items-center"
        >
          <img
            src={TsLogo}
            alt="Trevor Smith"
            height={40}
            className="d-inline-block align-text-top"
          />
        </Navbar.Brand>

        {/* Hamburger toggle */}
        <Navbar.Toggle
          aria-controls="navbarNav"
          onClick={() => setExpanded(!expanded)}
        />

        {/* Nav content */}
        <Navbar.Collapse id="navbarNav" className="justify-content-between">
          {/* Centered Links */}
          <Nav className="mx-auto text-center nav-inner">
            <Nav.Link
              as={Link}
              to="/"
              onClick={() => setExpanded(false)}
              className={`nav-anchors ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Web
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/creative"
              onClick={() => setExpanded(false)}
              className={`nav-anchors ${
                location.pathname === "/creative" ? "active" : ""
              }`}
            >
              Creative
            </Nav.Link>
          </Nav>

          {/* Right-aligned icons */}
          <div className="nav-bottom d-flex gap-3 align-items-center">
            <a
              href="https://github.com/smit7488"
              title="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
            >
              <img src={GithubIcon} alt="GitHub" className="header-icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/trevorgsmith95/"
              title="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
            >
              <img src={LinkedinIcon} alt="LinkedIn" className="header-icon" />
            </a>
            <a
              href="https://smithtrevor.com/Trevor-Smith-Resume.pdf"
              title="Download Resume"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
            >
              <img src={ResumeIcon} alt="Resume" className="header-icon" />
            </a>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
