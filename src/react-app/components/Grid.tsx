import React from "react";
import { Container, Row, Col } from "react-bootstrap";

interface GridProps {
  items: React.ReactNode[];            // Array of JSX elements (images, videos, cards, etc.)
  columns?: { xs?: number; md?: number; lg?: number }; // Responsive column widths
  className?: string;                  // Optional extra class for styling
  gutterClass?: string;                // Optional custom gutter class for Row
}

const Grid: React.FC<GridProps> = ({
  items,
  columns = { xs: 12, md: 6, lg: 4 },
  className = "",
  gutterClass = "g-4",
}) => {
  return (
    <Container className={className}>
      <Row className={gutterClass}>
        {items.map((item, index) => (
          <Col key={index} xs={columns.xs} md={columns.md} lg={columns.lg}>
            {item}
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Grid;
