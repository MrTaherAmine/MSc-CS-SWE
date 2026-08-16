import React from "react";
import UserList from "./UserList";
import "./App.css";

function App() {
  return (
    <main className="app-shell">
      <header className="hero">
        <span className="eyebrow">Advanced Back End Development : API</span>
        <h1>Axios User Explorer</h1>
        <p>
          A React application that consumes the JSONPlaceholder users API with
          Axios, useEffect, and useState.
        </p>
      </header>

      <UserList />
    </main>
  );
}

export default App;
