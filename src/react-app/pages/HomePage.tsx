import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MediaHero from "../components/MediaHero";
import trevorHeadshot from "../assets/media/trevor-headshot.avif";
import aboutImage from "../assets/media/homepage-us.avif"; 
import homepageAboutImage from "../assets/media/homepage-about.avif";
import weddingImage from "../assets/media/homepage-wedding-tile.avif";
import familyImage from "../assets/media/homepage-family.avif";
import eventsImage from "../assets/media/homepage-events.avif";
import realEstateImage from "../assets/media/homepage-construction.avif";

import CallToAction from "../components/CallToAction";
import WaveGradientBackground from "../components/WaveGradientBackground";




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
    
      
      overlayContent={
        <Container>
          <Row className="align-items-center py-5">
            <Col lg={8} md={6} className="my-5">
              <h1 className="main-heading text-start text-light mb-4">Hi! I'm Trevor.</h1>
             <p className="no-pad hero-paragraph mb-4 text-light">
  I'm a <strong>web designer and developer</strong> based in Rochester, NY, who loves bringing ideas to life on the web. I actually started out in graphic design, but once I got a taste of coding, I was hooked.
</p>
<p className="no-pad hero-paragraph mb-4 text-light">
  I'm <strong>completely self-taught</strong> and still love learning new things every day—whether it's experimenting with a new layout, optimizing a site for performance, or figuring out how to make something just feel right for users. Along the way, I also picked up a passion for <strong>photography and videography</strong>, which gives me another creative outlet and often inspires how I approach visual design.
</p>
<p className="no-pad hero-paragraph mb-4 text-light">
  My work is all about blending creativity with clean, practical design and a strong focus on user experience.
</p>

              
            </Col>

            <Col lg={4} md={6} className="text-center">
              <img
                src={trevorHeadshot}
                alt="Trevor at a wedding"
                className="img-fluid rounded"
              />
            </Col>
          </Row>
        </Container>
      }
      background={<WaveGradientBackground />}
 
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
              <p className="">
  When I'm not in front of a screen, you'll usually find me outside—traveling, hiking, playing volleyball, or rock climbing. Fitness is a big part of my life, and I try to balance it out with more laid-back hobbies like playing guitar or hanging out with my dog, Layla. She's basically my partner in crime and makes sure I don't spend too much time at my desk.
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
      
      
       <CallToAction
        heading="Ready to Capture Your Moments?"
        subheading="Let us help you preserve memories that last a lifetime."
        bgColor="#2b2b2b"
        textColor="#fff"
        buttonText="Get in Touch"
        buttonLink="/contact"
      />

  
    </>
  );
}
