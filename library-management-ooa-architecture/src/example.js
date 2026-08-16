// Simple implementation example derived from the OOA model.

const BookStatus = Object.freeze({
  AVAILABLE: "Available",
  ISSUED: "Issued",
  OVERDUE: "Overdue"
});

class Book {
  #id;
  #title;
  #author;
  #status;

  constructor(id, title, author) {
    this.#id = id;
    this.#title = title;
    this.#author = author;
    this.#status = BookStatus.AVAILABLE;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get status() {
    return this.#status;
  }

  isAvailable() {
    return this.#status === BookStatus.AVAILABLE;
  }

  issue() {
    if (!this.isAvailable()) {
      throw new Error(`"${this.#title}" is not available.`);
    }

    this.#status = BookStatus.ISSUED;
  }

  returnBook() {
    this.#status = BookStatus.AVAILABLE;
  }

  markOverdue() {
    if (this.#status === BookStatus.ISSUED) {
      this.#status = BookStatus.OVERDUE;
    }
  }
}

const book = new Book("B001", "Clean Code", "Robert C. Martin");

console.log(book.title, book.status);
book.issue();
console.log(book.title, book.status);
book.returnBook();
console.log(book.title, book.status);
