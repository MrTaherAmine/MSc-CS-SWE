class BorrowTransaction {
  constructor(id, userId, bookId, borrowDate, dueDate) {
    this._id = id;
    this._userId = userId;
    this._bookId = bookId;
    this._borrowDate = borrowDate;
    this._dueDate = dueDate;
    this._returnedAt = null;
    this._overdue = false;
  }

  get id() {
    return this._id;
  }

  get userId() {
    return this._userId;
  }

  get bookId() {
    return this._bookId;
  }

  get dueDate() {
    return this._dueDate;
  }

  get returnedAt() {
    return this._returnedAt;
  }

  get isOverdue() {
    return this._overdue;
  }

  markReturned(returnedAt = new Date()) {
    this._returnedAt = returnedAt;
    this._overdue = false;
  }

  simulateOverdue() {
    if (!this._returnedAt) {
      this._overdue = true;
    }
  }
}

module.exports = BorrowTransaction;
