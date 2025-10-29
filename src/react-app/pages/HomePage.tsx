import { Container, Row, Col, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import MediaHero from "../components/MediaHero";
import trevorHeadshot from "../assets/media/trevor-headshot.avif";
import homepageAboutImage from "../assets/media/homepage-about.avif";
import ProjectsGrid from "../components/ProjectsGrid";
import CallToAction from "../components/CallToAction";
import WaveGradientBackground from "../components/WaveGradientBackground";


export default function HomePage() {

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
    <h2 className="mb-4">Web Projects</h2>
      <ProjectsGrid category="Web" />
    
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
