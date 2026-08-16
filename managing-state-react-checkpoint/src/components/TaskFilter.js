import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

// Optional feature: filter tasks by completion status.
function TaskFilter({ filter, onChange, counts }) {
  return (
    <div className="filter-bar">
      <ButtonGroup>
        <Button
          variant={filter === "all" ? "dark" : "outline-dark"}
          onClick={() => onChange("all")}
        >
          All ({counts.all})
        </Button>

        <Button
          variant={filter === "active" ? "primary" : "outline-primary"}
          onClick={() => onChange("active")}
        >
          Active ({counts.active})
        </Button>

        <Button
          variant={filter === "completed" ? "success" : "outline-success"}
          onClick={() => onChange("completed")}
        >
          Completed ({counts.completed})
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default TaskFilter;
