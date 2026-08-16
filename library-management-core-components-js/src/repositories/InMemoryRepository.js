import { Repository } from "./Repository.js";

// Reusable in-memory repository implementation.
export class InMemoryRepository extends Repository {
  constructor() {
    super();
    this.items = new Map();
  }

  add(entity) {
    if (this.items.has(entity.id)) {
      throw new Error(`Entity with ID ${entity.id} already exists.`);
    }

    this.items.set(entity.id, entity);
  }

  getById(id) {
    return this.items.get(id) ?? null;
  }

  getAll() {
    return Array.from(this.items.values());
  }
}
