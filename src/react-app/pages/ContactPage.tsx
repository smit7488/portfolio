import { Container, Row, Col } from "react-bootstrap";
import MediaHero from "../components/MediaHero";
import ContactForm from "../components/ContactForm";
import WaveGradientBackground from "../components/WaveGradientBackground";




export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <MediaHero

        textColor="#fff"
        overlayContent={
          <>
            <Container className="my-5">
              <p className="text-light mb-0 mt-5">
                <h2 className="text-light text-decoration-none">
                  Contact Me!
                </h2>
              </p>
            </Container>

            <Container className="pb-5">
              <div className="shadow rounded p-4 grid-mt-n5 z-5 position-relative bg-white">

                <Row className="gy-5 gx-4">
                  <Col lg={8} sm={12}>



                  </Col>
                  <Col lg={4} sm={12}>

                    {/* Contact Form Section */}
                    <ContactForm />
                  </Col>
                </Row>
              </div>
            </Container>



          </>

        }
        background={<WaveGradientBackground />}

      />





    </>
  );
}
