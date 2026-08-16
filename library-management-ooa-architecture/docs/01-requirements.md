# 1. Requirement Analysis

## System Objective

The Library Management System manages books, members, borrowing and return transactions, and administrative operations.

The system should allow library staff and members to interact with the same core business services while keeping responsibilities separated.

## Main Actors

### Member

A Member can:

- search the book catalog;
- view book availability;
- borrow an available book;
- return a borrowed book;
- view currently borrowed books;
- view borrowing history.

### Librarian

A Librarian can:

- register books;
- update book information;
- remove books;
- register members;
- issue books;
- process returned books;
- view overdue transactions;
- manage library records.

### Administrator

An Administrator can:

- manage librarian accounts;
- configure system parameters;
- view reports and system status.

## Core Use Cases

| Actor | Use Case |
|---|---|
| Member | Search Book |
| Member | View Book Details |
| Member | Borrow Book |
| Member | Return Book |
| Member | View Borrowed Books |
| Member | View Borrowing History |
| Librarian | Add Book |
| Librarian | Update Book |
| Librarian | Remove Book |
| Librarian | Register Member |
| Librarian | Issue Book |
| Librarian | Receive Returned Book |
| Librarian | View Overdue Loans |
| Administrator | Manage Accounts |
| Administrator | View Reports |

## Functional Requirements

1. The system shall maintain a catalog of books.
2. The system shall maintain member records.
3. The system shall show whether a book copy is available or issued.
4. The system shall create a borrowing transaction when a book is issued.
5. The system shall close the borrowing transaction when a book is returned.
6. The system shall prevent an unavailable book from being issued.
7. The system shall maintain borrowing history.
8. The system shall identify overdue borrowing transactions.
9. The system shall allow librarians to manage books and members.

## Non-Functional Requirements

- **Maintainability:** Components should have clear responsibilities.
- **Extensibility:** New member types or notification services should be easy to add.
- **Reliability:** Borrow/return operations should leave book and transaction states consistent.
- **Security:** Administrative functions should require authorized users.
- **Usability:** Search and circulation workflows should be straightforward.
- **Data integrity:** A book copy must not be issued to multiple members at the same time.

## Business Rules

- Only available books can be borrowed.
- A borrowing transaction belongs to one member and one book.
- A returned book becomes available again.
- An overdue transaction remains open until the book is returned.
- Administrative operations require a Librarian or Administrator role.
