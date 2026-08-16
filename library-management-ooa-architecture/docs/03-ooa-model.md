# 3. Object-Oriented Analysis

## Identified Classes

### Book

**Attributes**

- id
- isbn
- title
- author
- category
- status

**Methods**

- isAvailable()
- markIssued()
- markReturned()

### Member

**Attributes**

- memberId
- fullName
- email
- borrowedBooks

**Methods**

- borrowBook()
- returnBook()
- viewBorrowedBooks()

### Librarian

**Attributes**

- employeeId
- fullName

**Methods**

- addBook()
- updateBook()
- removeBook()
- registerMember()
- issueBook()
- receiveBook()

### BorrowTransaction

**Attributes**

- transactionId
- memberId
- bookId
- borrowedAt
- dueAt
- returnedAt
- status

**Methods**

- markReturned()
- isOverdue()

### CatalogService

**Methods**

- searchByTitle()
- searchByAuthor()
- searchByISBN()
- getBookDetails()

### BorrowingService

**Methods**

- borrowBook()
- returnBook()
- listBorrowedBooks()
- findOverdueTransactions()

## Class Diagram

```mermaid
classDiagram

class Book {
  -String id
  -String isbn
  -String title
  -String author
  -String category
  -BookStatus status
  +isAvailable() Boolean
  +markIssued()
  +markReturned()
}

class Member {
  -String memberId
  -String fullName
  -String email
  -List~Book~ borrowedBooks
  +borrowBook(Book)
  +returnBook(Book)
  +viewBorrowedBooks()
}

class Librarian {
  -String employeeId
  -String fullName
  +addBook(Book)
  +updateBook(Book)
  +removeBook(Book)
  +registerMember(Member)
}

class BorrowTransaction {
  -String transactionId
  -Date borrowedAt
  -Date dueAt
  -Date returnedAt
  -TransactionStatus status
  +markReturned()
  +isOverdue() Boolean
}

class CatalogService {
  +searchByTitle(String)
  +searchByAuthor(String)
  +searchByISBN(String)
}

class BorrowingService {
  +borrowBook(String memberId, String bookId)
  +returnBook(String memberId, String bookId)
  +listBorrowedBooks(String memberId)
}

Member "1" --> "0..*" BorrowTransaction : creates
Book "1" --> "0..*" BorrowTransaction : involved in
BorrowingService --> Member
BorrowingService --> Book
BorrowingService --> BorrowTransaction
CatalogService --> Book
Librarian --> Book : manages
Librarian --> Member : manages
```

## Use Case Diagram

```mermaid
flowchart LR
    MEMBER((Member))
    LIBRARIAN((Librarian))
    ADMIN((Administrator))

    SEARCH([Search Book])
    DETAILS([View Book Details])
    BORROW([Borrow Book])
    RETURN([Return Book])
    VIEWLOANS([View Borrowed Books])

    ADDBOOK([Add Book])
    UPDATEBOOK([Update Book])
    REMBOOK([Remove Book])
    REGMEMBER([Register Member])
    OVERDUE([View Overdue Loans])

    ACCOUNTS([Manage Accounts])
    REPORTS([View Reports])

    MEMBER --> SEARCH
    MEMBER --> DETAILS
    MEMBER --> BORROW
    MEMBER --> RETURN
    MEMBER --> VIEWLOANS

    LIBRARIAN --> SEARCH
    LIBRARIAN --> ADDBOOK
    LIBRARIAN --> UPDATEBOOK
    LIBRARIAN --> REMBOOK
    LIBRARIAN --> REGMEMBER
    LIBRARIAN --> BORROW
    LIBRARIAN --> RETURN
    LIBRARIAN --> OVERDUE

    ADMIN --> ACCOUNTS
    ADMIN --> REPORTS
```
