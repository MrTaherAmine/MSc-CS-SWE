# Build a To-Do App RESTful API with Node.js

Submission for:

**Backend Development : Client-Server communication — Build a To-Do App RESTful API with Node.js**

## Objective

Build a functional RESTful To-Do backend using only Node.js core modules.

No Express framework and no database are used.

All data is stored in-memory in a JavaScript array.

## Task Structure

Each task contains:

```json
{
  "id": 1,
  "title": "Example task",
  "completed": false
}
```

- `id` is unique
- `title` is required
- `completed` is optional and defaults to `false`

## RESTful Routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/` | API information |
| GET | `/todos` | Get all tasks |
| GET | `/todos/:id` | Get one task |
| POST | `/todos` | Create a task |
| PUT | `/todos/:id` | Update a task |
| DELETE | `/todos/:id` | Delete a task |

## HTTP Status Codes Used

- `200 OK` — successful GET, UPDATE, DELETE
- `201 Created` — successful task creation
- `400 Bad Request` — invalid JSON or validation error
- `404 Not Found` — unknown route or task

## Run Locally

Node.js is required.

Start the server:

```bash
npm start
```

or:

```bash
node server.js
```

The server runs at:

```text
http://localhost:3000
```

## Test with curl

### Get all tasks

```bash
curl http://localhost:3000/todos
```

### Get one task

```bash
curl http://localhost:3000/todos/1
```

### Create a new task

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Finish Node.js checkpoint"}'
```

Example response:

```json
{
  "id": 3,
  "title": "Finish Node.js checkpoint",
  "completed": false
}
```

### Create a completed task

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Read REST notes","completed":true}'
```

### Update a task title

```bash
curl -X PUT http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Master Node.js HTTP"}'
```

### Mark a task completed

```bash
curl -X PUT http://localhost:3000/todos/2 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

### Delete a task

```bash
curl -X DELETE http://localhost:3000/todos/2
```

## Validation

The API validates incoming request data.

A task title must be:

- present when creating a task;
- a string;
- non-empty.

The `completed` field must be a boolean when supplied.

Invalid requests return:

```text
400 Bad Request
```

## Client-Server Flow

Example for:

```text
POST /todos
```

1. A client sends an HTTP request.
2. Node's `http` server receives the request.
3. The server reads the request body.
4. JSON is parsed.
5. Input is validated.
6. A unique task ID is created.
7. The new object is pushed into the in-memory array.
8. The server returns an HTTP `201 Created` response with JSON.

## Important Limitation

The data is intentionally stored only in memory.

This means all tasks are reset whenever the Node.js server restarts.

A later backend could replace the array with a database without changing the REST API design.

## Project Structure

```text
todo-rest-api-node-core/
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Author

Taher Amine ELHOUARI
