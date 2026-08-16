import React from "react";
import { Col, Form, Row } from "react-bootstrap";

function Filter({
  titleFilter,
  ratingFilter,
  onTitleChange,
  onRatingChange
}) {
  return (
    <div className="filter-panel">
      <Row className="g-3">
        <Col md={8}>
          <Form.Group>
            <Form.Label>Filter by title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search movies or TV shows..."
              value={titleFilter}
              onChange={(event) => onTitleChange(event.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label>Minimum rating</Form.Label>
            <Form.Select
              value={ratingFilter}
              onChange={(event) => onRatingChange(Number(event.target.value))}
            >
              <option value="0">All ratings</option>
              <option value="1">1+ stars</option>
              <option value="2">2+ stars</option>
              <option value="3">3+ stars</option>
              <option value="4">4+ stars</option>
              <option value="5">5 stars</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default Filter;
