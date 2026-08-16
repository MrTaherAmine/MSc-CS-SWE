/*
This file documents the intentionally buggy version used during the
debugging exercise. It is NOT imported by the running application.

Issues intentionally present:
1. The ProfileCard receives `username` instead of the required `name` prop.
2. The Counter receives `count + 1`, creating an incorrect displayed value.
3. StatusPanel receives `!user.online`, reversing the actual state.
4. The increment handler uses `setCount(count + 1)` rather than the
   functional updater. While this can work in simple cases, the corrected
   version uses the functional form to avoid stale-state problems when updates
   are queued.
*/

import React, { useState } from "react";
import Counter from "../src/components/Counter";
import ProfileCard from "../src/components/ProfileCard";
import StatusPanel from "../src/components/StatusPanel";

function BuggyApp() {
  const [user, setUser] = useState({
    name: "Taher",
    role: "Software Engineering Student",
    online: true
  });

  const [count, setCount] = useState(0);

  return (
    <>
      {/* BUG 1: wrong prop name */}
      <ProfileCard
        username={user.name}
        role={user.role}
        online={user.online}
      />

      {/* BUG 2: incorrect state value passed as prop */}
      <Counter
        count={count + 1}
        onIncrement={() => setCount(count + 1)}
        onReset={() => setCount(0)}
      />

      {/* BUG 3: boolean state inverted before passing */}
      <StatusPanel
        online={!user.online}
        onToggle={() =>
          setUser((current) => ({
            ...current,
            online: !current.online
          }))
        }
      />
    </>
  );
}

export default BuggyApp;
