const BorrowTransaction = require("../models/BorrowTransaction");
const NotificationService = require("./NotificationService");

// Singleton Pattern: only one central library system instance can exist.
class LibrarySystem {
  static _instance = null;

  constructor() {
    if (LibrarySystem._instance) {
      throw new Error(
        "LibrarySystem is a Singleton. Use LibrarySystem.getInstance()."
      );
    }

    this._users = new Map();
    this._books = new Map();
    this._transactions = new Map();
    this._notificationService = new NotificationService();
    this._nextTransactionId = 1;

    LibrarySystem._instance = this;
  }

  static getInstance() {
    if (!LibrarySystem._instance) {
      LibrarySystem._instance = new LibrarySystem();
    }

    return LibrarySystem._instance;
  }

  addUser(user) {
    if (this._users.has(user.id)) {
      throw new Error(`User with ID ${user.id} already exists.`);
    }

    this._users.set(user.id, user);
    this._notificationService.subscribe(user);
  }

  addBook(book) {
    if (this._books.has(book.id)) {
      throw new Error(`Book with ID ${book.id} already exists.`);
    }

    this._books.set(book.id, book);
  }

  borrowBook(userId, bookId, borrowDays = 14) {
    const user = this._getUserOrThrow(userId);
    const book = this._getBookOrThrow(bookId);

    if (!book.isAvailable) {
      throw new Error(`Book "${book.title}" is not available.`);
    }

    if (user.borrowedBookIds.length >= user.getBorrowLimit()) {
      throw new Error(
        `${user.getRole()} ${user.name} reached the borrowing limit of ${user.getBorrowLimit()}.`
      );
    }

    const borrowDate = new Date();
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + borrowDays);

    book.borrow();
    user.borrowBook(bookId);

    const transaction = new BorrowTransaction(
      this._nextTransactionId++,
      userId,
      bookId,
      borrowDate,
      dueDate
    );

    this._transactions.set(transaction.id, transaction);

    return transaction;
  }

  returnBook(userId, bookId) {
    const user = this._getUserOrThrow(userId);
    const book = this._getBookOrThrow(bookId);

    const transaction = this._findOpenTransaction(userId, bookId);

    if (!transaction) {
      throw new Error(
        `No active borrowing transaction found for user ${userId} and book ${bookId}.`
      );
    }

    transaction.markReturned();
    book.returnToLibrary();
    user.returnBook(bookId);

    return transaction;
  }

  viewBorrowedBooks(userId) {
    const user = this._getUserOrThrow(userId);

    return user.borrowedBookIds.map((bookId) => {
      const book = this._books.get(bookId);

      return {
        id: book.id,
        title: book.title,
        author: book.author
      };
    });
  }

  simulateOverdue(transactionId) {
    const transaction = this._transactions.get(transactionId);

    if (!transaction) {
      throw new Error(`Transaction ${transactionId} was not found.`);
    }

    transaction.simulateOverdue();

    if (transaction.isOverdue) {
      const book = this._getBookOrThrow(transaction.bookId);
      this._notificationService.notifyUser(
        transaction.userId,
        `The book "${book.title}" is overdue. Please return it as soon as possible.`
      );
    }
  }

  listUsers() {
    return Array.from(this._users.values()).map((user) => ({
      id: user.id,
      name: user.name,
      role: user.getRole(),
      borrowedBookIds: user.borrowedBookIds
    }));
  }

  listBooks() {
    return Array.from(this._books.values()).map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      isAvailable: book.isAvailable
    }));
  }

  _findOpenTransaction(userId, bookId) {
    return Array.from(this._transactions.values()).find(
      (transaction) =>
        transaction.userId === userId &&
        transaction.bookId === bookId &&
        !transaction.returnedAt
    );
  }

  _getUserOrThrow(userId) {
    const user = this._users.get(userId);

    if (!user) {
      throw new Error(`User ${userId} was not found.`);
    }

    return user;
  }

  _getBookOrThrow(bookId) {
    const book = this._books.get(bookId);

    if (!book) {
      throw new Error(`Book ${bookId} was not found.`);
    }

    return book;
  }
}

module.exports = LibrarySystem;
