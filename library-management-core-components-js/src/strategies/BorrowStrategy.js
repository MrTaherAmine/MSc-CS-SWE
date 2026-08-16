// Interface-like abstraction for borrowing policies.
export class BorrowStrategy {
  canBorrow(user, currentlyBorrowedCount) {
    throw new Error("canBorrow() must be implemented.");
  }
}
