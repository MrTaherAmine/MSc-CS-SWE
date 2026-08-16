import React from "react";
import { Badge, Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

function MovieDetails({ movies }) {
  // Read the dynamic :id value from the URL.
  const { id } = useParams();

  const movie = movies.find((item) => item.id === Number(id));

  if (!movie) {
    return (
      <div className="details-page">
        <Container className="details-shell text-center">
          <h1>Movie not found</h1>
          <Link to="/">
            <Button variant="light" className="mt-3">
              ← Back to Home
            </Button>
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="details-page">
      <Container className="details-shell">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>

        <div className="details-grid">
          <div>
            <img
              src={movie.posterURL}
              alt={`${movie.title} poster`}
              className="details-poster"
            />
          </div>

          <div className="details-copy">
            <Badge bg="warning" text="dark" className="mb-3">
              ★ {movie.rating}/5
            </Badge>
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>
          </div>
        </div>

        <section className="trailer-section">
          <h2>Trailer</h2>
          <div className="video-wrapper">
            <iframe
              src={movie.trailerURL}
              title={`${movie.title} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        <Link to="/">
          <Button variant="outline-light" className="mt-4">
            ← Return to Movie List
          </Button>
        </Link>
      </Container>
    </div>
  );
}

export default MovieDetails;
