import React from "react";
import { Col, Row } from "react-bootstrap";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  if (movies.length === 0) {
    return (
      <div className="empty-state text-center">
        <h3>No movies found</h3>
        <p>Try changing the title or rating filter.</p>
      </div>
    );
  }

  return (
    <Row className="g-4">
      {movies.map((movie) => (
        <Col key={movie.id} xs={12} sm={6} lg={4} xl={3}>
          <MovieCard {...movie} />
        </Col>
      ))}
    </Row>
  );
}

export default MovieList;
