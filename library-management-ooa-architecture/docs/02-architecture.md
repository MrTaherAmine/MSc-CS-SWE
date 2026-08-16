# 2. System Architecture Design

## Architectural Style

The proposed LMS uses a layered architecture.

### Presentation / UI Layer

Responsibilities:

- display catalog information;
- receive user input;
- provide librarian/member screens;
- call application services.

### Business / Application Layer

Responsibilities:

- execute borrowing and return workflows;
- validate business rules;
- coordinate domain objects;
- manage transactions.

### Domain Layer

Contains the core business objects:

- Book
- Member
- Librarian
- BorrowTransaction

### Data Access Layer

Responsibilities:

- store and retrieve books;
- store and retrieve users;
- store and retrieve borrowing transactions;
- isolate persistence logic from business logic.

### Database

Stores persistent LMS information.

## High-Level Architecture

```mermaid
flowchart TD
    MEMBER[Member]
    LIBRARIAN[Librarian]
    ADMIN[Administrator]

    UI[Presentation / UI Layer]
    APP[Application / Business Services]
    DOMAIN[Domain Model]
    DAL[Data Access Layer]
    DB[(Database)]

    MEMBER --> UI
    LIBRARIAN --> UI
    ADMIN --> UI

    UI --> APP
    APP --> DOMAIN
    APP --> DAL
    DAL --> DB

    DOMAIN -. business entities .-> APP
```

## Major Components

```mermaid
flowchart LR
    UI[Web / Desktop UI]

    CATALOG[Catalog Service]
    MEMBER_SERVICE[Member Service]
    BORROWING[Borrowing Service]
    ADMIN_SERVICE[Administration Service]
    NOTIFY[Notification Service]

    BOOK_REPO[Book Repository]
    MEMBER_REPO[Member Repository]
    TX_REPO[Transaction Repository]

    DB[(LMS Database)]

    UI --> CATALOG
    UI --> MEMBER_SERVICE
    UI --> BORROWING
    UI --> ADMIN_SERVICE

    BORROWING --> NOTIFY

    CATALOG --> BOOK_REPO
    MEMBER_SERVICE --> MEMBER_REPO
    BORROWING --> BOOK_REPO
    BORROWING --> MEMBER_REPO
    BORROWING --> TX_REPO
    ADMIN_SERVICE --> MEMBER_REPO

    BOOK_REPO --> DB
    MEMBER_REPO --> DB
    TX_REPO --> DB
```

## Component Interaction Example — Borrowing

1. Member requests a book from the UI.
2. UI sends the request to BorrowingService.
3. BorrowingService retrieves Member and Book.
4. Business rules are validated.
5. Book state changes from Available to Issued.
6. BorrowTransaction is created.
7. Repositories persist the changes.
8. UI receives a success or failure response.

## Design Principles

### Separation of Concerns

UI, business logic, domain rules, and persistence are separated.

### Single Responsibility

Examples:

- `CatalogService` handles catalog operations.
- `BorrowingService` handles borrowing workflows.
- `BookRepository` handles book persistence.

### Dependency Direction

Higher-level business services depend on repository abstractions rather than directly accessing a database.
