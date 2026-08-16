# React State Checkpoint

Submission for **Front End Development: React State — React State Checkpoint**.

## Requirements covered

- React project structure compatible with Create React App
- `App.js` converted into a class-based component
- Component state includes:
  - `Person`
    - `fullName`
    - `bio`
    - `imgSrc`
    - `profession`
  - `shows`
  - `secondsSinceMount`
- Button toggles the `shows` boolean
- Person profile is rendered conditionally when `shows === true`
- `componentDidMount()` starts a timer with `setInterval`
- Timer displays how many seconds have passed since the component mounted
- `componentWillUnmount()` clears the interval
- Custom styling and React Bootstrap used for presentation

## Run locally

```bash
npm install
npm start
```

The app normally opens at:

```text
http://localhost:3000
```

## Author

Taher Amine ELHOUARI
