import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

// Inline styles required by the checkpoint.
const cardStyle = {
  width: "18rem",
  border: "none",
  borderRadius: "18px",
  overflow: "hidden",
  background: "rgba(255, 255, 255, 0.96)"
};

const imageStyle = {
  height: "320px",
  objectFit: "cover"
};

const infoRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  marginBottom: "8px"
};

function Player({
  name,
  team,
  nationality,
  jerseyNumber,
  age,
  imageUrl
}) {
  return (
    <Card style={cardStyle} className="h-100 shadow-lg player-card">
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={name}
        style={imageStyle}
      />

      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <Card.Title className="mb-0 fw-bold">{name}</Card.Title>
          <Badge bg="dark">#{jerseyNumber}</Badge>
        </div>

        <div style={infoRowStyle}>
          <strong>Team</strong>
          <span>{team}</span>
        </div>

        <div style={infoRowStyle}>
          <strong>Nationality</strong>
          <span>{nationality}</span>
        </div>

        <div style={infoRowStyle}>
          <strong>Age</strong>
          <span>{age}</span>
        </div>
      </Card.Body>
    </Card>
  );
}

// Default props required by the checkpoint.
Player.defaultProps = {
  name: "Unknown Player",
  team: "Unknown Team",
  nationality: "Unknown",
  jerseyNumber: 0,
  age: 0,
  imageUrl:
    "https://via.placeholder.com/400x500?text=No+Player+Image"
};

export default Player;
