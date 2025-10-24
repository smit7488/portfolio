import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface CallToActionProps {
  heading: string;
  subheading?: string;
  bgColor?: string; // optional background color
  bgImage?: string; // optional 
  textColor?: string; // optional text color
  buttonText?: string;
  buttonLink?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({
  heading,
  subheading,
  bgColor = "#1a1a1a",
  bgImage = "url(/assets/media/TS-Logo-Pattern-01.avif)",
  textColor = "#ffffff",
  buttonText = "Contact Us",
  buttonLink = "/contact",
}) => {
  return (
    <section
      className="py-5 text-center"
      style={{ backgroundColor: bgColor, color: textColor, backgroundImage: bgImage, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <Container>
        <h2 className="mb-3" style={{ color: textColor }}>{heading}</h2>
        {subheading && <p className="mb-4">{subheading}</p>}
        
        <Button 
          as={Link as any}
          to={buttonLink}
          variant="light"
        >
          {buttonText}
        </Button>
      </Container>
    </section>
  );
};

export default CallToAction;
