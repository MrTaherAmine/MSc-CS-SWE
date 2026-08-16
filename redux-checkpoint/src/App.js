import React from "react";
import { Badge, Container } from "react-bootstrap";
import Addtask from "./components/Addtask";
import ListTask from "./components/ListTask";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Container className="page-shell">
        <header className="hero text-center">
          <Badge bg="primary" className="mb-3 px-3 py-2">
            Redux Checkpoint
          </Badge>

          <h1>Redux Todo</h1>

          <p>
            A simple Todo application using Redux to manage global task state,
            filtering, completion status and task editing.
          </p>
        </header>

        <Addtask />
        <ListTask />

        <footer className="text-center">
          <p>Redux Checkpoint — Taher Amine ELHOUARI</p>
        </footer>
      </Container>
    </div>
  );
}

export default App;
