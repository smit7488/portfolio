import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFilePdf } from 'react-icons/fa';
import TsLogo from "../assets/media/trevor-smith-logo-horizontal.svg";
import "./Navigation.css";

// Define a size for the icons for consistency
const ICON_SIZE = 24;

const Navigation: React.FC = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  // Function to close the menu on link click
  const closeMenu = () => setExpanded(false);

  // Determine if a link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <Navbar
      expand="lg"
      bg="white" 
      variant="dark" 
      sticky="top"
      expanded={expanded}
      onToggle={setExpanded} 
      className="custom-nav shadow-sm" 
    >
      <Container>
        {/* Logo (left) */}
        <Navbar.Brand
          as={Link}
          to="/"
          onClick={closeMenu}
          className="d-flex align-items-center me-lg-4"
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
        />

        {/* Nav content */}
        <Navbar.Collapse id="navbarNav">
          {/* Centered Links */}
          <Nav className="mx-auto text-center nav-inner flex-grow-1 justify-content-center">
            <Nav.Link
              as={Link}
              to="/"
              onClick={closeMenu}
              className={`nav-anchors ${
                isActive("/") ? "active" : ""
              }`}
            >
              Web
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/creative"
              onClick={closeMenu}
              className={`nav-anchors ${
                isActive("/creative") ? "active" : ""
              }`}
            >
              Creative
            </Nav.Link>
          </Nav>

          {/* Right-aligned icons */}
          <Nav className="nav-bottom d-flex gap-3 align-items-center mt-3 mt-lg-0">
            {/* GitHub Icon */}
            <Nav.Link
              href="https://github.com/smit7488"
              title="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="icon-link p-0"
            >
              <FaGithub size={ICON_SIZE} />
            </Nav.Link>
            
            {/* LinkedIn Icon */}
            <Nav.Link
              href="https://www.linkedin.com/in/trevorgsmith95/"
              title="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="icon-link p-0"
            >
              <FaLinkedin size={ICON_SIZE} />
            </Nav.Link>

            {/* Resume Icon */}
            <Nav.Link
              href="https://smithtrevor.com/Trevor-Smith-Resume.pdf"
              title="Download Resume"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="icon-link p-0"
            >
              <FaFilePdf size={ICON_SIZE} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;