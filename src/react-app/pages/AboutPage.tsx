import MediaHero from "../components/MediaHero";
import heroImage from "../assets/media/ts-logo-bg.jpg";
import wireblock from "../assets/media/wireblocks/ts-wireblock.svg";
import trevorImage from "../assets/media/trevor.jpg";
import sarahImage from "../assets/media/Sarah.avif";
import approachImage from "../assets/media/about-approach.avif";
import valuesImage from "../assets/media/about-values.avif";
import whyImage from "../assets/media/about-why.avif";
import Testimonials from "../components/Testimonials";

import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function AboutPage() {
  const teamMembers = [
    {
      name: "Trevor",
      role: "Lead Photographer & Videographer",
      img: trevorImage,
      bio: "Trevor is a Web Designer and Developer by profession, but his creative journey began with filming skateboarding videos growing up. That passion for storytelling evolved into a love for cinematic videography and photography. Outside of work, he and Sarah have traveled to five different countries together, creating travel films that showcase their shared eye for capturing meaningful experiences."
    },
    {
      name: "Sarah",
      role: "Co-Photographer & Creative Director",
      img: sarahImage,
      bio: "Sarah works full-time as a Project Manager, balancing her professional career with her passion for photography and creative direction. She has a gift for capturing authentic, natural moments and turning them into striking visual stories. Since meeting Trevor in 2023, she has joined him in documenting their adventures around the world and co-creating cinematic travel videos."
    }
  ];

  return (
    <>
      <MediaHero
        imageSrc={heroImage}
        overlayContent={<h1 className="text-uppercase">About Us</h1>}
        height="half"
        photoOnly
        wireblock={wireblock}
        textColor="#fff"

      />

      {/* Our Story */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Our Story</h2>
        <p className="lead text-center">
         Hi! We're Trevor and Sarah, a creative couple based in Rochester, NY. We're passionate about capturing life's most meaningful moments through film and photography—from family portraits to cinematic wedding films. Our goal is to create timeless memories you'll treasure forever.
        </p>
      </section>

      {/* Meet the Team */}
      <section className="container my-5">
        <h2 className="text-center mb-5">Meet the Team</h2>
        <Row className="justify-content-center g-4">
          {teamMembers.map((member, idx) => (
            <Col key={idx} xs={12} md={6} lg={4}>
<div className="team-card position-relative overflow-hidden rounded shadow-sm">
  <img
    src={member.img}
    alt={member.name}
    className="img-fluid w-100 rounded-top"
  />
  <div className="p-3 text-center">
    <h3>{member.name}</h3>
    <p className="text-muted">{member.role}</p>
  </div>

  {/* Overlay */}
  <div className="team-overlay position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center text-white text-center px-3">
    <p>{member.bio}</p>
  </div>
</div>

            </Col>
          ))}
        </Row>
      </section>

      {/* Our Approach */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center row-gap-4">
            <Col md={4}>
              <img src={approachImage} alt="Our Approach" className="img-fluid rounded shadow" />
            </Col>
            <Col md={8}>
              <h2 className="mb-4">Our Approach</h2>
              <p>
                We take a personalized approach to every project, ensuring each session is tailored to your style, story, and vision.
              </p>
              <p>
                Whether it’s a wedding, family portrait, or real estate shoot, we combine creativity, technical expertise, and attention to detail to create stunning visuals.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="align-items-center row-gap-4">
            <Col md={8}>
              <h2 className="mb-4">Why Choose Us</h2>
              <p>
                We approach every project with creativity, care, and attention to detail. 
                Whether it's a wedding, family session, or property listing, we aim to create timeless visuals.
              </p>
              <p>
                Our combination of photography and cinematic video ensures you capture the full story behind every moment.
              </p>
              <div className="mt-4">
                <Button as={Link as any} to="/contact" variant="outline-dark">
                  Get in Touch
                </Button>
              </div>
            </Col>
            <Col md={4}>
              <img src={whyImage} alt="Why Choose Us" className="img-fluid rounded shadow" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Values */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center row-gap-4">
            <Col md={4}>
              <img src={valuesImage} alt="Our Values" className="img-fluid rounded shadow" />
            </Col>
            <Col md={8}>
              <h2 className="mb-4">Our Values</h2>
              <p>
                Authenticity, creativity, and storytelling guide everything we do. We strive to capture real emotions and moments in a way that feels natural and timeless.
              </p>
              <p>
                Building relationships with our clients is just as important as capturing beautiful images. We take the time to understand your vision and ensure a stress-free, enjoyable experience.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <Testimonials variant="carousel" className="bg-light-100" />



      
    </>
  );
}
