import React from "react";

// Displays props received from App.
function ProfileCard({ name, role, online }) {
  return (
    <article className="panel">
      <h2>Profile</h2>

      <div className="avatar" aria-hidden="true">
        {name.charAt(0).toUpperCase()}
      </div>

      <h3>{name}</h3>
      <p>{role}</p>

      <span className={`status-badge ${online ? "online" : "offline"}`}>
        {online ? "Online" : "Offline"}
      </span>
    </article>
  );
}

export default ProfileCard;
