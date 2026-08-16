import { BorrowStrategy } from "./BorrowStrategy.js";

export class StudentBorrowStrategy extends BorrowStrategy {
  canBorrow(user, currentlyBorrowedCount) {
    return user.getRole() === "student" && currentlyBorrowedCount < 3;
  }
}
