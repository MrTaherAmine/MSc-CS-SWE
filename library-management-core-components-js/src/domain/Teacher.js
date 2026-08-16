import { User } from "./User.js";

export class Teacher extends User {
  getRole() {
    return "teacher";
  }
}
