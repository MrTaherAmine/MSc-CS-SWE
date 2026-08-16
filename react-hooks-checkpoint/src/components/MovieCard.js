import React from "react";
import { Badge, Card } from "react-bootstrap";

function MovieCard({ title, description, posterURL, rating }) {
  return (
    <Card className="movie-card h-100 shadow-lg">
      <div className="poster-wrapper">
        <Card.Img
          variant="top"
          src={posterURL}
          alt={`${title} poster`}
          className="movie-poster"
        />
        <Badge bg="warning" text="dark" className="rating-badge">
          ★ {rating}/5
        </Badge>
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="movie-title">{title}</Card.Title>
        <Card.Text className="movie-description">{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
