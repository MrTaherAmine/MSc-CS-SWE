import React from "react";
import { Badge, Button, Card } from "react-bootstrap";

// Displays one task and exposes edit/delete/complete actions.
function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <Card className={`task-card ${task.completed ? "completed" : "active"}`}>
      <Card.Body>
        <div className="task-card-header">
          <div>
            <Card.Title className={task.completed ? "task-title done" : "task-title"}>
              {task.name}
            </Card.Title>

            <Badge bg={task.completed ? "success" : "primary"}>
              {task.completed ? "Completed" : "Active"}
            </Badge>
          </div>

          <span className="task-date">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>

        <Card.Text className={task.completed ? "task-description done" : "task-description"}>
          {task.description}
        </Card.Text>

        <div className="task-actions">
          <Button
            size="sm"
            variant={task.completed ? "outline-warning" : "outline-success"}
            onClick={() => onToggle(task.id)}
          >
            {task.completed ? "Mark Active" : "Mark Completed"}
          </Button>

          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => onEdit(task)}
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant="outline-danger"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TaskItem;
