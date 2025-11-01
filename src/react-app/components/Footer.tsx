import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import tsLogo from "../assets/media/trevor-smith-logo-vertical-ko-color.svg";
import {

  FaGithub,
  FaLinkedin,
  FaFilePdf,
  FaEnvelope,
  FaReact
} from "react-icons/fa";
import "./Footer.css";
import resumePdf from "../assets/resume/Trevor-Smith-Resume.pdf";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer py-4 mt-auto bg-darkest text-light">
      <Container>
        {/* Bottom Row: Logo, Location, Copyright, Socials */}
        <Row className="align-items-center my-3 text-center gap-2">
          <Image
            src={tsLogo}
            alt="Trevor Smith - Web Developer"
            style={{ maxHeight: 80 }}
            className="mb-2 mx-auto"
          />

          <Col className="d-flex flex-wrap flex-row justify-content-center col-12 my-3 gap-2">
          
            <div className="footer-link">
              <span>© {currentYear} Trevor Smith.</span>
            </div>
              <div className="footer-link d-flex align-items-center">
                <span>Built with React </span>
              <FaReact className="ms-1" size={16} />
              
            </div>
          </Col>

          <Col className="d-flex justify-content-center col-12">
            <div className="social-icons d-flex gap-3">
              {/* GitHub */}
              <a
                href="https://github.com/smit7488"
                title="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaGithub size={22} />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/trevorgsmith95/"
                title="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaLinkedin size={22} />
              </a>

              {/* Resume */}
              <a
                href={resumePdf}
                title="Download Resume"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaFilePdf size={22} />
              </a>

              {/* Contact (React Router link) */}
              <Link
                to="/contact"
                title="Contact Me!"
                className="social-icon"
              >
                <FaEnvelope size={22} />
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
