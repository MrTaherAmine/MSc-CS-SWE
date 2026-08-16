# Checkpoint Managing State in React — TaskFlow

Submission for **Front End Development: Managing State in React**.

## Overview

TaskFlow is a React To-Do List application created to demonstrate practical state management.

## Required features implemented

- Add new tasks
- Task name and description fields
- Form validation requiring both fields
- Display all tasks
- Edit existing tasks
- Edit form is pre-filled with the selected task
- Delete tasks
- Confirmation prompt before deletion
- Mark tasks as completed or active
- Completed tasks are visually distinguished
- Tasks persist between browser sessions using `localStorage`
- Tasks are loaded from browser storage when the application initializes
- Browser storage is updated whenever the task list changes
- Separate reusable components
- Code comments explaining component/function purposes
- Responsive custom CSS styling

## Optional feature implemented

The project also includes filtering by:

- All tasks
- Active tasks
- Completed tasks

## Project structure

```text
managing-state-react-checkpoint/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TaskFilter.js
│   │   ├── TaskForm.js
│   │   ├── TaskItem.js
│   │   └── TaskList.js
│   ├── App.css
│   ├── App.js
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

## State management

The application uses React Hooks:

- `useState` for tasks, editing state, form values, and filters
- `useEffect` to synchronize the task list with `localStorage`
- `useMemo` to derive the currently filtered task list

State updates use immutable array/object operations such as:

- `.map()`
- `.filter()`
- spread syntax (`...`)

## Browser storage

Tasks are stored under:

```text
taskflow.tasks
```

in `localStorage`.

This means tasks remain available after closing or refreshing the browser.

## Run locally

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm start
```

The development server normally opens at:

```text
http://localhost:3000
```

## Author

Taher Amine ELHOUARI
