import { generateId } from "../utils/id.js";

// Business service demonstrates Strategy Pattern and Dependency Injection.
export class BorrowingService {
  constructor({
    bookRepository,
    userRepository,
    notificationService,
    strategyResolver
  }) {
    this.bookRepository = bookRepository;
    this.userRepository = userRepository;
    this.notificationService = notificationService;
    this.strategyResolver = strategyResolver;
    this.transactions = [];
  }

  borrowBook(userId, bookId) {
    const user = this.userRepository.getById(userId);
    const book = this.bookRepository.getById(bookId);

    if (!user) {
      throw new Error("User not found.");
    }

    if (!book) {
      throw new Error("Book not found.");
    }

    if (!book.isAvailable) {
      throw new Error("Book is not available.");
    }

    const openBorrowCount = this.transactions.filter(
      (tx) => tx.userId === userId && tx.returnedAt === null
    ).length;

    const strategy = this.strategyResolver(user);

    if (!strategy.canBorrow(user, openBorrowCount)) {
      throw new Error(`${user.getRole()} borrowing limit reached.`);
    }

    book.markBorrowed();

    const transaction = {
      id: generateId("TX"),
      userId,
      bookId,
      borrowedAt: new Date(),
      returnedAt: null
    };

    this.transactions.push(transaction);

    this.notificationService.notify(
      userId,
      `You borrowed "${book.title}".`
    );

    return transaction;
  }

  returnBook(userId, bookId) {
    const book = this.bookRepository.getById(bookId);

    if (!book) {
      throw new Error("Book not found.");
    }

    const transaction = this.transactions.find(
      (tx) =>
        tx.userId === userId &&
        tx.bookId === bookId &&
        tx.returnedAt === null
    );

    if (!transaction) {
      throw new Error("No active borrowing transaction found.");
    }

    transaction.returnedAt = new Date();
    book.markReturned();

    this.notificationService.notify(
      userId,
      `You returned "${book.title}".`
    );

    return transaction;
  }

  getBorrowedBooks(userId) {
    return this.transactions
      .filter((tx) => tx.userId === userId && tx.returnedAt === null)
      .map((tx) => this.bookRepository.getById(tx.bookId));
  }
}
