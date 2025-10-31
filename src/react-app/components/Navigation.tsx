import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFilePdf } from 'react-icons/fa';
import TsLogo from "../assets/media/trevor-smith-logo-horizontal.svg";
import resumePdf from "../assets/resume/Trevor-Smith-Resume.pdf";
import "./Navigation.css";

// Define a size for the icons for consistency
const ICON_SIZE = 24;

const Navigation: React.FC = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  // Function to close the menu on link click
  const closeMenu = () => setExpanded(false);

  // Determine if the URL path matches AND if the URL hash matches.
  const isLogoActive = () => location.pathname === "/" && !location.hash;

  /**
   * 💡 NEW FUNCTION: Handles the click on internal anchor links.
   * Forces a scroll if the user is already on the target path.
   */
  const handleAnchorClick = (targetHash: string) => {
    // 1. Close the menu first
    closeMenu();

    // 2. Check if we are already on the home page (the anchor's path)
    if (location.pathname === "/") {
      // 3. Manually find the element and scroll to it
      const element = document.querySelector<HTMLElement>(targetHash);
      if (element) {
        // Use a slight delay to ensure the menu is closed/page is ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
    // For navigation to other pages, the React Router Link will handle the route change, 
    // and ScrollToTop will handle the subsequent scroll.
  };

  return (
    <Navbar
      expand="lg"
      bg="white" 
      variant="dark" 
      sticky="top"
      expanded={expanded}
      onToggle={setExpanded} 
      className="custom-nav shadow-lg" 
    >
      <Container>
        {/* Logo (left) */}
        <Navbar.Brand
          as={Link}
          to="/"
          onClick={closeMenu}
          className={`d-flex align-items-center me-lg-4 ${
            isLogoActive() ? "active" : ""
          }`}
        >
          <img
            src={TsLogo}
            alt="Trevor Smith"
            height={40}
            className="d-inline-block align-text-top"
          />
        </Navbar.Brand>

        {/* Hamburger toggle */}
        <Navbar.Toggle aria-controls="navbarNav" />

        {/* Nav content */}
        <Navbar.Collapse id="navbarNav">
          {/* Centered Links */}
          <Nav className="mx-auto text-center nav-inner flex-grow-1 justify-content-center">
            
            {/* 💡 UPDATED: Use the new handler */}
            <Nav.Link
              as={Link}
              to={{ pathname: "/", hash: "#web" }} 
              onClick={() => handleAnchorClick("#web")} // Pass the hash to the new handler
              className={`nav-anchors`} 
            >
              Web
            </Nav.Link>

            {/* 💡 UPDATED: Use the new handler */}
            <Nav.Link
              as={Link}
              to={{ pathname: "/", hash: "#creative" }}
              onClick={() => handleAnchorClick("#creative")} // Pass the hash to the new handler
              className={`nav-anchors`}
            >
              Creative
            </Nav.Link>

          </Nav>

          {/* Right-aligned icons - (No changes) */}
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
              href={resumePdf}
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