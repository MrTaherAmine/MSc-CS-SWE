// Abstract base class for every library user.
class User {
  constructor(id, name, email) {
    if (new.target === User) {
      throw new Error("User is an abstract class and cannot be instantiated directly.");
    }

    this._id = id;
    this._name = name;
    this._email = email;
    this._borrowedBookIds = [];
    this._notifications = [];
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get borrowedBookIds() {
    return [...this._borrowedBookIds];
  }

  borrowBook(bookId) {
    if (!this._borrowedBookIds.includes(bookId)) {
      this._borrowedBookIds.push(bookId);
    }
  }

  returnBook(bookId) {
    this._borrowedBookIds = this._borrowedBookIds.filter((id) => id !== bookId);
  }

  // Observer-style update method.
  update(message) {
    this._notifications.push(message);
    console.log(`[Notification for ${this._name}] ${message}`);
  }

  getNotifications() {
    return [...this._notifications];
  }

  getBorrowLimit() {
    throw new Error("getBorrowLimit() must be implemented by subclasses.");
  }

  getRole() {
    throw new Error("getRole() must be implemented by subclasses.");
  }
}

module.exports = User;
