// Interface-like base abstraction for library users.
export class User {
  constructor(id, name, email) {
    if (new.target === User) {
      throw new Error("User is an abstract-style base class.");
    }

    this.id = id;
    this.name = name;
    this.email = email;
  }

  getRole() {
    throw new Error("getRole() must be implemented by subclasses.");
  }
}
