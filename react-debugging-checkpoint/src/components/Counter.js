import React from "react";

// Counter receives state and event handlers through props.
function Counter({ count, onIncrement, onReset }) {
  return (
    <article className="panel">
      <h2>Counter</h2>
      <div className="count-value">{count}</div>

      <div className="button-row">
        <button type="button" onClick={onIncrement}>
          Increment
        </button>

        <button type="button" className="secondary" onClick={onReset}>
          Reset
        </button>
      </div>
    </article>
  );
}

export default Counter;
