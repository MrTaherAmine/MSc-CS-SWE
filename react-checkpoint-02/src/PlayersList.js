import React from "react";
import { Col, Row } from "react-bootstrap";
import Player from "./Player";
import players from "./players";

function PlayersList() {
  return (
    <Row className="g-4 justify-content-center">
      {players.map((player) => (
        <Col
          key={`${player.name}-${player.jerseyNumber}`}
          xs={12}
          sm={6}
          lg={3}
          className="d-flex justify-content-center"
        >
          {/* Spread operator passes all player object attributes as props. */}
          <Player {...player} />
        </Col>
      ))}
    </Row>
  );
}

export default PlayersList;
