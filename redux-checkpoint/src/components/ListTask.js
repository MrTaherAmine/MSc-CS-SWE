import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/tasksSlice";
import Task from "./Task";

// Displays tasks from Redux state and filters them by done/not done.
function ListTask() {
  const dispatch = useDispatch();
  const { tasks, filter } = useSelector((state) => state.tasks);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "done") {
      return task.isDone;
    }

    if (filter === "notDone") {
      return !task.isDone;
    }

    return true;
  });

  return (
    <section>
      <div className="filter-panel">
        <h2>Tasks</h2>

        <ButtonGroup>
          <Button
            variant={filter === "all" ? "dark" : "outline-dark"}
            onClick={() => dispatch(setFilter("all"))}
          >
            All
          </Button>

          <Button
            variant={filter === "done" ? "success" : "outline-success"}
            onClick={() => dispatch(setFilter("done"))}
          >
            Done
          </Button>

          <Button
            variant={filter === "notDone" ? "warning" : "outline-warning"}
            onClick={() => dispatch(setFilter("notDone"))}
          >
            Not Done
          </Button>
        </ButtonGroup>
      </div>

      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <Task key={task.id} {...task} />)
        ) : (
          <div className="empty-state">
            <h3>No tasks found</h3>
            <p>Try another filter or add a new Todo.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ListTask;
