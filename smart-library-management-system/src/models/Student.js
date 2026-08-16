const User = require("./User");

class Student extends User {
  getBorrowLimit() {
    return 3;
  }

  getRole() {
    return "Student";
  }
}

module.exports = Student;
