import { Student } from "../domain/Student.js";
import { Teacher } from "../domain/Teacher.js";

// Factory Pattern: hides concrete user creation from calling code.
export class UserFactory {
  static create(type, id, name, email) {
    switch (type.toLowerCase()) {
      case "student":
        return new Student(id, name, email);

      case "teacher":
        return new Teacher(id, name, email);

      default:
        throw new Error(`Unsupported user type: ${type}`);
    }
  }
}
