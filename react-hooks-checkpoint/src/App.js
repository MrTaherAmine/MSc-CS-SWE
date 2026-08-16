import React, { useMemo, useState } from "react";
import { Badge, Container } from "react-bootstrap";
import AddMovieForm from "./components/AddMovieForm";
import Filter from "./components/Filter";
import MovieList from "./components/MovieList";
import initialMovies from "./movies";
import "./App.css";

function App() {
  // Main movie list managed with the useState hook.
  const [movies, setMovies] = useState(initialMovies);

  // Filter states.
  const [titleFilter, setTitleFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);

  // Adds a new movie to the existing list.
  const addMovie = (movie) => {
    setMovies((previousMovies) => [
      ...previousMovies,
      {
        ...movie,
        id: Date.now()
      }
    ]);
  };

  // Creates a filtered list based on title and minimum rating.
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
            React Hooks Checkpoint
          </Badge>

          <h1>MovieVerse</h1>

          <p>
            Browse, filter and add favorite movies and TV shows using React
            Hooks, reusable components and React Bootstrap.
          </p>
        </header>

        {/* Form used to add a new movie */}
        <AddMovieForm onAddMovie={addMovie} />

        {/* Filter by title and rating */}
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

          {/* Displays all filtered movie cards */}
          <MovieList movies={filteredMovies} />
        </section>

        <footer className="text-center">
          <p>React Hooks Checkpoint — Taher Amine ELHOUARI</p>
        </footer>
      </Container>
    </div>
  );
}

export default App;
