import { Container, Row, Col } from "react-bootstrap";
import MediaHero from "../components/MediaHero";
import heroVideo from "../assets/media/hero-bg-v1.mp4";
import heroImage from "../assets/media/hero-bg-v1.avif";
import tsLogo from "../assets/media/trevor-and-sarah-logo-vertical-white.svg";
import ContactForm from "../components/ContactForm";




export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
     <MediaHero
        videoSrc={heroVideo}
        imageSrc={heroImage}
        textColor="#fff"
        overlayContent={
          <>
            <img
              src={tsLogo}
              className="logo trevorandsarah"
              alt="Trevor & Sarah logo"
            />
            <p
              className="text-uppercase mt-5"
              style={{ letterSpacing: "0.15em" }}
            >
              Let's capture your special moments together.
            </p>
          </>
        }
      />

      {/* Contact Form Section */}
      <ContactForm />

      {/* Optional Additional Info Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="mb-4">Get In Touch</h2>
              <p>
                We'd love to hear about your upcoming event! Fill out the form above, and we'll
                get back to you as soon as possible.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

    </>
  );
}
