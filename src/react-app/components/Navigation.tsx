import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useLocation } from "react-router-dom";
import TsLogo from "../assets/media/trevor-and-sarah-logo-horizontal.svg";
import "./Navigation.css";

const Navigation: React.FC = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const isPortfolioActive =
    location.pathname.startsWith("/photo") || location.pathname.startsWith("/video");

  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      className="shadow-sm"
      sticky="top"
      expanded={expanded} // controlled
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center" onClick={() => setExpanded(false)}>
          <img
            src={TsLogo}
            alt="Trevor & Sarah"
            height={40}
            className="d-inline-block align-text-top me-2"
          />
        </Navbar.Brand>

        {/* Hamburger toggle */}
        <Navbar.Toggle aria-controls="navbarNav" onClick={() => setExpanded(!expanded)} />

        {/* Nav links */}
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto text-center">
            <Nav.Link as={NavLink} to="/" end onClick={() => setExpanded(false)}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" onClick={() => setExpanded(false)}>
              About
            </Nav.Link>

            <NavDropdown
              title="Portfolio"
              id="portfolioDropdown"
              className={isPortfolioActive ? "active" : ""}
            >
              <NavDropdown.Item as={NavLink} to="/photo" onClick={() => setExpanded(false)}>
                Photo
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/video" onClick={() => setExpanded(false)}>
                Video
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to="/contact" onClick={() => setExpanded(false)}>
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
