import React from "react";
import { Badge, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function MovieCard({ id, title, description, posterURL, rating }) {
  return (
    <Link to={`/movie/${id}`} className="movie-link">
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

        <Card.Body>
          <Card.Title className="movie-title">{title}</Card.Title>
          <Card.Text className="movie-description">
            {description.length > 120
              ? `${description.slice(0, 120)}...`
              : description}
          </Card.Text>
          <span className="details-link">View description & trailer →</span>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default MovieCard;
