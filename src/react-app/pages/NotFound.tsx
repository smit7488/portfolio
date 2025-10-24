import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import notFoundImage from "../assets/media/wireblocks/404-wireblock.svg";

export default function NotFound() {
  return (
    <Container className="flex-grow-1 d-flex flex-column justify-content-center align-items-center py-5">
     <img
                src={notFoundImage}
                alt="Not Found"
                className="img-fluid"
                style={{ maxWidth: '150px', marginBottom: '20px' }}
              />
      <h1 className="text-center mb-3">404</h1>
      <p className="lead mb-4 text-center">Oops! The page you’re looking for doesn’t exist.</p>
        <Button as={Link as any} to="/" variant="outline-dark" className="me-3">
                 Go Back Home
                </Button>
    </Container>
  );
}