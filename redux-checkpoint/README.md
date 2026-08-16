# Redux Checkpoint — Todo Application

Submission for **Front End Development: Redux — Redux Checkpoint**.

## Requirements covered

- Redux used for global state management
- Required components:
  - `Addtask`
  - `ListTask`
  - `Task`
- Every task contains:
  - `id`
  - `description`
  - `isDone`
- User can add a new Todo
- User can filter tasks by:
  - all
  - done
  - not done
- User can edit a task
- User can toggle a task between done and not done
- Redux Toolkit used to define reducers and actions
- React Redux `Provider`, `useSelector`, and `useDispatch` used

## Project structure

```text
redux-checkpoint/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Addtask.js
│   │   ├── ListTask.js
│   │   └── Task.js
│   ├── redux/
│   │   ├── store.js
│   │   └── tasksSlice.js
│   ├── App.css
│   ├── App.js
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

## Redux structure

The global store is configured in:

```text
src/redux/store.js
```

Task state and actions are defined in:

```text
src/redux/tasksSlice.js
```

Available actions:

- `addTask`
- `toggleTask`
- `editTask`
- `setFilter`

## Run locally

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm start
```

The application normally opens at:

```text
http://localhost:3000
```

## Author

Taher Amine ELHOUARI
