import { Row, Col } from "react-bootstrap";
import MediaHero from "../components/MediaHero";
import ContactForm from "../components/ContactForm";
import WaveGradientBackground from "../components/WaveGradientBackground";




export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <MediaHero


        overlayContent={
          <>





            <Row className="gy-5 gx-4">

              <Col sm={12}>

                {/* Contact Form Section */}
                <ContactForm isSticky={false} />
              </Col>
            </Row>





          </>

        }
        background={<WaveGradientBackground />}

      />





    </>
  );
}
