import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MediaHero from "../components/MediaHero";
import heroVideo from "../assets/media/hero-bg-v1.mp4";
import heroImage from "../assets/media/hero-bg-v1.avif";
import tsLogo from "../assets/media/trevor-and-sarah-logo-vertical-white.svg";
import aboutImage from "../assets/media/homepage-us.avif"; 
import homepageAboutImage from "../assets/media/homepage-about.avif";
import weddingImage from "../assets/media/homepage-wedding-tile.avif";
import familyImage from "../assets/media/homepage-family.avif";
import eventsImage from "../assets/media/homepage-events.avif";
import realEstateImage from "../assets/media/homepage-construction.avif";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import RandomContentfulInstagramFeed from "../components/RandomContentfulInstagramFeed";

export default function HomePage() {

const services = [
  { 
    title: "Weddings & Engagements", 
    description: "Capture your special day with cinematic video. Celebrate your love with stunning engagement sessions.",
    image: weddingImage
  },
  { 
    title: "Family & Portraits", 
    description: "Family portraits that capture genuine moments and connections. Professional portraits for individuals or couples, tailored to your style.",
    image: familyImage
  },
  { 
    title: "Events", 
    description: "From corporate gatherings to parties, we capture every moment with cinematic video and beautiful photos.",
    image: eventsImage
  },
  { 
    title: "Real Estate & Construction", 
    description: "Showcase properties with professional photography and video that highlights every detail.",
    image: realEstateImage
  },
];




  return (
    <>
      {/* Hero */}
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
              loading="eager"

            />
            <p
              className="text-uppercase mt-5"
              style={{ letterSpacing: "0.15em" }}
            >
             ↓&nbsp;Your&nbsp;Story, Beautifully&nbsp;Told&nbsp;↓
            </p>
          </>
        }
      />

      {/* Intro Section - White background */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="align-items-center row-gap-4">
            {/* Left Image */}
            <Col md={4}>
              <img
                src={homepageAboutImage}
                alt="Film and Photo Example"
                className="img-fluid rounded shadow"
              />
            </Col>
            {/* Right Text */}
            <Col md={8}>
              <h2 className="mb-4">Capturing Life, One Frame at a Time</h2>
              <p>
                We believe that the best photos and videos don't just show what
                happened—they make you feel it. From weddings and family
                portraits to events, food photography, and travel, our goal is
                to create timeless work that reflects genuine moments and
                emotions.
              </p>
              <p>
                Whether you're looking for cinematic storytelling or a simple,
                elegant portrait, we approach every project with creativity and
                care—so you can relive your memories for years to come.
              </p>
              <div className="mt-4">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <Button as={Link as any} to="/video" variant="outline-dark" className="me-3">
                  Explore Video
                </Button>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <Button as={Link as any} to="/photo" variant="outline-dark">
                  Explore Photo
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

{/* Services Section - Full Width Cards */}
<section className="py-5 bg-light-100">
  <Container>
    <h2 className="text-center mb-5">Our Services</h2>
    <Row className="g-4">
      {services.map((service, idx) => (
        <Col key={idx} xs={12} sm={6} md={3}>
          <Card className="h-100 shadow-sm text-center border-0">
            <Card.Img
              variant="top"
              src={service.image}
              className="rounded-top"
              style={{ height: 180, objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title><strong>{service.title}</strong></Card.Title>
              <Card.Text>{service.description}</Card.Text>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Button variant="outline-dark" as={Link as any} to={`/services#${service.title.toLowerCase()}`}>
                Learn More
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    <p className="text-center mt-5">
  Each project is unique —{" "}
  <Link 
    to="/contact" 
    style={{ fontWeight: 700, color: "var(--color-text)" }}
  >
    contact us
  </Link>{" "}
  for a personalized quote.
</p>

  </Container>
</section>


      {/* About Section - Light Gray background */}
      <section className="py-5 bg-light row-gap-4">
        <Container>
          <Row className="align-items-center row-gap-4">
            {/* Left Text */}
            <Col md={8}>
              <h2 className="mb-4">About Us</h2>
              <p>
             We're a creative couple with a shared love for storytelling, travel, and capturing the world through our lenses. What started as a few spontaneous adventures together has grown into a passion for creating cinematic films and natural, documentary-style photography. We love turning real moments into visual stories that feel honest, intentional, and full of life.</p>

<p>By day, Sarah works as a Project Manager and Trevor as a Web Designer and Developer — but outside of work, we're almost always chasing light, new places, and meaningful experiences.
              </p>
              <div className="mt-4">
               {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <Button as={Link as any} to="/about" variant="outline-dark">
                  Learn More
                </Button>
              </div>
            </Col>
            {/* Right Image */}
            <Col md={4}>
              <img
                src={aboutImage}
                alt="About Trevor & Sarah"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <Testimonials variant="carousel" className="bg-light-100" />
      
      
       <CallToAction
        heading="Ready to Capture Your Moments?"
        subheading="Let us help you preserve memories that last a lifetime."
        bgColor="#2b2b2b"
        textColor="#fff"
        buttonText="Get in Touch"
        buttonLink="/contact"
      />

      <RandomContentfulInstagramFeed instagramUrl="https://www.instagram.com/ts_filmphoto" /> 
    </>
  );
}
