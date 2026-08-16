const http = require("http");
const { URL } = require("url");

const PORT = process.env.PORT || 3000;

// In-memory data store.
let todos = [
  {
    id: 1,
    title: "Learn Node.js HTTP module",
    completed: true
  },
  {
    id: 2,
    title: "Build RESTful To-Do API",
    completed: false
  }
];

let nextId = 3;

// Sends a JSON response with the correct content type and status code.
function sendJson(res, statusCode, data) {
  const payload = JSON.stringify(data);

  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(payload)
  });

  res.end(payload);
}

// Reads and parses a JSON request body.
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();

      // Basic protection against excessively large request bodies.
      if (body.length > 1_000_000) {
        reject(new Error("Request body too large."));
        req.destroy();
      }
    });

    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error("Invalid JSON body."));
      }
    });

    req.on("error", reject);
  });
}

// Validates task input.
// For creation, title is required.
// For update, title/completed are optional but must have valid types if supplied.
function validateTodoPayload(payload, { requireTitle = false } = {}) {
  const errors = [];

  if (requireTitle && !payload.title) {
    errors.push("title is required");
  }

  if (
    payload.title !== undefined &&
    (typeof payload.title !== "string" || payload.title.trim() === "")
  ) {
    errors.push("title must be a non-empty string");
  }

  if (
    payload.completed !== undefined &&
    typeof payload.completed !== "boolean"
  ) {
    errors.push("completed must be a boolean");
  }

  return errors;
}

function getTodoIdFromPath(pathname) {
  const match = pathname.match(/^\/todos\/(\d+)$/);

  if (!match) {
    return null;
  }

  return Number(match[1]);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = url;

  // Root endpoint.
  if (req.method === "GET" && pathname === "/") {
    sendJson(res, 200, {
      message: "To-Do REST API is running",
      endpoints: {
        list: "GET /todos",
        single: "GET /todos/:id",
        create: "POST /todos",
        update: "PUT /todos/:id",
        delete: "DELETE /todos/:id"
      }
    });
    return;
  }

  // READ ALL: GET /todos
  if (req.method === "GET" && pathname === "/todos") {
    sendJson(res, 200, {
      count: todos.length,
      data: todos
    });
    return;
  }

  // READ ONE: GET /todos/:id
  if (req.method === "GET") {
    const id = getTodoIdFromPath(pathname);

    if (id !== null) {
      const todo = todos.find((item) => item.id === id);

      if (!todo) {
        sendJson(res, 404, {
          error: "Todo not found"
        });
        return;
      }

      sendJson(res, 200, todo);
      return;
    }
  }

  // CREATE: POST /todos
  if (req.method === "POST" && pathname === "/todos") {
    try {
      const payload = await parseJsonBody(req);
      const errors = validateTodoPayload(payload, { requireTitle: true });

      if (errors.length > 0) {
        sendJson(res, 400, {
          error: "Validation failed",
          details: errors
        });
        return;
      }

      const todo = {
        id: nextId++,
        title: payload.title.trim(),
        completed: payload.completed ?? false
      };

      todos.push(todo);

      sendJson(res, 201, todo);
    } catch (error) {
      sendJson(res, 400, {
        error: error.message
      });
    }

    return;
  }

  // UPDATE: PUT /todos/:id
  if (req.method === "PUT") {
    const id = getTodoIdFromPath(pathname);

    if (id !== null) {
      const index = todos.findIndex((item) => item.id === id);

      if (index === -1) {
        sendJson(res, 404, {
          error: "Todo not found"
        });
        return;
      }

      try {
        const payload = await parseJsonBody(req);
        const errors = validateTodoPayload(payload);

        if (errors.length > 0) {
          sendJson(res, 400, {
            error: "Validation failed",
            details: errors
          });
          return;
        }

        if (
          payload.title === undefined &&
          payload.completed === undefined
        ) {
          sendJson(res, 400, {
            error: "Provide at least one field to update: title or completed"
          });
          return;
        }

        const existing = todos[index];

        const updatedTodo = {
          ...existing,
          title:
            payload.title !== undefined
              ? payload.title.trim()
              : existing.title,
          completed:
            payload.completed !== undefined
              ? payload.completed
              : existing.completed
        };

        todos[index] = updatedTodo;

        sendJson(res, 200, updatedTodo);
      } catch (error) {
        sendJson(res, 400, {
          error: error.message
        });
      }

      return;
    }
  }

  // DELETE: DELETE /todos/:id
  if (req.method === "DELETE") {
    const id = getTodoIdFromPath(pathname);

    if (id !== null) {
      const index = todos.findIndex((item) => item.id === id);

      if (index === -1) {
        sendJson(res, 404, {
          error: "Todo not found"
        });
        return;
      }

      const [deletedTodo] = todos.splice(index, 1);

      sendJson(res, 200, {
        message: "Todo deleted successfully",
        data: deletedTodo
      });

      return;
    }
  }

  // Unknown route or method.
  sendJson(res, 404, {
    error: "Route not found"
  });
});

server.listen(PORT, () => {
  console.log(`To-Do API running at http://localhost:${PORT}`);
});
