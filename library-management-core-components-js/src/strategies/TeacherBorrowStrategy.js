import { BorrowStrategy } from "./BorrowStrategy.js";

export class TeacherBorrowStrategy extends BorrowStrategy {
  canBorrow(user, currentlyBorrowedCount) {
    return user.getRole() === "teacher" && currentlyBorrowedCount < 5;
  }
}
