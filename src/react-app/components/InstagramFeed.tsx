import React from "react";
import { Container, Button, Image } from "react-bootstrap";
import { FaInstagram } from "react-icons/fa";
import "./InstagramFeed.css";

interface InstagramFeedProps {
  images?: string[]; // Expect the dynamic URLs here
  instagramUrl?: string;
}

const InstagramFeed: React.FC<InstagramFeedProps> = ({
  // Change the default from placeholders to an empty array
  images = [], 
  instagramUrl = "#",
}) => {
  
  const visibleImages = images.slice(0, 6);

  return (
    <section className="py-0 bg-light text-center position-relative">
      <Container fluid className="p-0 position-relative d-flex justify-content-center">
        <div
          className="instagram-row d-flex flex-nowrap"
          style={{ overflow: "hidden", width: "100%" }}
        >
          {visibleImages.map((src, idx) => (
            <div
              key={idx}
              className={`instagram-img-col flex-shrink-0`}
              style={{
                height: "300px",
                overflow: "hidden",

              }}
            >
              <Image
                src={src}
                alt={`Instagram ${idx + 1}`}
                className="img-fluid"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
          ))}
        </div>

        {/* Follow button overlay */}
        <div
          className="position-absolute top-50 start-50 translate-middle"
          style={{ zIndex: 2, whiteSpace: "nowrap" }}
        >
          <Button
            variant="dark"
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="d-flex align-items-center justify-content-center "
          >
            <FaInstagram size={20} className="me-2" />
            Follow us on Instagram
          </Button>
        </div>
      </Container>

    </section>
  );
};

export default InstagramFeed;
