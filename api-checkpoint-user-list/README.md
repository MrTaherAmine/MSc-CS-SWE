# API Checkpoint — Axios User Explorer

Submission for:

**Advanced Back End Development : API — API Checkpoint**

## Requirements covered

- React project structure compatible with Create React App
- `UserList.js` created in the `src` folder
- Axios added as a dependency
- JSONPlaceholder users API used
- Axios GET request executed inside `useEffect`
- `useState` used to store API data in `listOfUser`
- `.map()` used to display users on screen
- Custom responsive styling
- Loading and error handling added

## API endpoint

```text
https://jsonplaceholder.typicode.com/users
```

## Main Axios request

```js
useEffect(() => {
  const getUsers = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    setListOfUser(response.data);
  };

  getUsers();
}, []);
```

## Project Structure

```text
api-checkpoint-user-list/
├── public/
│   └── index.html
├── src/
│   ├── App.css
│   ├── App.js
│   ├── UserList.js
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

## Run locally

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The app normally opens at:

```text
http://localhost:3000
```

## What the UI displays

For every user returned by the API, the application displays:

- full name
- username
- email
- phone
- company
- city
- website

## Author

Taher Amine ELHOUARI
