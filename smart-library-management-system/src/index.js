const Book = require("./models/Book");
const UserFactory = require("./patterns/UserFactory");
const LibrarySystem = require("./services/LibrarySystem");

function divider(title) {
  console.log(`\n=== ${title} ===`);
}

function main() {
  const library = LibrarySystem.getInstance();

  divider("Creating Users with Factory Pattern");

  const student = UserFactory.createUser(
    "student",
    "U001",
    "Amina",
    "amina@example.com"
  );

  const teacher = UserFactory.createUser(
    "teacher",
    "U002",
    "Mr. Karim",
    "karim@example.com"
  );

  library.addUser(student);
  library.addUser(teacher);

  console.table(library.listUsers());

  divider("Adding Books");

  library.addBook(new Book("B001", "Clean Code", "Robert C. Martin"));
  library.addBook(new Book("B002", "Design Patterns", "GoF"));
  library.addBook(new Book("B003", "Refactoring", "Martin Fowler"));

  console.table(library.listBooks());

  divider("Borrowing Books");

  const transaction1 = library.borrowBook("U001", "B001");
  const transaction2 = library.borrowBook("U002", "B002");

  console.log("Student transaction:", transaction1);
  console.log("Teacher transaction:", transaction2);

  divider("Viewing Borrowed Books");

  console.log("Amina borrowed:", library.viewBorrowedBooks("U001"));
  console.log("Mr. Karim borrowed:", library.viewBorrowedBooks("U002"));

  divider("Simulating Overdue Notification");

  library.simulateOverdue(transaction1.id);

  divider("Returning Book");

  library.returnBook("U001", "B001");

  console.log("Amina borrowed after return:", library.viewBorrowedBooks("U001"));

  divider("Singleton Verification");

  const sameLibrary = LibrarySystem.getInstance();

  console.log(
    "Both references point to the same instance:",
    library === sameLibrary
  );
}

main();
