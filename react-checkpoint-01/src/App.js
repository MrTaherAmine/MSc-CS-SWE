import React from "react";
import { Badge, Button, Card, Container } from "react-bootstrap";
import Name from "./Name";
import Price from "./Price";
import Description from "./Description";
import Image from "./Image";
import "./App.css";

// Change this value to an empty string ("") to test the fallback greeting.
const firstName = "Taher";

function App() {
  return (
    <>
      <div className="App">
        <Container className="page-shell">
          {/* Page heading */}
          <header className="hero-section text-center">
            <Badge bg="primary" className="mb-3">
              React JS Fundamentals
            </Badge>
            <h1>Product Card Challenge</h1>
            <p>
              A simple React project built with reusable components,
              JSX, conditional rendering, and React Bootstrap.
            </p>
          </header>

          {/* Product card built from the four required components */}
          <Card className="product-card shadow-lg">
            <div className="image-wrapper">
              <Image />
            </div>

            <Card.Body>
              <Name />
              <Price />
              <Description />

              <Button variant="dark" className="w-100">
                View Product
              </Button>
            </Card.Body>
          </Card>

          {/* Conditional greeting */}
          <section className="greeting-section text-center">
            <h2>{firstName ? `Hello, ${firstName}!` : "Hello, there!"}</h2>

            {/* Display this image only when a first name is provided */}
            {firstName && (
              <img
                src="https://api.dicebear.com/9.x/initials/svg?seed=Taher%20Amine"
                alt={`${firstName}'s avatar`}
                className="greeting-avatar"
              />
            )}

            <p>
              {firstName
                ? "Welcome to my React product-card checkpoint."
                : "Welcome to the React product-card checkpoint."}
            </p>
          </section>
        </Container>
      </div>
    </>
  );
}

export default App;
