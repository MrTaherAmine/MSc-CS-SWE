import { User } from "./User.js";

export class Student extends User {
  getRole() {
    return "student";
  }
}
