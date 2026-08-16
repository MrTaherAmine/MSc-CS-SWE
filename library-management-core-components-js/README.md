# Library Management System — Core Components (JS)

Submission for:

**Low level design : Introduction to Low-Level Design — Library Management System - Core Components (JS)**

## Objective

Design reusable core components for a Library Management System using:

- ES modules;
- Factory Pattern;
- Strategy Pattern;
- Observer Pattern;
- reusable utility modules;
- interface-like abstractions;
- dependency injection.

## ES Modules

The project uses:

```json
"type": "module"
```

in `package.json`.

Modules use modern syntax:

```js
import { Book } from "./domain/Book.js";
export class Book {}
```

## Design Patterns

### Factory Pattern

Implemented in:

```text
src/factories/UserFactory.js
```

The calling code requests a user by type without directly instantiating a concrete subclass.

```js
const student = UserFactory.create(
  "student",
  "U001",
  "Amina",
  "amina@example.com"
);
```

### Strategy Pattern

Implemented through:

```text
BorrowStrategy
StudentBorrowStrategy
TeacherBorrowStrategy
```

Different user types can use different borrowing rules without changing the main borrowing workflow.

Current policies:

- Student: maximum 3 active books
- Teacher: maximum 5 active books

### Observer Pattern

Implemented through:

```text
NotificationService
Observer
UserNotificationObserver
```

Users can subscribe for notifications. Borrowing and returning operations publish messages without tightly coupling the borrowing logic to notification implementation.

## Interface-Like Abstractions

JavaScript does not provide traditional interfaces, so abstract-style base classes are used.

Examples:

```text
User
Repository
BorrowStrategy
Observer
```

Their methods throw errors when subclasses do not implement the required behavior.

## Dependency Injection

`BorrowingService` does not create its own repositories or notification service.

Dependencies are passed through its constructor:

```js
const borrowingService = new BorrowingService({
  bookRepository,
  userRepository,
  notificationService,
  strategyResolver
});
```

This improves:

- testability;
- modularity;
- replaceability;
- separation of concerns.

For example, an in-memory repository could later be replaced with a MongoDB repository without rewriting `BorrowingService`.

## Reusable Utilities

Reusable utility modules are stored in:

```text
src/utils/
```

Examples:

- ID generation
- input validation

## Project Structure

```text
library-management-core-components-js/
├── src/
│   ├── domain/
│   │   ├── Book.js
│   │   ├── Student.js
│   │   ├── Teacher.js
│   │   └── User.js
│   ├── factories/
│   │   └── UserFactory.js
│   ├── observers/
│   │   ├── Observer.js
│   │   └── UserNotificationObserver.js
│   ├── repositories/
│   │   ├── InMemoryRepository.js
│   │   └── Repository.js
│   ├── services/
│   │   ├── BorrowingService.js
│   │   ├── LibraryService.js
│   │   └── NotificationService.js
│   ├── strategies/
│   │   ├── BorrowStrategy.js
│   │   ├── StudentBorrowStrategy.js
│   │   └── TeacherBorrowStrategy.js
│   ├── utils/
│   │   ├── id.js
│   │   └── validation.js
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

## Run Locally

Requires Node.js with ES module support.

Run:

```bash
npm start
```

or:

```bash
node src/index.js
```

## Expected Demonstration

The sample program:

1. creates repositories;
2. injects them into services;
3. creates Student and Teacher users using the Factory Pattern;
4. assigns borrowing strategies;
5. registers notification observers;
6. adds books;
7. borrows books;
8. displays borrowed books;
9. returns a book;
10. sends notifications.

## Author

Taher Amine ELHOUARI
