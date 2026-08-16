# React Checkpoint 01

Submission for the **Front End Development: React JS Fundamentals – React Checkpoint 01**.

## Requirements covered

- React project structure compatible with Create React App
- `App.js` used as the root component
- `product.js` exporting a product object with:
  - name
  - price
  - description
  - image URL
- Four reusable product components:
  - `Name.js`
  - `Price.js`
  - `Description.js`
  - `Image.js`
- Product data imported into each product component
- React Bootstrap `Card` used in `App.js`
- Conditional greeting:
  - `Hello, Taher!` when a first name is provided
  - `Hello, there!` when the first name is empty
- Conditional image rendered only when a first name exists
- Custom styling in `App.css`
- Code comments included for clarity

## Install and run

```bash
npm install
npm start
```

The application will normally open at:

```text
http://localhost:3000
```

## Test the fallback greeting

In `src/App.js`, change:

```js
const firstName = "Taher";
```

to:

```js
const firstName = "";
```

The application will display:

```text
Hello, there!
```

and the greeting avatar will not be displayed.

## Author

Taher Amine ELHOUARI
