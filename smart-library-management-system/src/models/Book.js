class Book {
  constructor(id, title, author) {
    this._id = id;
    this._title = title;
    this._author = author;
    this._isAvailable = true;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get author() {
    return this._author;
  }

  get isAvailable() {
    return this._isAvailable;
  }

  borrow() {
    if (!this._isAvailable) {
      throw new Error(`Book "${this._title}" is already borrowed.`);
    }

    this._isAvailable = false;
  }

  returnToLibrary() {
    this._isAvailable = true;
  }
}

module.exports = Book;
