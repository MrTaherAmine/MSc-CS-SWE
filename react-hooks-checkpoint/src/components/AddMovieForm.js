import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const emptyMovie = {
  title: "",
  description: "",
  posterURL: "",
  rating: 3
};

function AddMovieForm({ onAddMovie }) {
  const [formData, setFormData] = useState(emptyMovie);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: name === "rating" ? Number(value) : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      return;
    }

    onAddMovie({
      ...formData,
      posterURL:
        formData.posterURL.trim() ||
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80"
    });

    setFormData(emptyMovie);
  };

  return (
    <Form className="add-movie-form" onSubmit={handleSubmit}>
      <h2 className="mb-4">Add a New Movie</h2>

      <Row className="g-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Movie title"
              required
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Poster URL</Form.Label>
            <Form.Control
              name="posterURL"
              value={formData.posterURL}
              onChange={handleChange}
              placeholder="https://..."
            />
          </Form.Group>
        </Col>

        <Col xs={12}>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Short description"
              required
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label>Rating</Form.Label>
            <Form.Select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            >
              <option value="1">1 star</option>
              <option value="2">2 stars</option>
              <option value="3">3 stars</option>
              <option value="4">4 stars</option>
              <option value="5">5 stars</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={8} className="d-flex align-items-end">
          <Button type="submit" variant="primary" className="w-100">
            Add Movie
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default AddMovieForm;
