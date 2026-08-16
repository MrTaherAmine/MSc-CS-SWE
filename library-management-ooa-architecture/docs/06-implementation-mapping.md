# 6. Abstraction to Implementation

The goal of this checkpoint is analysis and modeling, but the following examples show how the identified objects could map to implementation code.

## Book Class — Pseudocode

```text
CLASS Book

    PRIVATE id
    PRIVATE title
    PRIVATE author
    PRIVATE status

    CONSTRUCTOR(id, title, author)
        this.id = id
        this.title = title
        this.author = author
        this.status = AVAILABLE

    METHOD isAvailable()
        RETURN status == AVAILABLE

    METHOD issue()
        IF status != AVAILABLE
            THROW "Book is not available"
        END IF

        status = ISSUED

    METHOD returnBook()
        status = AVAILABLE

END CLASS
```

## Borrowing Service — Pseudocode

```text
FUNCTION borrowBook(memberId, bookId)

    member = memberRepository.findById(memberId)
    book = bookRepository.findById(bookId)

    IF member does not exist
        THROW "Member not found"
    END IF

    IF book does not exist
        THROW "Book not found"
    END IF

    IF book.isAvailable() == false
        THROW "Book unavailable"
    END IF

    book.issue()

    transaction = new BorrowTransaction(
        memberId,
        bookId,
        currentDate,
        dueDate
    )

    bookRepository.save(book)
    transactionRepository.save(transaction)

    RETURN transaction

END FUNCTION
```

## Mapping Analysis Objects to Components

| Analysis Object | Implementation Responsibility |
|---|---|
| Book | Domain entity |
| Member | Domain entity |
| Librarian | Domain / authorization role |
| BorrowTransaction | Domain entity |
| CatalogService | Application service |
| BorrowingService | Application service |
| BookRepository | Data access abstraction |
| MemberRepository | Data access abstraction |
| TransactionRepository | Data access abstraction |
| UI | Presentation layer |

## Design Considerations

### Encapsulation

Book status should be changed through methods such as:

```text
issue()
returnBook()
```

instead of exposing status for arbitrary modification.

### Single Responsibility

`Book` should represent book state and behavior.

It should not:

- query a database;
- render HTML;
- manage members.

### Abstraction

Application services operate on domain abstractions rather than database-specific structures.

### Extensibility

The design could later support:

- reservations;
- fines;
- multiple physical copies per title;
- notifications;
- e-books;
- authentication;
- audit logging.
