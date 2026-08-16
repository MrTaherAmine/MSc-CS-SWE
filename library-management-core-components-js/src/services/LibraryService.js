// High-level façade-style service composed through dependency injection.
export class LibraryService {
  constructor({
    userRepository,
    bookRepository,
    borrowingService
  }) {
    this.userRepository = userRepository;
    this.bookRepository = bookRepository;
    this.borrowingService = borrowingService;
  }

  addUser(user) {
    this.userRepository.add(user);
  }

  addBook(book) {
    this.bookRepository.add(book);
  }

  borrowBook(userId, bookId) {
    return this.borrowingService.borrowBook(userId, bookId);
  }

  returnBook(userId, bookId) {
    return this.borrowingService.returnBook(userId, bookId);
  }

  getBorrowedBooks(userId) {
    return this.borrowingService.getBorrowedBooks(userId);
  }
}
