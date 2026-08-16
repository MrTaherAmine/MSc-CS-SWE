export class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isAvailable = true;
  }

  markBorrowed() {
    if (!this.isAvailable) {
      throw new Error(`Book "${this.title}" is already borrowed.`);
    }

    this.isAvailable = false;
  }

  markReturned() {
    this.isAvailable = true;
  }
}
