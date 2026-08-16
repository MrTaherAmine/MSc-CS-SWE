import React, { Component } from "react";
import { Badge, Button, Card, Container } from "react-bootstrap";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    // State required by the checkpoint.
    this.state = {
      Person: {
        fullName: "Taher Amine ELHOUARI",
        bio:
          "Cybersecurity professional reconnecting with software engineering through React and modern web development.",
        imgSrc:
          "https://api.dicebear.com/9.x/initials/svg?seed=Taher%20Amine%20ELHOUARI",
        profession: "Cybersecurity Leader & Software Engineering Student"
      },
      shows: false,
      secondsSinceMount: 0
    };
  }

  // Lifecycle method: starts the timer when the component is mounted.
  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        secondsSinceMount: prevState.secondsSinceMount + 1
      }));
    }, 1000);
  }

  // Good practice: clear the interval before unmounting the component.
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  // Toggles the profile visibility.
  toggleProfile = () => {
    this.setState((prevState) => ({
      shows: !prevState.shows
    }));
  };

  render() {
    const { Person, shows, secondsSinceMount } = this.state;

    return (
      <div className="App">
        <Container className="page-shell">
          <header className="hero text-center">
            <Badge bg="primary" className="mb-3 px-3 py-2">
              React State
            </Badge>

            <h1>Class Component & State Checkpoint</h1>

            <p>
              This project demonstrates a class-based React component,
              component state, conditional rendering, and lifecycle methods.
            </p>
          </header>

          <Card className="control-card shadow-lg">
            <Card.Body className="text-center">
              <h2 className="mb-3">Profile Visibility</h2>

              <p className="timer-text">
                Component mounted for: <strong>{secondsSinceMount} seconds</strong>
              </p>

              <Button
                variant={shows ? "danger" : "success"}
                onClick={this.toggleProfile}
              >
                {shows ? "Hide Profile" : "Show Profile"}
              </Button>
            </Card.Body>
          </Card>

          {shows && (
            <Card className="profile-card shadow-lg mt-4">
              <Card.Img
                variant="top"
                src={Person.imgSrc}
                alt={Person.fullName}
                className="profile-image"
              />

              <Card.Body>
                <Card.Title className="profile-name">
                  {Person.fullName}
                </Card.Title>

                <Card.Subtitle className="mb-3 text-muted">
                  {Person.profession}
                </Card.Subtitle>

                <Card.Text className="profile-bio">
                  {Person.bio}
                </Card.Text>
              </Card.Body>
            </Card>
          )}

          <footer className="text-center mt-5">
            <p>React State Checkpoint — Taher Amine ELHOUARI</p>
          </footer>
        </Container>
      </div>
    );
  }
}

export default App;
