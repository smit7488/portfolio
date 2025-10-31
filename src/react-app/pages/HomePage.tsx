import { Container, Row, Col, Card, Carousel } from "react-bootstrap";
// import { Link } from "react-router-dom";
import MediaHero from "../components/MediaHero";
import laylaImage from "../assets/media/layla.jpg";
import picoImage from "../assets/media/pico.jpg";
import plitviceImage from "../assets/media/plitvice.jpg";
import climb2Image from "../assets/media/rock-climbing-2.jpg";
import volleyballImage from "../assets/media/volleyball.jpg";
import mauiImage from "../assets/media/maui.jpg";
import redRocksImage from "../assets/media/red-rocks.jpg";
import romeImage from "../assets/media/rome.jpg";
import ProjectsGrid from "../components/ProjectsGrid";
import CallToAction from "../components/CallToAction";
import { FaCode, FaComments, FaUsers, FaClipboardList, FaArrowUpRightFromSquare } from "react-icons/fa6";
import WaveGradientBackground from "../components/WaveGradientBackground";


export default function HomePage() {
  const skills = [
    {
      title: "Code & Development",
      text: `I build websites and apps that actually work—scalable, maintainable, and designed to solve real problems. I'm comfortable across front-end and back-end technologies, and I use modern frameworks and tools to keep things efficient and future-proof.`,
      icon: FaCode,
    },
    {
      title: "Communication & Client Focus",
      text: `I make technical concepts easy to understand and focus on what clients actually need. Clear, direct communication and building trust are key to keeping projects on track.`,
      icon: FaComments,
    },
    {
      title: "Teamwork & Collaboration",
      text: `I work best in collaborative environments where ideas flow freely. Using agile practices and the right tools, I help teams stay coordinated, solve problems together, and get things done without unnecessary friction.`,
      icon: FaUsers,
    },
    {
      title: "Systems & Organization",
      text: `I like keeping things organized. From managing tasks to setting up clear workflows, I make sure projects stay on track and deadlines are realistic—whether I'm working solo or with a team.`,
      icon: FaClipboardList,
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
                  src="/images/trevor-headshot.avif"
                  alt="Trevor at a wedding"
                  className="img-fluid rounded"
                  loading="eager"
                  fetchPriority="high"
                />
              </Col>
            </Row>
          </Container>
        }
        background={<WaveGradientBackground />}
        bgColor="var(--color-dark-bg)"

      />

      {/* Intro Section */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="align-items-center row-gap-4">
            {/* Left Image */}
            <Col md={4}>
              <div
                style={{
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                  borderRadius: "0.5rem",
                  boxShadow: "0 0.25rem 1rem rgba(0,0,0,0.1)",
                }}
              >
                <Carousel
                  controls={false}
                  indicators={false}
                  interval={3000}
                  pause={false}
                  slide={true}
                  fade={true}
                >
                  {[
                    romeImage,
                    laylaImage,
                    picoImage,
                    plitviceImage,
                    climb2Image,
                    volleyballImage,
                    mauiImage,
                    redRocksImage

                  ].map((imgSrc, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100 h-100"
                        src={imgSrc}
                        alt={`Photo ${index + 1}`}
                        style={{ objectFit: "cover" }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </Col>

            {/* Right Text */}
            <Col md={8}>
              <h2 className="mb-4">Work Hard, Play Hard</h2>
              <p>
                When I'm not building websites or designing, you'll usually find me staying active—hitting the gym, hiking, rock climbing, or playing volleyball. I also run a creative video and photo business with my girlfriend at <a
                  href="https://tsfilmphoto.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                ><strong>tsfilmphoto.com</strong> <FaArrowUpRightFromSquare size={14} style={{ verticalAlign: 'baseline' }} /></a> , often with my dog Layla by our side. For me, life's about staying healthy, exploring new places, and making the most of every day.
              </p>


            </Col>
          </Row>
        </Container>
      </section>

      {/* Skills Section */}
      <section className="py-5 bg-light-100">
        <Container>

          <Row className="g-4">
            {skills.map((skill, index) => (
              <Col key={index} lg={6} md={6}>
                <Card className="h-100 shadow-sm gradient-border rounded-2">
                  <Card.Body>
                    <skill.icon size={32} className="mb-3 " style={{ color: "var(--brand-gradient-middle)" }} />
                    <Card.Title><h4>{skill.title}</h4></Card.Title>
                    <Card.Text>{skill.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <CallToAction
        heading="Interested in Working Together?"
        bgColor="var(--color-dark-bg)"
        textColor="white"
        buttonText="Get in Touch"
        buttonLink="/contact"
        className="border-top border-bottom shadow-sm z-2"
        useWaveGradient={true}
        containerClassName="container-xxl"


      />

      <div id="projects"></div>

      {/* Web Projects Grid */}
      <section className="py-5 bg-light-50 border-bottom shadow-sm z-2" id="web">
        <Container>
          <h2 className="mb-4">Web Projects</h2>
          <ProjectsGrid category="Web" />

        </Container>
      </section>

      {/* Creative Projects Grid */}
      <section className="py-5 bg-light-100" id="creative">
        <Container>
          <h2 className="mb-4">Creative Projects</h2>
          <ProjectsGrid category="Creative" />

        </Container>
      </section>





      <CallToAction
        heading="Want to Learn More About Me?"
        bgColor="var(--color-dark-bg)"
        textColor="white"
        buttonText="Reach Out"
        buttonLink="/contact"
        className="border-top mshadow-sm z-2"
        useWaveGradient={true}

      />



    </>
  );
}
