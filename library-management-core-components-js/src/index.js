import { Book } from "./domain/Book.js";
import { UserFactory } from "./factories/UserFactory.js";
import { UserNotificationObserver } from "./observers/UserNotificationObserver.js";
import { InMemoryRepository } from "./repositories/InMemoryRepository.js";
import { BorrowingService } from "./services/BorrowingService.js";
import { LibraryService } from "./services/LibraryService.js";
import { NotificationService } from "./services/NotificationService.js";
import { StudentBorrowStrategy } from "./strategies/StudentBorrowStrategy.js";
import { TeacherBorrowStrategy } from "./strategies/TeacherBorrowStrategy.js";

// Repositories are created externally and injected into services.
const userRepository = new InMemoryRepository();
const bookRepository = new InMemoryRepository();

const notificationService = new NotificationService();

const studentStrategy = new StudentBorrowStrategy();
const teacherStrategy = new TeacherBorrowStrategy();

// Strategy resolver chooses a policy without hardcoding that logic in BorrowingService.
const strategyResolver = (user) => {
  if (user.getRole() === "student") {
    return studentStrategy;
  }

  if (user.getRole() === "teacher") {
    return teacherStrategy;
  }

  throw new Error("No borrowing strategy available.");
};

// Dependency Injection: all dependencies are provided to the service.
const borrowingService = new BorrowingService({
  bookRepository,
  userRepository,
  notificationService,
  strategyResolver
});

const library = new LibraryService({
  userRepository,
  bookRepository,
  borrowingService
});

// Factory Pattern.
const student = UserFactory.create(
  "student",
  "U001",
  "Amina",
  "amina@example.com"
);

const teacher = UserFactory.create(
  "teacher",
  "U002",
  "Karim",
  "karim@example.com"
);

library.addUser(student);
library.addUser(teacher);

library.addBook(new Book("B001", "Clean Code", "Robert C. Martin"));
library.addBook(new Book("B002", "Design Patterns", "GoF"));

// Observer Pattern.
notificationService.subscribe(
  student.id,
  new UserNotificationObserver(student)
);

notificationService.subscribe(
  teacher.id,
  new UserNotificationObserver(teacher)
);

console.log("\n=== Borrowing ===");

library.borrowBook("U001", "B001");
library.borrowBook("U002", "B002");

console.log(
  "Student borrowed books:",
  library.getBorrowedBooks("U001").map((book) => book.title)
);

console.log("\n=== Returning ===");

library.returnBook("U001", "B001");

console.log(
  "Student borrowed books after return:",
  library.getBorrowedBooks("U001").map((book) => book.title)
);
