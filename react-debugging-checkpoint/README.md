# Checkpoint Debugging React

Submission for **Front End Development: React Debugging — Checkpoint Debugging React**.

## Overview

This project provides a small React application designed for debugging with
React Developer Tools.

It contains:

- multiple React components;
- application state;
- props passed from parent to child components;
- interactive state updates;
- an intentionally buggy reference version;
- a corrected working version;
- detailed debugging documentation.

## Components

```text
App
├── ProfileCard
├── Counter
└── StatusPanel
```

## Identified issues

The documented buggy version contains these issues:

1. Incorrect prop name passed to `ProfileCard`.
2. Incorrect counter value passed to `Counter`.
3. Reversed boolean state passed to `StatusPanel`.
4. Counter update improved to use a functional state updater.

The corrected application is located in `src/`.

The original debugging scenario is documented in:

```text
debug-reference/BuggyApp.js
```

## Debugging report

Read:

```text
DEBUGGING.md
```

for the complete diagnosis, fixes, and verification process.

## Run locally

```bash
npm install
npm start
```

Then open:

```text
http://localhost:3000
```

## React Developer Tools

Install the React Developer Tools extension for your browser, then open the
browser Developer Tools and select the **Components** panel.

Use it to inspect:

- `App` state;
- `ProfileCard` props;
- `Counter` props;
- `StatusPanel` props.

## Suggested screenshots

If visual evidence is requested by the instructor, take screenshots of the
Components panel while inspecting the components. See `DEBUGGING.md` for the
recommended screenshot list.

## Project structure

```text
react-debugging-checkpoint/
├── debug-reference/
│   └── BuggyApp.js
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Counter.js
│   │   ├── ProfileCard.js
│   │   └── StatusPanel.js
│   ├── App.css
│   ├── App.js
│   └── index.js
├── .gitignore
├── DEBUGGING.md
├── package.json
└── README.md
```

## Author

Taher Amine ELHOUARI
