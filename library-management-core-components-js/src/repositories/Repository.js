// Interface-like repository abstraction.
export class Repository {
  add(entity) {
    throw new Error("add() must be implemented.");
  }

  getById(id) {
    throw new Error("getById() must be implemented.");
  }

  getAll() {
    throw new Error("getAll() must be implemented.");
  }
}
