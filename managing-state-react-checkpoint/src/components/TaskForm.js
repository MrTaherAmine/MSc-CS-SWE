import React, { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";

// Reusable form for both adding and editing tasks.
function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // Prefill the form whenever a task is selected for editing.
  useEffect(() => {
    if (editingTask) {
      setName(editingTask.name);
      setDescription(editingTask.description);
      setError("");
    } else {
      setName("");
      setDescription("");
    }
  }, [editingTask]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim() || !description.trim()) {
      setError("Task name and description are both required.");
      return;
    }

    onSubmit({
      name: name.trim(),
      description: description.trim()
    });

    setName("");
    setDescription("");
    setError("");
  };

  const handleCancel = () => {
    setName("");
    setDescription("");
    setError("");
    onCancelEdit();
  };

  return (
    <section className="form-panel">
      <h2>{editingTask ? "Edit Task" : "Add a New Task"}</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Task name</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. Finish React checkpoint"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Describe what needs to be done..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button type="submit" variant="primary">
            {editingTask ? "Update Task" : "Add Task"}
          </Button>

          {editingTask && (
            <Button type="button" variant="outline-secondary" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </div>
      </Form>
    </section>
  );
}

export default TaskForm;
