const User = require("./User");

class Teacher extends User {
  getBorrowLimit() {
    return 5;
  }

  getRole() {
    return "Teacher";
  }
}

module.exports = Teacher;
