# Smart Library Management System

Submission for **Low Level Design: Object-Oriented Design — Smart Library Management System**.

## Overview

This project implements a simplified Library Management System using
Object-Oriented Design principles.

The system manages:

- users;
- books;
- borrowing transactions;
- overdue notifications.

## Required subsystems

### User Management

Implemented using:

- abstract `User` base class;
- `Student`;
- `Teacher`;
- `UserFactory`.

### Book Management

Implemented using:

- `Book`;
- book registration inside `LibrarySystem`;
- availability tracking.

### Borrowing System

Implemented using:

- `BorrowTransaction`;
- borrowing;
- returning;
- borrowed-book lookup;
- overdue simulation.

## Design patterns

### 1. Factory Pattern

Implemented in:

```text
src/patterns/UserFactory.js
```

The factory creates the correct user subclass without requiring the calling
code to instantiate `Student` or `Teacher` directly.

Example:

```js
const student = UserFactory.createUser(
  "student",
  "U001",
  "Amina",
  "amina@example.com"
);
```

### 2. Singleton Pattern

Implemented in:

```text
src/services/LibrarySystem.js
```

`LibrarySystem.getInstance()` guarantees one central system manages users,
books, and transactions.

Example:

```js
const library = LibrarySystem.getInstance();
```

### 3. Observer Pattern

The optional Observer Pattern is also implemented.

- `NotificationService` manages subscribers.
- `User` exposes an `update()` method.
- overdue transactions trigger user notifications.

## Object-Oriented Design concepts

### Abstraction

`User` is treated as an abstract base class and cannot be instantiated directly.

### Inheritance

`Student` and `Teacher` inherit common behavior from `User`.

### Encapsulation

Internal fields use underscore-prefixed properties and are accessed through
methods/getters.

Examples:

```text
_id
_name
_borrowedBookIds
_isAvailable
```

### Polymorphism

`Student` and `Teacher` provide different implementations of:

```text
getBorrowLimit()
getRole()
```

For example:

- Student borrowing limit: 3 books
- Teacher borrowing limit: 5 books

## Features implemented

- Add users
- Add books
- Borrow books
- Return books
- View borrowed books
- Track book availability
- Track borrowing transactions
- Simulate overdue books
- Notify users about overdue books
- Enforce different borrowing limits for students and teachers

## Project structure

```text
smart-library-management-system/
├── src/
│   ├── models/
│   │   ├── Book.js
│   │   ├── BorrowTransaction.js
│   │   ├── Student.js
│   │   ├── Teacher.js
│   │   └── User.js
│   ├── patterns/
│   │   └── UserFactory.js
│   ├── services/
│   │   ├── LibrarySystem.js
│   │   └── NotificationService.js
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

## Run locally

Node.js is required.

Run:

```bash
npm start
```

or:

```bash
node src/index.js
```

The console demonstration will:

1. create a Student and Teacher using the Factory Pattern;
2. add users and books;
3. borrow books;
4. display borrowed books;
5. simulate an overdue transaction;
6. send an overdue notification;
7. return a book;
8. verify the Singleton Pattern.

## Author

Taher Amine ELHOUARI
