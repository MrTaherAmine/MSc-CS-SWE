# Introduction to Design Patterns and Procedural Programming

Submission for the **Design Patterns — Introduction to Design Patterns and Procedural Programming** checkpoint.

## Overview

This project implements the same shopping cart twice:

1. **Procedural version**
2. **Refactored version using the Module Pattern**

The goal is to demonstrate how a design pattern can improve structure, encapsulation, maintainability, and scalability.

## Part 1 — Procedural Programming

Located at:

```text
procedural/cart.js
```

The procedural version uses:

- a global `cart` array;
- standalone functions;
- `addItem`;
- `removeItem`;
- `clearCart`;
- `viewCart`;
- `calculateTotal`.

Example:

```js
addItem("Apple", 2, 1.5);
addItem("Orange", 3, 2.0);
viewCart();
```

Expected output:

```text
Apple (x2) - 3.00 TND
Orange (x3) - 6.00 TND
Total: 9.00 TND
```

## Part 2 — Module Pattern

Located at:

```text
refactored/cartModule.js
```

The Module Pattern keeps the cart array private inside a closure:

```js
const ShoppingCart = (() => {
  let cart = [];

  // private logic

  return {
    addItem,
    removeItem,
    clearCart,
    viewCart
  };
})();
```

This avoids exposing the cart directly to global code.

## Benefits of the Refactor

- reduces global scope pollution;
- encapsulates cart state;
- exposes a clear public API;
- improves maintainability;
- makes later changes safer;
- prevents arbitrary direct mutation of the cart array.

## Reflection

The required 200–300 word reflection is available in:

```text
REFLECTION.md
```

## Project Structure

```text
design-patterns-shopping-cart/
├── procedural/
│   └── cart.js
├── refactored/
│   └── cartModule.js
├── .gitignore
├── package.json
├── README.md
└── REFLECTION.md
```

## Run Procedural Version

```bash
npm run procedural
```

## Run Refactored Version

```bash
npm run refactored
```

## Author

Taher Amine ELHOUARI
