import React, { useState } from "react";
import Counter from "./components/Counter";
import ProfileCard from "./components/ProfileCard";
import StatusPanel from "./components/StatusPanel";

function App() {
  // Global state shared with child components through props.
  const [user, setUser] = useState({
    name: "Taher",
    role: "Software Engineering Student",
    online: true
  });

  const [count, setCount] = useState(0);

  const toggleOnlineStatus = () => {
    setUser((previousUser) => ({
      ...previousUser,
      online: !previousUser.online
    }));
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <span className="eyebrow">React Debugging Checkpoint</span>
        <h1>DebugLab</h1>
        <p>
          A small React application containing multiple components, props,
          state, and interactive behavior for inspection with React Developer
          Tools.
        </p>
      </section>

      <section className="dashboard-grid">
        <ProfileCard
          name={user.name}
          role={user.role}
          online={user.online}
        />

        <Counter
          count={count}
          onIncrement={() => setCount((current) => current + 1)}
          onReset={() => setCount(0)}
        />

        <StatusPanel
          online={user.online}
          onToggle={toggleOnlineStatus}
        />
      </section>

      <section className="verification-panel">
        <h2>Verification</h2>
        <p>
          Current count: <strong>{count}</strong>
        </p>
        <p>
          Current user status:{" "}
          <strong>{user.online ? "Online" : "Offline"}</strong>
        </p>
      </section>
    </main>
  );
}

export default App;
