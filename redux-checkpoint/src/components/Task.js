import React, { useState } from "react";
import { Badge, Button, Card, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editTask, toggleTask } from "../redux/tasksSlice";

// Displays and manages a single task.
function Task({ id, description, isDone }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleSave = () => {
    if (!editedDescription.trim()) {
      return;
    }

    dispatch(
      editTask({
        id,
        description: editedDescription.trim()
      })
    );

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedDescription(description);
    setIsEditing(false);
  };

  return (
    <Card className={`task-card ${isDone ? "task-done" : "task-active"}`}>
      <Card.Body>
        <div className="task-top-row">
          <Badge bg={isDone ? "success" : "secondary"}>
            {isDone ? "Done" : "Not Done"}
          </Badge>

          <span className="task-id">ID: {id}</span>
        </div>

        {isEditing ? (
          <Form.Control
            value={editedDescription}
            onChange={(event) => setEditedDescription(event.target.value)}
            className="my-3"
          />
        ) : (
          <Card.Text
            className={`task-description ${isDone ? "completed-text" : ""}`}
          >
            {description}
          </Card.Text>
        )}

        <div className="task-actions">
          <Button
            size="sm"
            variant={isDone ? "outline-warning" : "outline-success"}
            onClick={() => dispatch(toggleTask(id))}
          >
            {isDone ? "Mark Not Done" : "Mark Done"}
          </Button>

          {isEditing ? (
            <>
              <Button size="sm" variant="primary" onClick={handleSave}>
                Save
              </Button>

              <Button
                size="sm"
                variant="outline-secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default Task;
