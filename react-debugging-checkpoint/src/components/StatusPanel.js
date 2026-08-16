import React from "react";

// StatusPanel demonstrates a boolean prop and a callback prop.
function StatusPanel({ online, onToggle }) {
  return (
    <article className="panel">
      <h2>Status Control</h2>

      <p>
        User is currently{" "}
        <strong>{online ? "online" : "offline"}</strong>.
      </p>

      <button type="button" onClick={onToggle}>
        Set {online ? "Offline" : "Online"}
      </button>
    </article>
  );
}

export default StatusPanel;
