# 4. Behavioral Models

## Sequence Diagram — Borrow Book

```mermaid
sequenceDiagram
    actor Member
    participant UI
    participant BorrowingService
    participant MemberRepo
    participant BookRepo
    participant TransactionRepo

    Member->>UI: Select Borrow Book
    UI->>BorrowingService: borrowBook(memberId, bookId)

    BorrowingService->>MemberRepo: findById(memberId)
    MemberRepo-->>BorrowingService: Member

    BorrowingService->>BookRepo: findById(bookId)
    BookRepo-->>BorrowingService: Book

    alt Book is available
        BorrowingService->>BorrowingService: validate business rules
        BorrowingService->>BookRepo: update status = Issued
        BorrowingService->>TransactionRepo: create transaction
        TransactionRepo-->>BorrowingService: transaction
        BorrowingService-->>UI: Borrow successful
        UI-->>Member: Show confirmation
    else Book unavailable
        BorrowingService-->>UI: Borrow rejected
        UI-->>Member: Show unavailable message
    end
```

## Sequence Diagram — Return Book

```mermaid
sequenceDiagram
    actor Member
    participant UI
    participant BorrowingService
    participant TransactionRepo
    participant BookRepo

    Member->>UI: Return Book
    UI->>BorrowingService: returnBook(memberId, bookId)

    BorrowingService->>TransactionRepo: findOpenTransaction(memberId, bookId)
    TransactionRepo-->>BorrowingService: BorrowTransaction

    BorrowingService->>TransactionRepo: markReturned()
    BorrowingService->>BookRepo: update status = Available

    BorrowingService-->>UI: Return successful
    UI-->>Member: Show confirmation
```

## Book State Diagram

```mermaid
stateDiagram-v2
    [*] --> Available

    Available --> Issued : borrowBook()
    Issued --> Overdue : due date passed
    Issued --> Available : returnBook()
    Overdue --> Available : returnBook()

    Available --> Removed : remove from catalog
    Removed --> [*]
```

## Behavioral Rules

### Available

The book can be borrowed.

### Issued

The book has an active borrowing transaction and cannot be borrowed again.

### Overdue

The due date has passed while the borrowing transaction remains open.

### Removed

The book is no longer available through the catalog.
