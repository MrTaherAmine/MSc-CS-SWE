const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

// Factory Pattern: centralizes user creation.
class UserFactory {
  static createUser(type, id, name, email) {
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

module.exports = UserFactory;
