import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import initialMovies from "./movies";
import "./App.css";

function App() {
  const [movies, setMovies] = useState(initialMovies);

  const addMovie = (movie) => {
    setMovies((previousMovies) => [
      ...previousMovies,
      {
        ...movie,
        id: Date.now()
      }
    ]);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Home movies={movies} onAddMovie={addMovie} />}
      />
      <Route
        path="/movie/:id"
        element={<MovieDetails movies={movies} />}
      />
    </Routes>
  );
}

export default App;
