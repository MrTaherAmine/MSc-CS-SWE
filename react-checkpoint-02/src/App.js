import React from "react";
import { Badge, Container } from "react-bootstrap";
import PlayersList from "./PlayersList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Container fluid="xl">
        <header className="hero text-center">
          <Badge bg="warning" text="dark" className="mb-3 px-3 py-2">
            React JS Fundamentals
          </Badge>

          <h1>FIFA Player Cards</h1>

          <p>
            A reusable React player-card gallery built with props,
            destructuring, array mapping, default props, JSX and React Bootstrap.
          </p>
        </header>

        {/* PlayerList renders every player from players.js */}
        <PlayersList />

        <footer className="text-center mt-5">
          <p>React Checkpoint 02 — Taher Amine ELHOUARI</p>
        </footer>
      </Container>
    </div>
  );
}

export default App;
