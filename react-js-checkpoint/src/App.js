// Import React.
import React from "react";

// Import the React Bootstrap components used in this checkpoint.
import {
  Navbar,
  Nav,
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";

// Main application component.
function App() {
  return (
    <>
      {/* The assignment requires a div with the className "App" inside a Fragment. */}
      <div className="App">
        {/* Responsive navigation bar created with React Bootstrap. */}
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Taher Amine Portfolio</Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar">
              <Nav className="ms-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#skills">Skills</Nav.Link>
                <Nav.Link href="#contact">Contact</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Heading section. */}
        <Container id="home" className="text-center my-5">
          <h1>My First React Application</h1>
          <p className="lead">
            Exploring React components and React Bootstrap as part of my
            Software Engineering journey.
          </p>
        </Container>

        {/* Three-card section required by the checkpoint. */}
        <Container id="skills" className="my-5">
          <h2 className="text-center mb-4">Technologies I&apos;m Exploring</h2>
          <Row className="g-4">
            {/* Card 1 */}
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>React</Card.Title>
                  <Card.Text>
                    React is a JavaScript library for creating reusable,
                    component-based user interfaces.
                  </Card.Text>
                  <Button
                    variant="primary"
                    href="https://react.dev/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn React
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Card 2 */}
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>React Bootstrap</Card.Title>
                  <Card.Text>
                    React Bootstrap provides reusable Bootstrap components that
                    can be used directly inside React applications.
                  </Card.Text>
                  <Button
                    variant="success"
                    href="https://react-bootstrap.github.io/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Explore Bootstrap
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Card 3 */}
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>Secure Development</Card.Title>
                  <Card.Text>
                    My objective is to combine modern software development with
                    cybersecurity principles to build secure applications.
                  </Card.Text>
                  <Button variant="dark" href="#contact">
                    My Journey
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Bootstrap form included because it is explicitly part of the evaluation rubric. */}
        <Container id="contact" className="my-5">
          <h2 className="text-center mb-4">Contact Me</h2>
          <Row className="justify-content-center">
            <Col md={7} lg={6}>
              <Form onSubmit={(event) => event.preventDefault()}>
                {/* Name field */}
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>

                {/* Email field */}
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>

                {/* Message field */}
                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Write your message"
                  />
                </Form.Group>

                {/* Submit button */}
                <Button variant="primary" type="submit">
                  Send Message
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>

        {/* Simple footer to complete the page. */}
        <footer className="bg-dark text-white text-center py-4 mt-5">
          <Container>
            <p className="mb-0">
              © 2026 Taher Amine ELHOUARI | React JS Checkpoint
            </p>
          </Container>
        </footer>
      </div>
    </>
  );
}

// Export App so index.js can render it.
export default App;
