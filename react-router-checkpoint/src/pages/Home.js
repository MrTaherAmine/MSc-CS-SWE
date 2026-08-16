import React, { useMemo, useState } from "react";
import { Badge, Container } from "react-bootstrap";
import AddMovieForm from "../components/AddMovieForm";
import Filter from "../components/Filter";
import MovieList from "../components/MovieList";

function Home({ movies, onAddMovie }) {
  const [titleFilter, setTitleFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesTitle = movie.title
        .toLowerCase()
        .includes(titleFilter.toLowerCase());
      const matchesRating = movie.rating >= ratingFilter;
      return matchesTitle && matchesRating;
    });
  }, [movies, titleFilter, ratingFilter]);

  return (
    <div className="App">
      <Container fluid="xl">
        <header className="hero text-center">
          <Badge bg="danger" className="mb-3 px-3 py-2">
            React Router Checkpoint
          </Badge>
          <h1>MovieVerse</h1>
          <p>
            Click any movie card to open its dedicated description and trailer
            page, then navigate back home using React Router.
          </p>
        </header>

        <AddMovieForm onAddMovie={onAddMovie} />

        <Filter
          titleFilter={titleFilter}
          ratingFilter={ratingFilter}
          onTitleChange={setTitleFilter}
          onRatingChange={setRatingFilter}
        />

        <section className="movie-section">
          <div className="section-heading">
            <h2>Movies & TV Shows</h2>
            <span>{filteredMovies.length} result(s)</span>
          </div>
          <MovieList movies={filteredMovies} />
        </section>

        <footer className="text-center">
          <p>React Router Checkpoint — Taher Amine ELHOUARI</p>
        </footer>
      </Container>
    </div>
  );
}

export default Home;
