import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasksSlice";

// Component responsible for adding new Todo items.
function Addtask() {
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!description.trim()) {
      return;
    }

    dispatch(addTask(description.trim()));
    setDescription("");
  };

  return (
    <Form onSubmit={handleSubmit} className="add-task-panel">
      <Form.Label className="fw-bold">Add a new task</Form.Label>

      <InputGroup>
        <Form.Control
          type="text"
          placeholder="What needs to be done?"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <Button type="submit" variant="primary">
          Add Todo
        </Button>
      </InputGroup>
    </Form>
  );
}

export default Addtask;
