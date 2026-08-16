import React from "react";
import Greeting from "./components/Greeting";
import Counter from "./components/Counter";
import "./App.css";

function App() {
  return (
    <main className="app">
      <section className="card">
        <h1>React + TypeScript Checkpoint</h1>

        {/* Greeting now receives a strongly typed string prop. */}
        <Greeting name="Taher" />

        {/* Counter uses typed class state. */}
        <Counter />
      </section>
    </main>
  );
}

export default App;
